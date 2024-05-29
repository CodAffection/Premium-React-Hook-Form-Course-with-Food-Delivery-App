import { useForm } from "react-hook-form"

type FoodDeliveryFormType = {
  customerName: string
  mobile: string
}

export const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>()

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData)
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Customer Name"
          {...register("customerName", { value: "Fiona" })}
        />
        <label>Customer Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Mobile"
          {...register("mobile")}
        />
        <label>Mobile</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
