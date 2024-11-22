const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    console.log("Inside require sign in ", req.headers.authorization);
    if (req.headers.authorization) {
        console.log("Header Verification");
        const token = req.headers.authorization.split(" ")[1];
        try {
            const user = jwt.verify(token, "marvel");  // Using a hardcoded secret for JWT verification
            console.log("User is: ", user);
            req.user = user;
            req.role = 'user';  // Setting role to user after successful authentication
            next();
        } catch (error) {
            // Handle any errors that might occur during token verification
            console.log("Error verifying token: ", error.message);
            res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        console.log("No Authorization");
        res.status(400).json({ message: "No Authorization" });
    }
};

exports.userMiddleware = (req, res, next) => {
    console.log("Inside user middleware, User role is: ", req.role);
    if (req.role !== "user") {
        return res.status(400).json({ message: "Access Denied" });
    }
    next();
};
