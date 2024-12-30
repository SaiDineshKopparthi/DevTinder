const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
    
        if(!token){
          throw new Error("Invalid Token!");
        }

        const decodedToken = await jwt.verify(token, "Sweeney80085Sydney");
        const { _id } = decodedToken;
    
        const user = await User.findById(_id);
    
        if(!user) {
          throw new Error("User Not Found!");
        }
    
        req.user = user;
        next();

      } catch (error) {
        res.status(400).send("Error in the Auth: " + error.message);
      }
};

module.exports = { userAuth };