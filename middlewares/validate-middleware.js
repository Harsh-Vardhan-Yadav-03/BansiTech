const { parse } = require("../validators/auth_validators");

const validate = () => async ( req, res, next) => {
    try {
        const parseBody = await schema.parseAsync( req.body );
        req.body = parseBody;
        next(); 
    } catch (err) {
        const status = 422;
        const message = " Fill up input properly";
        const extraDetails =  err.error[0].message;

        const error = {
            status, message , extraDetails,
        };
        console.log( message );
        // res.status(400).json({ msg: message });      No need to do this . We handle this by error middleware
        next(error);
    }
};

module.exports = validate;