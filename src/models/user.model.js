import mongoose from 'mongoose';
import { hashSync, compareSync } from 'bcryptjs';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    createdAt: Date,
    updatedAt: Date,
}, { collection: 'users', versionKey: false, _id : false });

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this.hashPassword(this.password);
        return next();
    }

    return next();
});

userSchema.methods = {
    hashPassword(password) {
        return hashSync(password);
    },
    checkPassword(password) {
        return compareSync(password, this.password);
    },
};

const User = mongoose.model('User', userSchema);

module.exports = User;
