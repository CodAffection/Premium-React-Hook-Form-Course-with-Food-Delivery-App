import { useFieldArray, useFormContext, useFormState } from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"

const RenderCount = useRenderCount()

export default function OrderedFoodItems() {
  const { register, setValue } = useFormContext<{
    foodItems: OrderedFoodItemType[]
  }>()

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  })

  const { fields, append, remove } = useFieldArray<{
    foodItems: OrderedFoodItemType[]
  }>({
    name: "foodItems",
    rules: {
      required: {
        value: true,
        message: "No food in the order.",
      },
    },
  })

  const onRowAdd = () => {
    append({ name: "Food", quantity: 1 })
  }

  const onRowDelete = (index: number) => {
    remove(index)
  }

  return (
    <>
      <RenderCount />
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onRowAdd}
              >
                + Add
              </button>
            </th>
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
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRowDelete(index)}
                >
                  DEL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {errors.foodItems?.root && (
          <tfoot>
            <tr>
              <td colSpan={3}>
                <span className="error-feedback">
                  {errors.foodItems?.root?.message}
                </span>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  )
}
