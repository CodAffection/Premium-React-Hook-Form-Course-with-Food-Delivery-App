import { useFormContext, useFormState } from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"

const RenderCount = useRenderCount()

export const MasterFoodDeliveryForm = () => {
  const {
    register,
  } = useFormContext<MasterFoodDeliveryFormType>()

  const { errors } = useFormState<MasterFoodDeliveryFormType>({
    name: ["orderNo", "customerName", "mobile", "email"],
    exact:true,
  })
  

  return (
    <>
      {/* <RenderCount /> */}
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
    </>
  )
}
