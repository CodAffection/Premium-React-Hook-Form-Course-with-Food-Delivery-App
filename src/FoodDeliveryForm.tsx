import { useForm, FieldErrors } from "react-hook-form"
import { useRenderCount } from "./hooks/useRenderCount"
import { TextField } from "./controls/TextField"
import { Select } from "./controls/Select"

type FoodDeliveryFormType = {
  orderNo: number
  customerName: string
  mobile: string
  email: string
  paymentMethod: string
  deliveryIn: number
}

const paymentOptions: SelectOptionType[] = [
  { value: "", text: "Select" },
  { value: "online", text: "Paid Online" },
  { value: "COD", text: "Cash On Delivery" },
]

const deliveryInOptions :SelectOptionType[] = [
  { value: 0, text: "Select" },
  { value: 30, text: "Half an Hour" },
  { value: 60, text: "1 Hour" },
  { value: 120, text: "2 Hour" },
  { value: 180, text: "3 Hour" },
]

const RenderCount = useRenderCount()

export const FoodDeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: "onChange",
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
      paymentMethod: "",
      deliveryIn: 0,
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
          <TextField label="#Order No." disabled {...register("orderNo")} />
        </div>
        <div className="col">
          <TextField
            label="Mobile"
            {...register("mobile", {
              required: "This field is required.",
            })}
            error={errors.mobile}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <TextField
            label="Customer Name"
            {...register("customerName", {
              required: "This field is required.",
            })}
            error={errors.customerName}
          />
        </div>
        <div className="col">
          <TextField
            type="email"
            label="Email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Incorrect email format.",
              },
            })}
            error={errors.email}
          />
        </div>
      </div>
      <div>list of ordered food items</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            label="Payment Method"
            options={paymentOptions}
            {...register("paymentMethod", {
              required: "This field is required.",
            })}
            error={errors.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            label="Delivery Within"
            options={deliveryInOptions}
            {...register("deliveryIn")}
            error={errors.deliveryIn}
          />
        </div>
      </div>
      <div>delivery address</div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
