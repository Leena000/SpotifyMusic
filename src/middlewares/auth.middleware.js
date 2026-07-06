const jwt = require('jsonwebtoken');


async function authMiddleware(req, res, next)
{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'artist'){
            return res.status(403).json({message: 'Forbidden: Only artists can create music'});
        }
        req.user = decoded;
        
        next();
    }catch(error){
        return res.status(401).json({message: 'Invalid Token'});
    }
}

async function authUser(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
     if(decoded.role !== 'user' && decoded.role !== 'artist'){
        return res.status(403).json({message: 'Forbidden: Only users and artists can access this route'});
        }
        req.user = decoded;

        next();
     
    }catch(error){
        console.log(error);
        return res.status(401).json({message: 'Invalid Token'});
    }
}
module.exports = {authArtist: authMiddleware, authUser: authUser}