## ✅ QA Automation Test Scenarios for `API Testing and JWT Verification`

| #  | Scenario Description | Test Data | Expected Result |
|----|-----------------------|-----------|-----------------|
| 1  | **POST**: Submit a valid user name and password |  | `StatusCodes.OK`, JTW match|
| 2  | **POST**: Submit an invalid user name and password |  | `StatusCodes.UNAUTHORIZED)`, JTW Not match|


To test you need to Create .env file at the root directory. Login and password will be given trough Telegram