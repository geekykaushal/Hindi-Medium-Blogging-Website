const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('jwtSecret')

module.exports =  async (req ,res , next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({msg:"Acess Denied"})
    }

    try {
        const decoded = jwt.verify(token , secret)

        req.user = decoded.user
         
        next();
    } catch (err) {
        console.log("Token Invalid");
        return res.status(500).send('server error')
    }
}

