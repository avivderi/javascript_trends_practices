import express from "express";
import { createNewOperator } from "../controllers/operatorsController.js";
import {
    middleValidation,
    newOperatorSchema,
} from "../middleware/middlewares.js";

const operatorsRouter = express.Router();

operatorsRouter.post(
    "/",
    middleValidation(newOperatorSchema),
    async (req, res) => {
        try {
            await createNewOperator(req, res);
        } catch (error) {
            throw error;
        }
    },
);

export default operatorsRouter;
