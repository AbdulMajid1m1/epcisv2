import express from "express";
const router = express.Router();
import { checkAuthentication } from "../helpers/apiAuth.js";
import dotenv from "dotenv";
import EPCISController from "../controllers/EPCISEventsController.js";
dotenv.config();

// router.get("/getAllDataFrom", checkAuthentication,EPCISController);
router.get("/getAllDataFromEPCISEvents", checkAuthentication, EPCISController.getAllDataFromEPCISEvents);
router.get("/getEventsData", checkAuthentication, EPCISController.getEventsData);

router.post("/insertEPCISEvent", checkAuthentication, EPCISController.insertEPCISEvent);

export default router;
