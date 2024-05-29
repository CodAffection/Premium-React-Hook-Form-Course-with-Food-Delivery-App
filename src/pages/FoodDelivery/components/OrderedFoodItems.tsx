import { useFieldArray, useFormContext, useFormState } from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"

const RenderCount = useRenderCount()

export default function OrderedFoodItems() {
  const { register } = useFormContext<{ foodItems: OrderedFoodItemType[] }>()

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  })

  const { fields } = useFieldArray<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  })

  return (
    <>
      <RenderCount />
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <TextField
                  {...register(`foodItems.${index}.name` as const, {
                    required: "This field is required.",
                  })}
                  error={errors.foodItems && errors.foodItems[index]?.name}
                />
              </td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  {...register(`foodItems.${index}.quantity` as const)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
