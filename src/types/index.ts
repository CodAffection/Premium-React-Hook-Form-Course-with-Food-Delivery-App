type CheckoutFormType = {
  paymentMethod: string
  deliveryIn: number
}

type DeliveryAddressFormType = {
  streetAddress: string
  landmark: string
  city: string
  state: string
}

type FoodDeliveryFormType = {
  address: DeliveryAddressFormType
} & FoodDeliverMasterType & CheckoutFormType

type FoodDeliverMasterType = {
  orderNo: number
  customerName: string
  mobile: string
  email: string
}

type SelectOptionType = string |
{ value: string, text: string } |
{ value: number, text: string }