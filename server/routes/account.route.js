import express from "express";
import {
  create_account,
  add_email_to_account,
  check_account_name,
  check_account_name_not_exist,
  check_email_in_account,
  createDiary,
  getDiary,
  updateDiary,
  deleteDiary,
  updateThemeAndColor,
  getTheme,
  getColor,
  getEmailsInAccount
} from "../controllers/account.controller.js";
import { apiKeyAuth } from "../utils/apiKeyAuth.js";

const router = express.Router();

router.use(apiKeyAuth);

router.post("/create", create_account);
router.patch("/add-email", add_email_to_account);
router.get('/:account_name/emails', getEmailsInAccount);
router.get("/check/:account_name", check_account_name);
router.get("/check/not-exist/:account_name", check_account_name_not_exist);
router.get("/:account_name/email/:email", check_email_in_account);
router.post("/diaries", createDiary);
router.get("/diaries/:account_name", getDiary);
router.patch("/diaries/:account_name/:diaryId", updateDiary);
router.delete("/diaries/:account_name/:diaryId", deleteDiary);
router.patch('/:account_name/update-theme-color', updateThemeAndColor);
router.get('/:account_name/theme',getTheme)
router.get('/:account_name/color/:email', getColor);

export default router;
