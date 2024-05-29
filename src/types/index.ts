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

type OrderedFoodItemType = {
  name: string,
  quantity: number
}

type FoodDeliveryFormType = {
  address: DeliveryAddressFormType
  foodItems: OrderedFoodItemType[]
} & MasterFoodDeliveryFormType & CheckoutFormType

type MasterFoodDeliveryFormType = {
  orderNo: number
  customerName: string
  mobile: string
  email: string
}

type SelectOptionType = string |
{ value: string, text: string } |
{ value: number, text: string }