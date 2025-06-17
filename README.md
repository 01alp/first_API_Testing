| #  | Scenario Description | Test Data | Expected Result |
|----|-----------------------|-----------|-----------------|
| 1  | **PUT**: Update an order with a valid order ID and a valid 16-digit API key in the `api_key` header. | Order ID: `1234567890123456`<br>API Key: Valid (16-digit) | `StatusCodes.OK` |
| 2  | **PUT**: Attempt to update an order with an invalid order ID and an invalid 3-digit API key in the `api_key` header. | Order ID: `123`<br>API Key: Invalid (3-digit) | `StatusCodes.UNAUTHORIZED` |
| 3  | **DELETE**: Delete an order using a valid order ID and a valid 16-digit API key in the `api_key` header. | Order ID: `1234567890123456`<br>API Key: Valid (16-digit) | `StatusCodes.NO_CONTENT` |
| 4  | **DELETE**: Attempt to delete an order using an invalid order ID with a valid 3-digit API key in the `api_key` header. | Order ID: `123`<br>API Key: Valid (3-digit) | `StatusCodes.UNAUTHORIZED` |
| 5  | **GET**: Authenticate a user with a valid username and password. Returns a 16-character API key. | Username: `"user1"`<br>Password: `"pass"` | `StatusCodes.OK` |
| 6  | **GET**: Attempt authentication with an empty username and password. Should return a server error. | Username: `""`<br>Password: `""` | `StatusCodes.INTERNAL_SERVER_ERROR` |

----

## ✅ QA Automation Test Scenarios for `/api/loan-calc/decision`

| #  | Scenario Description | Test Data | Expected Result |
|----|-----------------------|-----------|-----------------|
| 1  | **POST**: Submit a valid data parameters Positive decision | (5000, 0, 30, true, 300, 30) | `StatusCodes.OK` |
| 2  | **POST**: Submit a valid data parameters Negative decision | (2000, 0, 30, true, 30000, 12)| `StatusCodes.BAD_REQUEST` |
| 3  | **POST**: Submit a negative income |(-1000, 0, 30, true, 300, 30) | `StatusCodes.BAD_REQUEST` |
| 4  | **POST**: Submit zero income | (0, 0, 30, true, 30000, 12) | `StatusCodes.BAD_REQUEST`|
| 5  | **POST**: Submit non-JSON content | Content-Type: `text/plain` | `StatusCodes.UNSUPPORTED_MEDIA_TYPE` |
| 6  | **POST**: Validate business logic for unemployed | (300, 0, 30, false, 600, 12) | `Positive risk decision`⁉️|