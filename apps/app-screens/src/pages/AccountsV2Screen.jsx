import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavItem } from '@green-hill/design-system/components/NavBar.jsx'
import ThemeToggle from '@green-hill/design-system/components/ThemeToggle.jsx'
import { PageHeader } from '@green-hill/design-system/components/PageHeader.jsx'
import { InputField } from '@green-hill/design-system/components/InputField.jsx'
import { TableV2 } from '@green-hill/design-system/components/TableV2.jsx'
import { StatusBadge } from '@green-hill/design-system/components/StatusBadge.jsx'
import BigButton from '@green-hill/design-system/components/BigButton.jsx'
import searchIcon from '@/assets/accounts-v2/search.svg'
import styles from './AccountsV2Screen.module.css'

const INITIAL_ACCOUNTS = [
  { id: 'acc-1', name: 'Casino Night Holdings', plan: 'Starter', mrr: 120, status: 'At risk' },
  { id: 'acc-2', name: 'Chemical Plant Logistics', plan: 'Pro', mrr: 650, status: 'Active' },
  { id: 'acc-3', name: 'Emerald Hill Trading Co.', plan: 'Enterprise', mrr: 4200, status: 'Active' },
  { id: 'acc-4', name: 'Marble Works Manufacturing', plan: 'Pro', mrr: 890, status: 'Active' },
  { id: 'acc-5', name: 'Starlight Freight', plan: 'Enterprise', mrr: 12400, status: 'Active' },
]

const SAMPLE_CONTACT = {
  name: 'Northstar Studio',
  contact: 'Alex Morgan',
  email: 'alex@northstar.example',
}
const EMPTY_CONTACT = { name: '', contact: '', email: '' }
const HEADERS = [
  { label: 'Customer', key: 'name' },
  { label: 'Plan', key: 'plan' },
  { label: 'MRR', key: 'mrr' },
  'Status',
]
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
})

export default function AccountsV2Screen() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)
  const [search, setSearch] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [sort, setSort] = useState({ key: 'name', direction: 'asc' })
  const [details, setDetails] = useState(SAMPLE_CONTACT)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const visibleAccounts = accounts.filter((account) => {
    const name = account.name.toLowerCase()
    return name.includes(search.trim().toLowerCase()) && name.includes(nameFilter.trim().toLowerCase())
  }).sort((a, b) => {
    const comparison = sort.key === 'mrr'
      ? a.mrr - b.mrr
      : a[sort.key].localeCompare(b[sort.key])
    return comparison * (sort.direction === 'asc' ? 1 : -1)
  })

  const dataRows = visibleAccounts.map((account) => ({
    id: account.id,
    cells: [account.name, account.plan, currency.format(account.mrr),
      <StatusBadge key="status" tone={account.status === 'Active' ? 'success' : 'warning'}>
        {account.status}
      </StatusBadge>,
    ],
  }))

  function updateDetails(key, value) {
    setDetails((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setNotice('')
  }

  function addAccount(event) {
    event.preventDefault()
    const nextErrors = {}
    for (const key of ['name', 'contact', 'email']) {
      if (!details[key].trim()) nextErrors[key] = 'This field is required.'
    }
    if (details.email.trim() && !event.currentTarget.elements['account-email'].validity.valid) {
      nextErrors.email = 'Enter a valid email address.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const fieldIds = { name: 'account-name', contact: 'account-contact', email: 'account-email' }
      event.currentTarget.elements[fieldIds[Object.keys(nextErrors)[0]]].focus()
      return
    }
    // This self-contained demo has no subscription workflow. New accounts
    // begin on Starter with no recurring revenue; primary contacts stay in state.
    setAccounts((current) => [...current, {
      id: crypto.randomUUID(), name: details.name.trim(),
      contact: details.contact.trim(), email: details.email.trim(),
      plan: 'Starter', mrr: 0, status: 'Active',
    }])
    setNotice(`${details.name.trim()} added.`)
    setDetails(EMPTY_CONTACT)
  }

  function cancel() {
    setDetails(EMPTY_CONTACT)
    setErrors({})
    setNotice('')
  }

  return (
    <div className={styles.page}>
      <header className={styles.navigation}>
        <Link to="/dashboard" className="text-22 font-bold text-brand no-underline">Green Hill</Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-4">
          {[
            ['/dashboard', 'Dashboard'], ['/accounts/v2', 'Accounts'], ['/billing', 'Billing'],
            ['/team', 'Team'], ['/integrations', 'Integrations'], ['/reports', 'Reports'],
            ['/settings', 'Settings'],
          ].map(([to, label]) => (
            <NavItem key={to} to={to} active={to === '/accounts/v2'}>{label}</NavItem>
          ))}
        </nav>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        <div className={styles.heading}>
          <PageHeader title="Accounts" description="Manage customers and their primary contacts." />
        </div>
        <div className={styles.columns}>
          <section className={styles.panel} aria-labelledby="accounts-title">
            <div className="flex items-center justify-between gap-4">
              <h2 id="accounts-title" className="m-0 text-17 font-semibold text-text">All accounts</h2>
              <StatusBadge tone="neutral">{accounts.length} accounts</StatusBadge>
            </div>
            <div className={styles.filters}>
              <div className={styles.search}>
                <InputField id="customer-search" label="Search by customer" placeholder="Search customers…"
                  value={search} onChange={(event) => setSearch(event.target.value)} />
                <img src={searchIcon} alt="" width="16" height="16" className={styles.searchIcon} />
              </div>
              <InputField id="customer-filter" label="Filter by name" placeholder="Name contains…"
                value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
            </div>
            <div className={styles.table}>
              <TableV2 headers={HEADERS} dataRows={dataRows} sort={sort}
                onSort={(key, direction) => setSort({ key, direction })} />
              {!visibleAccounts.length && (
                <p className="m-0 border-b border-border px-4 py-6 text-14 text-text-secondary">
                  No accounts match your search. Try another customer name or clear the filters.
                </p>
              )}
            </div>
            <div>
              <p aria-live="polite" className="m-0 text-13 font-medium text-text-secondary">
                Showing {visibleAccounts.length} of {accounts.length} accounts
              </p>
              <p className="m-0 mt-1 text-12 text-text-muted">Hardcoded preview data — do not use in prod</p>
            </div>
          </section>
          <section className={styles.panel} aria-labelledby="add-account-title">
            <div>
              <h2 id="add-account-title" className="m-0 text-17 font-semibold text-text">Add account</h2>
              <p className="m-0 mt-2 text-14 text-text-secondary">
                Create a customer account and assign a primary contact.
              </p>
            </div>
            <form aria-labelledby="add-account-title" noValidate onSubmit={addAccount} className={styles.form}>
              <div className={styles.fields}>
                <InputField id="account-name" label="Account / customer name" value={details.name}
                  onChange={(event) => updateDetails('name', event.target.value)} error={errors.name} />
                <InputField id="account-contact" label="Contact person" value={details.contact}
                  onChange={(event) => updateDetails('contact', event.target.value)} error={errors.contact} />
                <InputField id="account-email" label="Contact email" type="email" value={details.email}
                  onChange={(event) => updateDetails('email', event.target.value)} error={errors.email} />
              </div>
              <p className="m-0 text-12 text-text-secondary">All fields are required. Contact details are illustrative.</p>
              <div className="flex flex-wrap gap-2">
                <BigButton type="submit">Add account</BigButton>
                <BigButton variant="ghost" onClick={cancel}>Cancel</BigButton>
              </div>
              <div role="status" className={notice ? 'text-13 text-success' : 'sr-only'}>{notice}</div>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
