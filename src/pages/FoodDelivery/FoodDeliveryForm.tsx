import {
  useForm,
  FieldErrors,
  UseFormReturn,
  FormProvider,
} from "react-hook-form"
import { useRenderCount } from "../../hooks/useRenderCount"
import { TextField } from "../../controls/TextField"
import { CheckoutForm } from "./components/CheckoutForm"
import { DeliveryAddressForm } from "./components/DeliveryAddressForm"
import { FoodDeliverMaster } from "./components/FoodDeliverMaster"



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
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    })

  const {
    handleSubmit,
    formState,
  } = methods

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData)
  }

  const onError = (err: FieldErrors) => {
    console.log("validation errors", err)
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      
      <FormProvider {...methods}>
        <FoodDeliverMaster />
        <div>list of ordered food items</div>
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>


      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
