import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1];

    const tokenVerify = await (jwt.verify(token, 'KYCLSHb37FUbQVx0mUM6lxmWS0yWUD7Z'));
    const user = 0; // suppose to be continued with the proper variables of the database

    if (user) {
        req.user = user;
        next();
    } else {
        return res.sendStatus(403);
    }

    console.log(tokenVerify);

}
export default auth;