import { useFieldArray, useFormContext, useFormState } from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"
import { useState, useEffect } from "react"
import { getFoodItems } from "../../../db"
import { Select } from "../../../controls/Select"

const RenderCount = useRenderCount()

export default function OrderedFoodItems() {
  const [foodList, setFoodList] = useState<FoodType[]>([])
  const [foodOptions, setFoodOptions] = useState<SelectOptionType[]>([])

  useEffect(() => {
    const tempList: FoodType[] = getFoodItems()
    const tempOptions: SelectOptionType[] = tempList.map((x) => ({
      value: x.foodId,
      text: x.name,
    }))
    setFoodList(tempList)
    setFoodOptions([{value:0,text:"Select"},...tempOptions])
  }, [])

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
    append({ foodId: 0, price: 0, quantity: 0, totalPrice: 0 })
  }

  const onRowDelete = (index: number) => {
    remove(index)
  }

  return (
    <>
      {/* <RenderCount /> */}
      <div className="text-start fw-bold mt-4">Ordered Food Items</div>
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
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
                <Select
                  options={foodOptions}
                  {...register(`foodItems.${index}.foodId` as const)}
                />
              </td>
              <td>price</td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  {...register(`foodItems.${index}.quantity` as const)}
                />
              </td>
              <td>total price</td>
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
              <td colSpan={5}>
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
