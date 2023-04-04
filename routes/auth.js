const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;

    if (token == null) {
        return res.status(401).render('login',{data:"unaothorized", title:"login"}); // Unauthorized)
    } 

  jwt.verify(token, '09f26e402586e2faa8da4c98a35f1b20d6b033c60', (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user
    console.log(req.user.name)



   

    next()
  })
}
 module.exports= authenticateToken