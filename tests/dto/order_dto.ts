export class OrderDto {
  status: string
  courierId: number | undefined
  customerName: string
  customerPhone: string
  comment: string
  id: number | undefined

  constructor(
    status: string,
    courierId: number | undefined,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number | undefined,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }
  static createOrderData(): OrderDto {
    return new OrderDto('OPEN', 8, 'alperbal', '+3721234567', 'New Order', 0)
  }
}
