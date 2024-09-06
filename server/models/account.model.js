import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    account_name: {
        type: String,
        required: true,
        unique: true
    },
    emails: {
        type: [String],
        required: true,
        default: []
    }
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);
export default Account;
