import express from 'express';
import { executeCode } from '../controllers/codeController.js';
import { asynchandler } from '../utils/asyncHandler.js';
import apiKeyMiddleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/run',apiKeyMiddleware, asynchandler(async (req, res) => {
    const { language, codeContent, args = [] } = req.body;

    if (!language || !codeContent) {
        return res.status(400).json({ success: false, error: 'Language and code are required' });
    }

    try {
        const output = await executeCode(language, codeContent, args);
        res.status(200).json({ success: true, output });
    } catch (error) {
        res.status(500).json({ success: false, error: error.toString() });
    }
}));

export default router;
