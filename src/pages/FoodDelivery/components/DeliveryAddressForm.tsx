import { useFormContext, useFormState } from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"

const RenderCount = useRenderCount()

export const DeliveryAddressForm = () => {
  const { register, getFieldState } = useFormContext<{ address: DeliveryAddressFormType }>()

  const { errors,touchedFields } = useFormState<{ address: DeliveryAddressFormType }>({
    name: "address",
  })

  return (
    <>
      {/* <RenderCount /> */}
      <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            error={errors.address?.streetAddress}
            {...register("address.streetAddress", {
              required: "This field is required.",
            })}
          />
        </div>
        <div className="col">
          <TextField
            label="City"
            error={errors.address?.city}
            {...register("address.city", {
              required: "This field is required.",
            })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField label="Landmark" {...register("address.landmark")} />
        </div>
        <div className="col">
          <TextField label="State" {...register("address.state")} />
        </div>
      </div>
      
      <div>{getFieldState("address").isTouched && "address node is touched"}</div>
    </>
  )
}
