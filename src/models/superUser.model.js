import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import auth from '../utils/middlewares/auth';

const SuperUser = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    UserId: {
        type: String,
        required: true
    },
    Permissions: {
        type: Array,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: 'Super Admin'
    }

}, { timestamps: true });

SuperUser.index({ username: "text", UserId: "text" });

SuperUser.pre("save", async function () {
    const userThis = this;
    userThis.password = await bcrypt.hash(userThis.password, bcrypt.genSaltSync(10));
});

SuperUser.pre('findOneAndUpdate', async function (next) {
    const userThis = this.getUpdate();
    userThis.password = await bcrypt.hash(userThis.password, bcrypt.genSaltSync(10))
    next();
});



SuperUser.methods.validPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

SuperUser.methods.token = async function () {
    return await auth.generateToken(this._id, this.userType, this.Permissions);
}


module.exports = mongoose.model('superuser', SuperUser);