import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login_dto'
import { OrderDto } from './dto/order_dto'

const LOGINURL = 'login/student'
const ORDERURL = 'orders'
let TOKEN: string
let ORDERID: number

test.describe.configure({ mode: 'serial' })
test.describe('Login API with authorization ', () => {
  test.beforeAll(async ({ request }) => {
    const user = LoginDto.createLogin()
    const response = await request.post(LOGINURL, { data: user })
    const jwt = await response.text()
    TOKEN = jwt
  })

  test('Authorization Check', async () => {
    console.log('Token:', TOKEN)
    expect(TOKEN).toBeTruthy()
  })
  test('Create an order with current user', async ({ request }) => {
    const newOrder = OrderDto.createOrderData()
    const orderResponse = await request.post(ORDERURL, {
      data: newOrder,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const orderResponseBody = await orderResponse.json()
    console.log('OrderResponse: ', orderResponseBody)
    ORDERID = orderResponseBody.id
    expect(orderResponseBody.customerName).toBe(newOrder.customerName)
  })
  test('Find order by ID', async ({ request }) => {
    const getOrderID = await request.get(`${ORDERURL}/${ORDERID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const getOrderIDResponse = await getOrderID.json()
    console.log('Order found:', getOrderIDResponse)
    expect(ORDERID).toBe(getOrderIDResponse.id)
  })
  test('Delete order by ID', async ({ request }) => {
    const deleteOrder = await request.delete(`${ORDERURL}/${ORDERID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const deleteOrderResponse = await deleteOrder.json()
    console.log('Order Deleted:', deleteOrderResponse)
    expect(deleteOrder.status()).toBe(StatusCodes.OK)
  })
})
