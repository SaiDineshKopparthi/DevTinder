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
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

#### Part Four - 
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on the platform.

Status: Ignore, Interested, Accepted, Rejected