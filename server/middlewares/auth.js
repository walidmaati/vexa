import jwt from "jsonwebtoken";

// User authentication checking middleware
const userAuth = (req, res, next) => {
  // Getting the token from the headers
  const { token } = req.headers;

  // Checking if the token exists or not
  if (!token) {
    return res.json({ success: false, message: "Please Log In" });
  }
  try {
    // Decoding the token, and verifying it using jwt.verify
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // Checking if tokenDecode.id exists or not
    /*@
      -- tokenDecode.id as an object contains the key id
      -- id is already assigned when we generated the token using jwt.sign()
      -- Trying to decode the token, to get the ID hashed in the token, to use it in the middleware and authentication
    @*/
    if (tokenDecode.id) {
      // Checking if req.body undefined, or exists
      req.body = req.body || {};

      // Assigning the tokenDecode.id to the value in the body userId
      // userId will be used to check whether the user exists or not or logged in or not
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: "Please Log In" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
