export interface CheckoutI {
  id: number
  userId: number
  status: string
  createdAt: string
  data: Data
}

export interface Data {
  products: Product[]
}

export interface Product {
  id: number
  count: number
}