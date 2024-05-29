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

type FoodItemType = { name: string }

type FoodDeliveryFormType = {
  address: DeliveryAddressFormType
  foodItems: FoodItemType[]
} & FoodDeliverMasterFormType & CheckoutFormType

type FoodDeliverMasterFormType = {
  orderNo: number
  customerName: string
  mobile: string
  email: string
}

type SelectOptionType = string |
{ value: string, text: string } |
{ value: number, text: string }