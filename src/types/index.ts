type CheckoutFormType={
  paymentMethod: string
  deliveryIn: number
}

type FoodDeliveryFormType = {
  orderNo: number
  customerName: string
  mobile: string
  email: string
  address: {
    streetAddress: string
    landmark: string
    city: string
    state: string
  }
} & CheckoutFormType

type SelectOptionType = string |
{ value: string, text: string } |
{ value: number, text: string }