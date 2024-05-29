import { useFormContext, useFormState } from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"

const RenderCount = useRenderCount()

export default function FoodItems() {
  const { register } = useFormContext<{ foodItems: FoodItemType[] }>()

  const { errors } = useFormState<{ foodItems: FoodItemType[] }>({
    name: "foodItems",
  })

  return (
    <>
      <RenderCount />
      <table className="table table-borderless table-hover">
        <tbody>
          <tr>
            <td>
              <TextField
                label="Food 1"
                {...register("foodItems.0.name", {
                  required: "This field is required.",
                })}
                error={errors.foodItems && errors.foodItems[0]?.name}
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                label="Food 2"
                {...register("foodItems.1.name")}
                // error={errors.mobile}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
