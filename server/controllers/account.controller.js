import Account from "../models/account.model.js";
import {io} from '../index.js'

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

export const getEmailsInAccount = async (req, res, next) => {
  try {
    const { account_name } = req.params;

    const account = await Account.findOne({ account_name });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json({ emails: account.emails });
  } catch (error) {
    next(error); 
  }
};

export const check_account_name = async (req, res, next) => {
    try {
        const { account_name } = req.params;

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
        const { account_name } = req.params;

        const account = await Account.findOne({ account_name });

        if (!account) {
            return res.status(200).json({ not_exist: true, message: 'Account name does not exist' });
        } else {
            return res.status(409).json({ not_exist: false, message: 'Account name exists' });
        }
    } catch (error) {
        next(error);
    }
};


export const check_email_in_account = async (req, res, next) => {
    try {
        const { account_name, email } = req.params; 

        const account = await Account.findOne({ account_name });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const emailExists = account.emails.includes(email);

        if (emailExists) {
            return res.status(200).json({ email_exists: true, message: 'Email exists in the account' });
        } else {
            return res.status(404).json({ email_exists: false, message: 'Email does not exist in the account' });
        }
    } catch (error) {
        next(error);
    }
};


export const createDiary = async (req, res) => {
    try {
      const { account_name, email, title, description, location, tags } = req.body;
      
      const account = await Account.findOne({ account_name });
  
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      const newDiary = { title, description, location, tags, email };
  
      account.diaries.push(newDiary);
      await account.save();
  
      io.emit('update')

      res.status(201).json({ message: 'Diary entry added successfully', diary: newDiary });
    } catch (error) {
      res.status(500).json({ message: 'Error adding diary entry', error });
    }
  }

  export const getDiary = async (req, res) => {
    try {
      const { account_name } = req.params;
  
      const account = await Account.findOne({ account_name });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      res.status(200).json(account.diaries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching diary entries', error });
    }
  }

  export const updateDiary = async (req, res) => {
    try {
      const { account_name, diaryId } = req.params;
      const { title, description, location, tags } = req.body;
  
      const account = await Account.findOne({ account_name });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      const diary = account.diaries.id(diaryId);
      if (!diary) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }
  
      diary.title = title || diary.title;
      diary.description = description || diary.description;
      diary.location = location || diary.location;
      diary.tags = tags || diary.tags;
  
      await account.save();
  
      io.emit('update')

      res.status(200).json({ message: 'Diary entry updated successfully', diary });
    } catch (error) {
      res.status(500).json({ message: 'Error updating diary entry', error });
    }
  }

  export const deleteDiary = async (req, res) => {
    try {
      const { account_name, diaryId } = req.params;
      console.log(account_name, diaryId)
      const account = await Account.findOne({ account_name });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      const diary = account.diaries.id(diaryId);
      console.log(diary)
      if (!diary) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }
  
      account.diaries.pull(diaryId); 
      await account.save();
  
      io.emit('update')
      
      res.status(200).json({ message: 'Diary entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting diary entry', error });
    }
  };
  

export const updateThemeAndColor = async (req, res) => {
  try {
      const { account_name, theme, email, color } = req.body;

      const sanitizedEmail = email ? email.replace(/\./g, '_') : null;

      const account = await Account.findOne({ account_name });

      if (!account) {
          return res.status(404).json({ message: 'Account not found' });
      }

      if (theme) {
          account.theme = theme;
      }

      if (sanitizedEmail && color) {
          account.colors.set(sanitizedEmail, color);
      }

      await account.save();

      io.emit('update', { account_name, theme, email, color });
      
      res.status(200).json({ message: 'Theme and/or color updated successfully', account });
  } catch (error) {
      console.error('Error details:', error);

      res.status(500).json({ message: 'Error updating theme and/or color', error: error.message });
  }
};

export const getTheme = async (req, res) => {
  try {
    const { account_name } = req.params;

    const account = await Account.findOne({ account_name });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(account.theme);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diary entries', error });
  }
}

export const getColor = async (req, res) => {
  try {
    const { account_name, email } = req.params;

    const sanitizedEmail = email ? email.replace(/\./g, '_') : null;

    const account = await Account.findOne({ account_name });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    const color = account.colors.get(sanitizedEmail);

    if (color) {
      res.status(200).json({ color });
    } else {
      res.status(404).json({ message: 'Color not found for the given email' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching color', error: error.message });
  }
};