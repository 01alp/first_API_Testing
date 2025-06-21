## ✅ QA Automation Test Scenarios for `API Testing and JWT Verification`

This test suite validates the core functionality of the API, focusing on user authentication via JWT and order creation/management.

| #  | Scenario Description | Test Data | Expected Result |
|----|-----------------------|-----------|-----------------|
| 1  | **POST**: Submit a valid user name and password | `username: valid_user`, `password: valid_password` | `StatusCodes.OK`, JWT match |
| 2  | **POST**: Create a new order with valid data | `Valid new Order` | `StatusCodes.OK`, Order created with successful status code and corresponding data  |
| 3  | **GET**: Retrieve an existing order by ID | `orderId: ${_ORDERID_}` |  `StatusCodes.OK`, Order data matching the ID |
| 4  | **DELETE**: Delete an existing order by ID | `orderId: ${_ORDERID_}` | `StatusCodes.OK`, Order deleted with confirmation |

This test runs on Github
If you want to run locally:
Create .env file at the root directory. Use your login credentials as in example.env.txt  