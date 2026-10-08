import { useState } from 'react'
import NavBar from '@green-hill/design-system/components/NavBar.jsx'
import { PageHeader } from '@green-hill/design-system/components/PageHeader.jsx'
import { InputField } from '@green-hill/design-system/components/InputField.jsx'
import { TableV2 } from '@green-hill/design-system/components/TableV2.jsx'
import { StatusBadge } from '@green-hill/design-system/components/StatusBadge.jsx'
import BigButton from '@green-hill/design-system/components/BigButton.jsx'
import searchIcon from '@/assets/accounts-search.svg'
import styles from './AccountsScreen.module.css'

const INITIAL_ACCOUNTS = [
  { id: 'acc-1', customer: 'Emerald Hill Trading Co.', plan: 'Enterprise', mrr: 4200, status: 'Active' },
  { id: 'acc-2', customer: 'Marble Works Manufacturing', plan: 'Pro', mrr: 890, status: 'Active' },
  { id: 'acc-3', customer: 'Casino Night Holdings', plan: 'Starter', mrr: 120, status: 'At risk' },
  { id: 'acc-4', customer: 'Chemical Plant Logistics', plan: 'Pro', mrr: 650, status: 'Active' },
  { id: 'acc-5', customer: 'Starlight Freight', plan: 'Enterprise', mrr: 12400, status: 'Active' },
]
const EMPTY_DRAFT = { customer: '', contact: '', email: '' }
const INITIAL_DRAFT = { customer: 'Northstar Studio', contact: 'Alex Morgan', email: 'alex@northstar.example' }
const HEADERS = [{ label: 'Customer', key: 'customer' }, { label: 'Plan', key: 'plan' }, { label: 'MRR', key: 'mrr' }, 'Status']
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function AccountStatus({ status }) {
  return <StatusBadge tone={status === 'At risk' ? 'warning' : 'success'}>{status}</StatusBadge>
}

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)
  const [search, setSearch] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [sort, setSort] = useState({ key: 'customer', direction: 'asc' })
  const [draft, setDraft] = useState(INITIAL_DRAFT)
  const [errors, setErrors] = useState({})
  const [announcement, setAnnouncement] = useState('')
  const mobileSortLabel = sort.key === 'customer'
    ? `Customer · ${sort.direction === 'asc' ? 'A–Z' : 'Z–A'}`
    : `${sort.key === 'mrr' ? 'MRR' : 'Plan'} · ${sort.direction === 'asc' ? 'ascending' : 'descending'}`

  const visible = accounts.filter(account => {
    const name = account.customer.toLowerCase()
    return name.includes(search.trim().toLowerCase()) && name.includes(nameFilter.trim().toLowerCase())
  }).sort((a, b) => {
    const comparison = sort.key === 'mrr' ? a.mrr - b.mrr : a[sort.key].localeCompare(b[sort.key])
    return comparison * (sort.direction === 'asc' ? 1 : -1)
  })

  function updateDraft(key, value) {
    setDraft(current => ({ ...current, [key]: value }))
    setErrors(current => ({ ...current, [key]: undefined }))
    setAnnouncement('')
  }

  function addAccount(event) {
    event.preventDefault()
    const values = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()]))
    const nextErrors = {}
    if (!values.customer) nextErrors.customer = 'Account / customer name is required.'
    if (!values.contact) nextErrors.contact = 'Contact person is required.'
    if (!values.email) nextErrors.email = 'Contact email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.getElementById(`account-${Object.keys(nextErrors)[0]}`).focus()
      return
    }
    setAccounts(current => [...current, { ...values, id: crypto.randomUUID(), plan: 'Starter', mrr: 0, status: 'Active' }])
    setDraft(EMPTY_DRAFT)
    setSearch('')
    setNameFilter('')
    setAnnouncement(`${values.customer} added with ${values.contact} as the primary contact.`)
  }

  return (
    <div className="min-h-screen bg-bg">
      <NavBar />
      <main className={styles.main}>
        <PageHeader title="Accounts" description="Manage customers and their primary contacts." />
        <div className={styles.layout}>
          <section className={styles.register} aria-labelledby="accounts-heading">
            <div className="flex items-center justify-between gap-3">
              <h2 id="accounts-heading" className="m-0 text-17 font-semibold text-text">All accounts</h2>
              <StatusBadge>{visible.length} {visible.length === 1 ? 'account' : 'accounts'}</StatusBadge>
            </div>
            <div className={styles.filters}>
              <InputField compact label="Search by customer" id="account-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search customers…" icon={<img src={searchIcon} alt="" />} />
              <InputField compact label="Filter by name" id="account-filter" value={nameFilter} onChange={event => setNameFilter(event.target.value)} placeholder="Name contains…" />
            </div>
            <div className={styles.desktopTable}>
              <TableV2 headers={HEADERS} sort={sort} onSort={(key, direction) => setSort({ key, direction })} dataRows={visible.map(account => ({ id: account.id, cells: [account.customer, account.plan, currency.format(account.mrr), <AccountStatus key="status" status={account.status} />] }))} />
            </div>
            <div className={styles.mobileList}>
              <button type="button" className={styles.mobileSort} onClick={() => setSort({ key: 'customer', direction: sort.key === 'customer' && sort.direction === 'asc' ? 'desc' : 'asc' })}>
                {mobileSortLabel}
              </button>
              <ul className="m-0 list-none p-0">
                {visible.map(account => (
                  <li key={account.id} className={styles.mobileAccount}>
                    <p className="m-0 break-words text-14 text-text">{account.customer}</p>
                    <dl className="m-0 flex items-start justify-between gap-3">
                      <div><dt className={styles.detailLabel}>Plan</dt><dd className={styles.detailValue}>{account.plan}</dd></div>
                      <div><dt className={styles.detailLabel}>MRR</dt><dd className={styles.detailValue}>{currency.format(account.mrr)}</dd></div>
                      <div><dt className={styles.detailLabel}>Status</dt><dd className={styles.detailValue}><AccountStatus status={account.status} /></dd></div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
            {visible.length === 0 && <p role="status" className="m-0 text-14 text-text-secondary">No accounts match your search. Try a different customer name.</p>}
            <div>
              <p aria-live="polite" className="m-0 text-13 font-medium text-text-secondary">Showing {visible.length} of {accounts.length} accounts</p>
              <p className="mb-0 mt-1 text-12 text-text-muted">Hardcoded preview data — do not use in prod</p>
            </div>
          </section>
          <form className={styles.form} onSubmit={addAccount} noValidate aria-labelledby="add-account-heading">
            <div>
              <h2 id="add-account-heading" className="m-0 text-17 font-semibold text-text">Add account</h2>
              <p className="mb-0 mt-2 text-14 text-text-secondary">Create a customer account and assign a primary contact.</p>
            </div>
            <div className={styles.fields}>
              <InputField compact required label="Account / customer name" id="account-customer" value={draft.customer} onChange={event => updateDraft('customer', event.target.value)} error={errors.customer} />
              <InputField compact required label="Contact person" id="account-contact" value={draft.contact} onChange={event => updateDraft('contact', event.target.value)} error={errors.contact} />
              <InputField compact required type="email" label="Contact email" id="account-email" value={draft.email} onChange={event => updateDraft('email', event.target.value)} error={errors.email} />
            </div>
            <p className="m-0 text-12 text-text-secondary">All fields are required. Contact details are illustrative.</p>
            <div className="flex flex-wrap gap-2">
              <BigButton type="submit">Add account</BigButton>
              <BigButton variant="ghost" onClick={() => { setDraft(EMPTY_DRAFT); setErrors({}); setAnnouncement('Draft cleared.') }}>Cancel</BigButton>
            </div>
            {announcement && <p role="status" className="m-0 break-words text-13 text-text-secondary">{announcement}</p>}
          </form>
        </div>
      </main>
    </div>
  )
}
