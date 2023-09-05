import jwt from 'jsonwebtoken';

const resetPasswordAuth = (req, res, next) => {
    const token = req.query.token;

    if (!token) {
        return res.status(401).send({ message: 'Empty authentication query!'})
    }
    
    jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
       if(error) return res.status(403).send({ error: 'Authentication error'});

       req.user = credentials.user;
       next();
    });
}

export default resetPasswordAuth