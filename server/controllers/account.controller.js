import Account from "../models/account.model.js";

export const create_account = async (req, res, next) => {
    try {
        const { account_name, email } = req.body;

        const existingAccount = await Account.findOne({ account_name });
        if (existingAccount) {
            return res.status(400).json({ message: 'Account name already exists' });
        }

        const newAccount = new Account({
            account_name,
            emails: [email] 
        });

        await newAccount.save();

        res.status(201).json(newAccount);
    } catch (error) {
        next(error);
    }
};

export const add_email_to_account = async (req, res, next) => {
    try {
        const { account_name, email } = req.body; 

        const account = await Account.findOne({ account_name });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.emails.includes(email)) {
            return res.status(400).json({ message: 'Email already exists in the account' });
        }

        account.emails.push(email);

        await account.save();

        res.status(200).json(account);
    } catch (error) {
        next(error);
    }
};


export const check_account_name = async (req, res, next) => {
    try {
        const { account_name } = req.params; // Get the account_name from the route parameters

        // Search for the account in the database by account_name
        const account = await Account.findOne({ account_name });

        if (account) {
            return res.status(200).json({ exists: true, message: 'Account name exists' });
        } else {
            return res.status(404).json({ exists: false, message: 'Account name does not exist' });
        }
    } catch (error) {
        next(error);
    }
};

export const check_account_name_not_exist = async (req, res, next) => {
    try {
        const { account_name } = req.params; // Get the account_name from the route parameters

        // Search for the account in the database by account_name
        const account = await Account.findOne({ account_name });

        if (!account) {
            // If no account is found, return a success response
            return res.status(200).json({ not_exist: true, message: 'Account name does not exist' });
        } else {
            // If account exists, return a 409 conflict response
            return res.status(409).json({ not_exist: false, message: 'Account name exists' });
        }
    } catch (error) {
        next(error);
    }
};


export const check_email_in_account = async (req, res, next) => {
    try {
        const { account_name, email } = req.params; // Get account_name and email from the route parameters

        // Search for the account in the database by account_name
        const account = await Account.findOne({ account_name });

        if (!account) {
            // If no account is found, return a 404 response
            return res.status(404).json({ message: 'Account not found' });
        }

        // Check if the email exists in the emails array
        const emailExists = account.emails.includes(email);

        if (emailExists) {
            // If email exists, return a 200 response with confirmation
            return res.status(200).json({ email_exists: true, message: 'Email exists in the account' });
        } else {
            // If email does not exist, return a 404 response
            return res.status(404).json({ email_exists: false, message: 'Email does not exist in the account' });
        }
    } catch (error) {
        next(error);
    }
};


