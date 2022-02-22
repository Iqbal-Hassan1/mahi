import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import auth from '../utils/middlewares/auth';

const user = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jobTitle: { type: String, required: false },
    mainContact: { type: String, required: true },
    secondaryContact: { type: String, required: false },
    userId: { type: String, required: false },
    orgnaizationId: { type: String, required: false },
    userType: { type: String, required: true },
    userStatus: { type: Number, required: false, default: 0 },
    region: {
        type: String,
        required: true,
    }


}, { timestamps: true });

user.index({ firstName: "text", lastName: "text", email: "text", userId: "text", orgnaizationId: "text" });

user.pre("save", async function () {
    const userThis = this;
    userThis.password = await bcrypt.hash(userThis.password, bcrypt.genSaltSync(10));

});

user.pre('findOneAndUpdate', async function (next) {
    const userThis = this.getUpdate();
    userThis.password = await bcrypt.hash(userThis.password, bcrypt.genSaltSync(10))
    next();
});

user.methods.validPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

user.methods.token = async function () {
    return await auth.generateToken(this._id, this.userType, '');
}

module.exports = mongoose.model('user', user);