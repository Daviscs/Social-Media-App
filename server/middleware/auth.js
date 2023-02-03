import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) =>{
    try {
        let token = req. hearder("Authorization");
        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            //Remove the Bearer and retrieve everything after the Bearer
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.sign(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}