import { Control, useFormState } from "react-hook-form"
import { useRenderCount } from "../hooks/useRenderCount"

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  control?: Control<any, any>
}


export default function SubmitButton(props: SubmitButtonProps) {
  const {
    className = "btn-light",
    value,
    control = undefined,
    ...other
  } = props

  let isSubmitting = undefined
  if (control) ({ isSubmitting } = useFormState({ control }))

  return (
    <>
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
            <span role="status" className="ms-1">
              {value}
            </span>
          </>
        )}
      </button>
    </>
  )
}
