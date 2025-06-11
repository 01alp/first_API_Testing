import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Inspect Api response', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  const data = await response.json()
  console.log('🟢Api response data: ', data)
})

test('1-Put: Update an order by providing a valid order ID. Requires a valid 16-digit API key', async ({
  request,
}) => {
  const apiKey = '1234567890123456'
  const requestBody = {
    status: 'OPEN',
    courierId: 22,
    customerName: 'Updated Samuel',
    customerPhone: '+37255544422',
    comment: 'Updated Order',
    id: 1,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: {
      api_key: apiKey,
    },
    data: requestBody,
  })
  console.log('Put response', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})
test('2-Put: Update an order by providing an invalid order ID. Requires an invalid 3-digit API key', async ({
  request,
}) => {
  const apiKey = '123'

  const requestBody = {
    status: 'OPEN',
    courierId: 22,
    customerName: 'Updated Samuel',
    customerPhone: '+37255544422',
    comment: 'Updated Order',
    id: 1,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: {
      api_key: apiKey,
    },
    data: requestBody,
  })
  console.log('Put response', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('3-Delete: Delete an order by providing a valid order ID. Requires a valid 16-digit API key  ', async ({
  request,
}) => {
  const apiKey = '1234567890123456'
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: {
      api_key: apiKey,
    },
  })
  console.log('Delete response: ', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})
test('4-Delete an order by providing an invalid order ID. Requires an invalid 3-digit API key  ', async ({
  request,
}) => {
  const apiKey = '123'
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: {
      api_key: apiKey,
    },
  })
  console.log('Delete response: ', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('5- Authenticate a user by providing a valid username and password. Returns a 16-character API key. ', async ({
  request,
}) => {
  const params = new URLSearchParams({
    username: 'user1',
    password: 'pass',
  }).toString()
  const response = await request.get(`https://backend.tallinn-learning.ee/test-orders?${params}`)
  const data = await response.json()
  console.log('Received API key: ', data.apiKey)
  console.log('Received Message: ', data.message)
  expect(response.status()).toBe(StatusCodes.OK)
})
test('6- Authenticate a user by providing an empty username,password. Replies with a 500 error', async ({
  request,
}) => {
  const params = new URLSearchParams({
    username: '',
    password: '',
  }).toString()
  const response = await request.get(`https://backend.tallinn-learning.ee/test-orders?${params}`)
  const data = await response.json()
  console.log('Received API key: ', data.apiKey)
  console.log('Received Message: ', data.message)
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
