import express from 'express';
import { create_account, add_email_to_account } from '../controllers/account.controller.js';

const router = express.Router();

// Route to create a new account
router.post('/create', create_account);

// Route to add an email to an existing account by account_name
router.patch('/add-email', add_email_to_account);

export default router;
