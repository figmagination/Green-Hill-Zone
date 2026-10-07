/**
 * Text input with label, help text, and an error state.
 *
 * The prop is `label`, matching the HTML element it renders and the convention
 * every other form control in this app follows. Error state is a prop, not a
 * CSS-only concern, because a screen needs to *know* a field is invalid in
 * order to describe it to assistive tech — `aria-invalid` and
 * `aria-describedby` are wired from it here.
 *
 * Focus is deliberately NOT a prop: it is a browser state, handled by the
 * `focus:` pseudo-class below.
 */
export function InputField({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  error,
  helpText,
}) {
  const describedById = error ? `${id}-error` : helpText ? `${id}-help` : undefined

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-14 font-semibold text-[var(--text)]">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[var(--danger)]">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById}
        className="w-full rounded-md border bg-[var(--surface)] px-3 py-2 text-14 text-[var(--text-strong)] outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          borderColor: error ? 'var(--danger)' : 'var(--border-strong)',
          '--tw-ring-color': error ? 'var(--danger)' : 'var(--brand-link)',
        }}
      />
      {error ? (
        <p id={`${id}-error`} className="m-0 mt-1.5 text-12 font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : helpText ? (
        <p id={`${id}-help`} className="m-0 mt-1.5 text-12 text-[var(--text-muted)]">
          {helpText}
        </p>
      ) : null}
    </div>
  )
}
