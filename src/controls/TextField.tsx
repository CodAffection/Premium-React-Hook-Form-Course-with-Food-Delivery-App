import { forwardRef, ForwardedRef } from "react"
import { FieldError } from "react-hook-form"

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: FieldError | undefined
}

export const TextField = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { type = "text", className = "", label, error, ...other } = props

    return (
      <div className={label?"form-floating":""}>
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          ref={ref}
          {...other}
        />
        {label && <label>{label}</label>}
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    )
  }
)
