import express from 'express';
import { create_account, add_email_to_account, check_account_name, check_account_name_not_exist, check_email_in_account } from '../controllers/account.controller.js';

const router = express.Router();

router.post('/create', create_account);
router.patch('/add-email', add_email_to_account);
router.get('/check/:account_name', check_account_name);
router.get('/check/not-exist/:account_name', check_account_name_not_exist);
router.get('/:account_name/email/:email', check_email_in_account);

export default router;
