import {
  useForm,
  FieldErrors,
  UseFormReturn,
  FormProvider,
} from "react-hook-form"
import { useRenderCount } from "../../hooks/useRenderCount"
import { CheckoutForm } from "./components/CheckoutForm"
import { DeliveryAddressForm } from "./components/DeliveryAddressForm"
import { FoodDeliverMaster } from "./components/FoodDeliverMaster"
import SubmitButton from "../../controls/SubmitButton"
import FoodItems from "./components/FoodItems"

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
        paymentMethod: "",
        deliveryIn: 0,
        foodItems: [
          { name: "Chicken Tender" }, 
          { name: "Sweet Potato Fries" }
        ],
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    })

  const { handleSubmit, control } = methods

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    //add a delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("form data", formData)
  }

  const onError = (err: FieldErrors) => {
    console.log("validation errors", err)
  }

  const onDemo = () => {}

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <FormProvider {...methods}>
        <FoodDeliverMaster />
        <FoodItems />
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
