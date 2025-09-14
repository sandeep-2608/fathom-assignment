import Joi from "joi";

// User registration validation schema
export const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("admin", "user").default("user").messages({
    "any.only": "Role must be 'admin' or 'user'",
  }),
});

// User login validation schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const shipValidationSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Ship name is required",
    "string.min": "Ship name must be at least 2 characters long",
    "any.required": "Ship name is required",
  }),
  type: Joi.string()
    .valid("cargo", "passenger", "military", "fishing", "other")
    .default("cargo")
    .messages({
      "any.only":
        "Ship type must be 'cargo', 'passenger', 'military', 'fishing', or 'other'",
      "any.required": "Ship type is required",
    }),
  capacity: Joi.number().min(1).required().messages({
    "number.base": "Capacity must be a number",
    "number.min": "Capacity must be at least 1",
    "any.required": "Ship capacity is required",
  }),
  port: Joi.string().min(2).required().messages({
    "string.empty": "Port is required",
    "string.min": "Port must be at least 2 characters long",
    "any.required": "Port is required",
  }),
  status: Joi.string()
    .valid("active", "inactive", "maintenance")
    .default("active")
    .messages({
      "any.only": "Status must be 'active', 'inactive', or 'maintenance'",
    }),
});
