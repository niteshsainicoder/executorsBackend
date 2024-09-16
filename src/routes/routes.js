import express from "express";
import { executeCode } from "../controllers/codeController.js";

const router = express.Router();

router.post("/v1/api/code/execute", executeCode);
export default router;
