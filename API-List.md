### Dev Tinder APIs

#### Part One - authRouter
- POST /signup
- POST /login
- POST /logout

#### Part Two - profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

#### Part Three - connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

The above two APIs can be made dynamic into one.
- POST /request/send/:status/:userId

Similar case with the below two APIs
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

The dynamic one is as listed below.
- POST /request/review/:status/:requestId

#### Part Four - 
- GET /user/requests/received
- GET /users/connections
- GET /user/feed - Gets you the profiles of other users on the platform.

Status: Ignore, Interested, Accepted, Rejected