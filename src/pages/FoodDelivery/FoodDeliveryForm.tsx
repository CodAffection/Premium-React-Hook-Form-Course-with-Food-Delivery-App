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
import { createOrder } from "../../db"

const RenderCount = useRenderCount()

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      defaultValues: {
        orderNo: new Date().valueOf(),
        customerName: "",
        mobile: "",
        email: "",
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
