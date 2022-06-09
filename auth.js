import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    console.log('trying to auth')
    //we need to check if the header is not empty to prevert a non string varuble calling the aplit function
    const bearerHeader = String(req.headers['authorization']);
    if(bearerHeader == ''){
        return res.sendStatus(403);
    }
    console.log('got authorization from the request')
    //this line can crush if the token is empty!
    const token = bearerHeader.split(' ')[1];

    try{
        //the tokenVerify is the user if he exists
        const tokenVerify = await (jwt.verify(token, 'KYCLSHb37FUbQVx0mUM6lxmWS0yWUD7Z'));
        
        console.log('trying to check if the user exists')
        //if he is not null print some information to the console for debug and contine to the function with the user
        if (tokenVerify) {
            console.log('the user exists')
            console.log(tokenVerify)
            req.user = tokenVerify
            next();
        //the user not exists so we dont give access
        } else {
            return res.sendStatus(403);
        }
    }
    //there was error we dont give accsess
    catch{
        console.log('some error')
        return res.sendStatus(403);
    }

}
export default auth;