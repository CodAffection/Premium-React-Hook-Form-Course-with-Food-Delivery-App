export const getFoodItems = () => {
  return [
    { foodId: 1, name: "Chicken Tenders", price: 3.5 },
    { foodId: 2, name: "GC. Sandwich", price: 3.99 },
    { foodId: 3, name: "Soup", price: 2.5 },
    { foodId: 4, name: "Onion Rings", price: 2.99 },
    { foodId: 5, name: "Fries", price: 1.99 },
    { foodId: 6, name: "SP. Fries", price: 2.49 },
    { foodId: 7, name: "Sweet Tea", price: 1.79 },
    { foodId: 8, name: "Botttle Water", price: 1 },
    { foodId: 9, name: "Canned Drinks", price: 1 },
  ] as FoodType[]
}

const ORDER_KEY = 'order'
export const createOrder = (order: FoodDeliveryFormType) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order))
}

export const fetchLastOrder = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const order = localStorage.getItem(ORDER_KEY)
  if (order == null) return null
  else return JSON.parse(order)
}