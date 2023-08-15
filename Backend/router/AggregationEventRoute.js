import express from "express";
const router = express.Router();
import { checkAuthentication } from "../helpers/apiAuth.js";
import dotenv from "dotenv";
import AggregationController from "../controllers/AggregationController.js";
dotenv.config();

router.get("/getAllDataFromAggregationEvent", checkAuthentication, AggregationController.getAllDataFromAggregationEvent);

router.post("/insertAggregationEvent", checkAuthentication, AggregationController.insertAggregationEvent);


export default router;
