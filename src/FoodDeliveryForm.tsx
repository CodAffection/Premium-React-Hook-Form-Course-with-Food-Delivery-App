import { useForm, FieldErrors } from "react-hook-form"
import { useRenderCount } from "./hooks/useRenderCount"

type FoodDeliveryFormType = {
  orderNo: number
  customerName: string
  mobile: string
  email: string
}

const RenderCount = useRenderCount()

export const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
    },
  })

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData)
  }

  const onError = (err: FieldErrors) => {
    console.log("validation errors", err)
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <div className="row mb-2">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="#Order No."
              disabled
              {...register("orderNo")}
            />
            <label>#Order No.</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
              {...register("mobile", {
                minLength: {
                  value: 10,
                  message: "Must be 10 digits.",
                },
                maxLength: {
                  value: 10,
                  message: "Must be 10 digits.",
                },
                required: "This field is required.",
              })}
            />
            <label>Mobile</label>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              {...register("customerName", {
                required: "This field is required.",
              })}
            />
            <label>Customer Name</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Incorrect email format.",
                },
              })}
            />
            <label>Email</label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
