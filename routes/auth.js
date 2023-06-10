const jwt = require('jsonwebtoken');
// authenticcate user in order to access routes function
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    // check the user cookie

    if (token == null) {
        return res.status(401).render('login',{data:"unaothorized", title:"login"}); // Unauthorized)
    } 
//verifiy user according to a Access token '09f26e402586e2faa8da4c98a35f1b20d6b033c60'
  jwt.verify(token, '09f26e402586e2faa8da4c98a35f1b20d6b033c60', (err, user) => {
    console.log(err)
// log error
    if (err) return res.sendStatus(403)
//output token data for usage
    req.user = user
   // console.log(req.user.name)



   

    next()
  })
}
 module.exports= authenticateToken