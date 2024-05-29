import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form"
import { TextField } from "../../../controls/TextField"
import { useRenderCount } from "../../../hooks/useRenderCount"
import { useState, useEffect, ChangeEvent } from "react"
import { getFoodItems } from "../../../db"
import { Select } from "../../../controls/Select"
import { roundTo2DecimalPoint } from "../../../utils"

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
    setFoodOptions([{ value: 0, text: "Select" }, ...tempOptions])
  }, [])

  const { register, setValue, getValues } = useFormContext<{
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

  useWatch<{
    foodItems: OrderedFoodItemType[]
  }>({ name: "foodItems" })

  const onRowAdd = () => {
    append({ foodId: 0, price: 0, quantity: 0, totalPrice: 0 })
  }

  const onRowDelete = (index: number) => {
    remove(index)
  }

  const onFoodChange = (
    e: ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
    const foodId = parseInt(e.target.value)
    let price: number
    if (foodId == 0) price = 0
    else price = foodList.find((x) => x.foodId == foodId)?.price || 0
    setValue(`foodItems.${rowIndex}.price`, price)
    updateRowTotalPrice(rowIndex)
  }

  const updateRowTotalPrice = (rowIndex: number) => {
    const { price, quantity } = getValues(`foodItems.${rowIndex}`)
    let totalPrice = 0
    if (quantity && quantity > 0) totalPrice = price * quantity
    setValue(
      `foodItems.${rowIndex}.totalPrice`,
      roundTo2DecimalPoint(totalPrice)
    )
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
                  error={errors.foodItems && errors.foodItems[index]?.foodId}
                  {...register(`foodItems.${index}.foodId` as const, {
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Select food.",
                    },
                    onChange: (e) => {
                      onFoodChange(e, index)
                    },
                  })}
                />
              </td>
              <td>{"$" + getValues(`foodItems.${index}.price`)}</td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  error={errors.foodItems && errors.foodItems[index]?.quantity}
                  {...register(`foodItems.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: "< 1.",
                    min: {
                      value: 1,
                      message: "< 1.",
                    },
                    onChange: () => {
                      updateRowTotalPrice(index)
                    },
                  })}
                />
              </td>
              <td>{"$" + getValues(`foodItems.${index}.totalPrice`)}</td>
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
