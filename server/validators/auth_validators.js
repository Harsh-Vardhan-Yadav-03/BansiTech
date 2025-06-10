const { z } = require("zod");

const loginSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .email("Invalid email address"),

password: z
  .string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(1, "First name cannot be empty"),

    lastName: z
      .string({ required_error: "Last name is required" })
      .min(1, "Last name cannot be empty"),

    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


module.exports = {signupSchema, loginSchema };