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
  foodItems: OrderedFoodItemType[]
} & MasterFoodDeliveryFormType & CheckoutFormType

type FoodType = {
  foodId: number,
  name: string,
  price: number
}

type MasterFoodDeliveryFormType = {
  orderId: number
  orderNo: number
  customerName: string
  mobile: string
  email: string
  gTotal: number
  placedOn: Date
}


type OrderedFoodItemType = {
  foodId: number,
  price: number,
  quantity: number,
  totalPrice: number,
}

type SelectOptionType = string |
{ value: string, text: string } |
{ value: number, text: string }