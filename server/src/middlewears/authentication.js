//authentication middelwear
const jwt = require("jsonwebtoken")
const seceretekey = process.env['SECRET_KEY']

const authentication = (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).json({msg: "not authorized"})

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, seceretekey, (err, data) => {
      if (err) return res.status(403).json({msg: "wrong or expired token"})
      else {
        req.user = data
        next()
      }
    })
  }
}

module.exports = authentication
