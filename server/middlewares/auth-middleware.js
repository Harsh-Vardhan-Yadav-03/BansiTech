const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async( req, res, next) => {
    const token = req.header("Authorization");
   
    if(!token){
        return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided"});
    }


    const jwtToken = token.replace("Bearer ", "").trim();
    // console.log("Parsed Token", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

        const userData = await User.findOne({ email: isVerified.email }).select("-password");

        console.log(isVerified);
        
        //here we are attaching user data to request to give the access in auth_controller file
        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token"});
    }
};

module.exports = authMiddleware;