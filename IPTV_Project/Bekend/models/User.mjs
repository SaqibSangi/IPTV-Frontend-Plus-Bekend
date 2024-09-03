import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

// User schema definition
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Additional fields can be added here as needed
});

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// User model creation
const User = mongoose.model('User', userSchema);

// Validation schema for user registration
const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });
    return schema.validate(data);
};

// Validation schema for user login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    });
    return schema.validate(data);
};

// Exporting the User model and validation functions
export { User, validateUser, validateLogin };
