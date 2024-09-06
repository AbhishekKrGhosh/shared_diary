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
