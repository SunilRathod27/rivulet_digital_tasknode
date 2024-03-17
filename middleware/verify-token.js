const jwt = require('jsonwebtoken');

module.exports = {

    verifyToken: async function (req, res, next) {

        try {

            let bearer = req.headers['x-access-token'] || req.headers['authorization'];

            if (bearer) {
                let bearerToken = bearer.split(' ');
                let token = bearerToken[1];
                jwt.verify(token, process.env.SECREAT_KEY, (err, decoded) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'InValid Token, Please Re-Login !'
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: 'Token Not Provide!'
                })
            }

        } catch (error) {
            console.log("Error While Get Verify Token ", error);
        }

    }

}