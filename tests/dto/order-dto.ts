export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }
}

export class RiskDecision {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number
  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
}
