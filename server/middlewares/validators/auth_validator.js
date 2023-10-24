const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) =>{
    try {
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json(
                {
                    message: "Access denied. No token provided!!"
                }
            )
        }
        
        if(authHeader && authHeader.startsWith("Bearer")){
            const token = authHeader.split(" ")[1]
            if(!token){
                res.status(401).json(
                    {
                        message: 'Access denied. No token provided!!'
                    }
                )
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
                if(err){
                    return res.status(403).json(
                        {
                            message: 'Invalid Token'
                        }
                    )
                }
                req.current = user
                next()
            })
        }

    } catch (error) {
        next(error);
    }
}

module.exports = authenticateToken