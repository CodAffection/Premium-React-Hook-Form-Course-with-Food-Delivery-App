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

  const {
    fields,
    append,
    prepend,
    insert,
    swap,
    move,
    update,
    replace,
    remove,
  } = useFieldArray<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  })

  const onRowAdd = () => {
    append({ name: "Food", quantity: 1 })
    // prepend({ name: "Food", quantity: 1 })
    // insert(2,{ name: "Food", quantity: 1 })
  }

  const onSwapAndMove = () => {
    // swap(0, 2)
    move(0, 2)
  }

  const onUpdateAndReplace = () => {
    // update(0,{ name: "Food", quantity: 10 })
    // setValue("foodItems.0.quantity",10)
    replace([
      { name: "Food 1", quantity: 10 },
      { name: "Food 2", quantity: 11 },
    ])
  }

  const onRowDelete = (index:number) => {
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
      </table>
      {fields.length >= 4 && (
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onSwapAndMove}
        >
          Swap and Move
        </button>
      )}
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={onUpdateAndReplace}
      >
        Update and Replace
      </button>
    </>
  )
}
