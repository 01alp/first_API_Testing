import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login_dto'

const JWTPATTERN = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
const LOGINURL = 'login/student'
test.describe('HW11 API Testing and JWT Verification', () => {
  test('Login with correct data and verify token', async ({ request }) => {
    const user = LoginDto.createLoginWithCorrectData()
    console.log('userData: ', user)
    const response = await request.post(LOGINURL, {
      data: user,
    })
    const responseBody = await response.text()
    console.log('Response code: ', response.status())
    console.log('Response Body', responseBody)
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody).toMatch(JWTPATTERN)
  })
  test('Login with incorrect user name and password and verify token ', async ({ request }) => {
    const user = LoginDto.createLoginWithIncorrectData()
    console.log('userData: ', user)
    const response = await request.post(LOGINURL, {
      data: user,
    })
    const responseBody = await response.text()
    console.log('Response code: ', response.status())
    console.log('Response Body', responseBody)
    expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect.soft(responseBody).not.toMatch(JWTPATTERN)
  })
})
