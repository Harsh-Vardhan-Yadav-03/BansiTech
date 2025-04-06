// const { parse } = require("../validators/auth_validators");

const validate = (schema) => async ( req, res, next) => {
    try {
        const parseBody = await schema.parseAsync( req.body );
        req.body = parseBody;
        next(); 
    } catch (err) {
        const status = 422;
        const message = " Fill up input properly";
        let extraDetails = "Invalid input";

        // Check if it's a ZodError (has 'errors' array)
        if (err.errors && Array.isArray(err.errors) && err.errors[0]?.message) {
            extraDetails = err.errors[0].message;
        } else if (err.message) {
            extraDetails = err.message;
        }

        const error = {
            status, message , extraDetails,
        };
        console.log( message );
        // res.status(400).json({ msg: message });      No need to do this . We handle this by error middleware
        next(error);
    }
};

module.exports = validate;