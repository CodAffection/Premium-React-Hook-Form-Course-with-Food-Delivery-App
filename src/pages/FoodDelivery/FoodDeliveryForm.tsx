import {
  useForm,
  FieldErrors,
  UseFormReturn,
  FormProvider,
} from "react-hook-form"
import { useRenderCount } from "../../hooks/useRenderCount"
import { CheckoutForm } from "./components/CheckoutForm"
import { DeliveryAddressForm } from "./components/DeliveryAddressForm"
import { MasterFoodDeliveryForm } from "./components/MasterFoodDeliveryForm"
import SubmitButton from "../../controls/SubmitButton"
import OrderedFoodItems from "./components/OrderedFoodItems"
import { createOrder, fetchLastOrder } from "../../db"
import FormLoader from "../common/FormLoader"

const RenderCount = useRenderCount()

const id: number = 1

const defaultValues: FoodDeliveryFormType = {
  orderId: 0,
  orderNo: new Date().valueOf(),
  customerName: "",
  mobile: "",
  email: "",
  placedOn: new Date(),
  gTotal: 0,
  paymentMethod: "",
  deliveryIn: 0,
  foodItems: [{ foodId: 0, price: 0, quantity: 0, totalPrice: 0 }],
  address: {
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
  },
}

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      defaultValues: async (): Promise<FoodDeliveryFormType> => {
        if (id == 0) return new Promise((resolve) => resolve(defaultValues))
        else {
          const tempOrder = await fetchLastOrder()
          return new Promise((resolve) =>
            resolve(tempOrder ? tempOrder : defaultValues)
          )
        }
      },
    })

  const { handleSubmit, control, getValues, setFocus } = methods

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    //add a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    formData.orderId = 1
    formData.placedOn = new Date()
    createOrder(formData)
    console.log("submitted form data", formData)
  }

  const onError = (err: FieldErrors) => {
    console.log("validation errors", err)
  }

  const onDemo = () => {
    setFocus("customerName", { shouldSelect: true })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <FormLoader control={control} />
      <FormProvider {...methods}>
        <MasterFoodDeliveryForm />
        <OrderedFoodItems />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <SubmitButton value="Submit" control={control} />
      <button className="btn btn-secondary ms-2" onClick={onDemo} type="button">
        Demo
      </button>
    </form>
  )
}
