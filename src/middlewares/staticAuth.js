require("dotenv").config();

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Token is missing in the request headers.",
      });
    }
    
    token = token.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decodedToken.id
    // req.APP_DATA = {
    //   tokenDecode: decodedToken,
    // };

    // console.log(req.APP_DATA);

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token. Please provide a valid token.",
      error: err.message,
    });
  }
}

module.exports = verifyToken;
