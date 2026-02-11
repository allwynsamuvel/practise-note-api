import express from 'express';
import { checkHealth } from '../controllers/app.controller.js';

const appRouter = express.Router();

appRouter.get('/health', checkHealth);

export default appRouter;
