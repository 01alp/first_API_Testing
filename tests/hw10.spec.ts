import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { RiskDecision } from './dto/order-dto'

const URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'
test('1- Post a valid data parameters Negative decision', async ({ request }) => {
  const inputData = new RiskDecision(100, 0, 17, true, 1000, 12)
  const response = await request.post(URL, {
    data: inputData,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
  expect.soft(body.riskDecision).toBe('negative')
})
test('2- Post a valid data parameters Positive decision, Medium risk', async ({ request }) => {
  const inputData = new RiskDecision(2000, 0, 30, true, 500, 6)
  const response = await request.post(URL, {
    data: inputData,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
  expect.soft(body.riskDecision).toBe('positive')
  expect.soft(body.riskLevel).toBe('Medium Risk')
})
test('3- Post a valid data parameters Positive decision, Low risk', async ({ request }) => {
  const inputData = new RiskDecision(2000, 0, 30, true, 500, 12)
  const response = await request.post(URL, {
    data: inputData,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
  expect.soft(body.riskDecision).toBe('positive')
  expect.soft(body.riskLevel).toBe('Low Risk')
})
test('4- Post a valid data with 0 income', async ({ request }) => {
  const inputData = new RiskDecision(0, 0, 30, true, 30000, 12)
  const response = await request.post(URL, {
    data: inputData,
  })
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  const body = await response.text()
  console.log(body)
})
test('5- Submit non-JSON content, Content-Type: text/plain', async ({ request }) => {
  const inputData = new RiskDecision(2000, 0, 30, true, 30000, 12)
  const response = await request.post(URL, {
    headers: {
      'Content-Type': 'text/plain',
      Accept: '*/*',
    },
    data: inputData,
  })
  expect.soft(response.status()).toBe(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
  const body = await response.text()
  console.log(body)
})
test('6- Validate business logic for unemployed', async ({ request }) => {
  const inputData = new RiskDecision(300, 0, 30, false, 600, 12)
  const response = await request.post(URL, {
    data: inputData,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const body = await response.json()
  console.log(body)
})
