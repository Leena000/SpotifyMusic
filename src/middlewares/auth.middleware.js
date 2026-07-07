// Imports JWT to verify authentication tokens.
const jwt = require('jsonwebtoken');

// Verifies that the logged-in user is an artist.
async function verifyArtistToken(req, res, next)
{
    // Reads the token from cookies.
    const token = req.cookies.token;

    // Stops the request if token is missing.
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
        // Verifies the token using the JWT secret from .env.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Allows only artist role to access artist-only routes.
        if(decoded.role !== 'artist'){
            return res.status(403).json({message: 'Forbidden: Only artists can create music'});
        }

        // Saves decoded user information on req.user for the next controller.
        req.user = decoded;
        
        // Moves to the next middleware/controller.
        next();
    }catch(error){
        // Sends invalid token response if verification fails.
        return res.status(401).json({message: 'Invalid Token'});
    }
}

// Verifies that the logged-in user is either a normal user or artist.
async function verifyUserOrArtistToken(req, res, next){
    // Reads the token from cookies.
    const token = req.cookies.token;

    // Stops the request if token is missing.
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
     // Verifies the token and gets the user id/role.
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
     // Allows only user and artist roles.
     if(decoded.role !== 'artist'){
        return res.status(403).json({message: 'Forbidden: Only users and artists can access this route'});
        }

        // Saves decoded token data for use in controllers.
        req.user = decoded;

        // Moves to the next middleware/controller.
        next();
     
    }catch(error){
        // Logs token errors for debugging.
        console.log(error);

        // Sends invalid token response.
        return res.status(401).json({message: 'Invalid Token'});
    }
}

// Exports middleware functions with route-friendly names.
module.exports = {authArtist: verifyArtistToken, authUser: verifyUserOrArtistToken}
