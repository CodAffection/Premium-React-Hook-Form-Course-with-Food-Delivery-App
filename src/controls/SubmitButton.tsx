type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean
}

export default function SubmitButton(props: SubmitButtonProps) {
  const {
    isSubmitting = undefined,
    className = "btn-light",
    value,
    ...other
  } = props

  return (
    <button
      type="submit"
      className={`btn ${className}`}
      disabled={isSubmitting == undefined ? false : isSubmitting}
      {...other}
    >
      {isSubmitting === undefined || isSubmitting === false ? (
        value
      ) : (
        <>
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          <span role="status" className="ms-1">{value}</span>
        </>
      )}
    </button>
  )
}
