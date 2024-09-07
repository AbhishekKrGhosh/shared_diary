import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    tags: {
        type: [String],  
        required: false,
        default: [] 
    },
    email: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const accountSchema = new mongoose.Schema({
    account_name: {
        type: String,
        required: true,
        unique: true
    },
    theme: {
        type: String,
        default: "/src/assets/images/fantasy.png" 
    },
    emails: {
        type: [String],
        required: true,
        default: []
    },
    diaries: {
        type: [diarySchema],
        default: []
    },
    colors: {
        type: Map,
        of: String,
        default: new Map()
    }
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);
export default Account;
