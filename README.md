|# | Scenario name | Test data |
|--|---------------| --------- |
|1 | Put: Update an order by providing a valid order ID. Requires a valid 16-digit API key in the 'api_key' header.|1234567890123456,StatusCodes.OK|
|2 | Put: Update an order by providing an invalid order ID. Requires an invalid 3-digit API key in the 'api_key' header.|123,StatusCodes.UNAUTHORIZED|
|3 | Delete: Delete an order by providing a valid order ID. Requires a valid 16-digit API key in the 'api_key' header.|1234567890123456,StatusCodes.NO_CONTENT|
|4 | Delete: Delete an order by providing an invalid order ID. Requires a valid 3-digit API key in the 'api_key' header.|123,StatusCodes.UNAUTHORIZED|
|5 | Get: Authenticate a user by providing a valid username and password. Returns a 16-character API key. Replies with a 500 error if either username or password is missing.|"user1", "pass",StatusCodes.OK|
|6 | Get: Authenticate a user by providing an empty username,password. Returns a 16-character API key. Replies with a 500 error if either username or password is missing.|"", "",StatusCodes.INTERNAL_SERVER_ERROR|