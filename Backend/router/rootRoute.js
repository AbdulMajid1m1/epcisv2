import express from "express";
import AggregationEventRoute from "./AggregationEventRoute.js";
import EPCISEventsRoute from "./EPCISEventsRoute.js";
const router = express.Router();


// call all routes here

router.use("/", AggregationEventRoute);

router.use("/", EPCISEventsRoute);



export default router;
