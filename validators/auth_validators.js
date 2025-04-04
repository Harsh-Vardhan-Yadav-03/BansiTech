const { z } = require("zod");

//creating an object schema
const signupSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, { message: "Name must be atleast of 3 characters"})
    .max(200, { message: " Name must not be more than 200 characters"}),
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({ message: "Invalid email address"})
    .min(3, { message: "Email must be atleast of 3 characters"})
    .max(200, { message: " Email must not be more than 200 characters"}),
    phone: z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, { message: "Phone must be atleast of 10 characters"})
    .max(20, { message: " Phone must not be more than 20 characters"}),
    password: z
    .string({required_error: "Password is required"})
    .min(6, { message: "Password must be atleast of 6 characters"})
    .max(1024, { message: " Password must not be more than 1024 characters"}),
});

module.exports = signupSchema;