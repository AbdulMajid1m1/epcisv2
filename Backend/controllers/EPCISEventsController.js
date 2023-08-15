import { pool2, bcrypt, nodemailer, jwt, saltRounds, pool1 } from "../utils/common.js";
function parseJSONArrays(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "string") {
            try {
                obj[key] = JSON.parse(obj[key]);
            } catch (error) {
                // Ignore parsing errors, leave the value as is
            }
        }
    }
    return obj;
}


const EPCISController = {
    async getAllDataFromEPCISEvents(req, res, next) {
        try {
            const query = `
        SELECT * from EPCISEvents
      `;
            const pool = pool1;
            const request = pool.request();
            const data = await request.query(query);

            if (data.recordsets[0].length === 0) {
                return res.status(404).send({ message: "No Record found." });
            }

            const stringToArray = data.recordsets[0].map(parseJSONArrays);

            return res.status(200).send(stringToArray);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },

    async getEventsData(req, res, next) {
        try {
            const eventType = req.query.eventType; // Get the event type from query parameters
            const pool = pool1;
            const request = pool.request();

            const query = `
                SELECT *
                FROM EPCISEvents
                WHERE EventType = @eventType
            `;

            request.input("eventType", eventType);

            const result = await request.query(query);
            res.status(200).json(result.recordset);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },



    async insertEPCISEvent(req, res, next) {
        try {
            const {
                EventType,
                EventAction,
                EventTime,
                EventTimeZoneOffSet,
                epcList,
                bizStep,
                disposition,
                bizTransactionList,
                readPoint,
                sourceList,
                destinationList,
                sensorElementList,
                childQuantityList,
                childEPCs,
                parentID,
                inputEPCList,
                inputQuantityList,
                outputEPCList,
                ilmd,
                eventID,
                errorDeclaration,
                quantityList,
                persistentDisposition,
                creationDate,
                sender,
                receiver,
                instanceIdentifer
            } = req.body;

            const pool = pool1;
            const request = pool.request();

            const formatArrayParameter = (array) => {
                if (array && Array.isArray(array)) {
                    return JSON.stringify(array);
                } else if (array) {
                    return array.join(', ');
                }
                return null;
            };

            const query = `
            INSERT INTO EPCISEvents (
                EventType,
                EventAction,
                EventTime,
                EventTimeZoneOffSet,
                epcList,
                bizStep,
                disposition,
                bizTransactionList,
                readPoint,
                sourceList,
                destinationList,
                sensorElementList,
                childQuantityList,
                childEPCs,
                parentID,
                inputEPCList,
                inputQuantityList,
                outputEPCList,
                ilmd,
                eventID,
                errorDeclaration,
                quantityList,
                persistentDisposition,
                creationDate,
                sender,
                receiver,
                instanceIdentifer)
            VALUES (
                @EventType,
                @EventAction,
                @EventTime,
                @EventTimeZoneOffSet,
                @epcList,
                @bizStep,
                @disposition,
                @bizTransactionList,
                @readPoint,
                @sourceList,
                @destinationList,
                @sensorElementList,
                @childQuantityList,
                @childEPCs,
                @parentID,
                @inputEPCList,
                @inputQuantityList,
                @outputEPCList,
                @ilmd,
                @eventID,
                @errorDeclaration,
                @quantityList,
                @persistentDisposition,
                @creationDate,
                @sender,
                @receiver,
                @instanceIdentifer)
            `;

            request.input("EventType", EventType || null);
            request.input("EventAction", EventAction || null);
            request.input("EventTime", EventTime || null);
            request.input("EventTimeZoneOffSet", EventTimeZoneOffSet || null);
            request.input("epcList", formatArrayParameter(epcList));
            request.input("bizStep", bizStep || null);
            request.input("disposition", disposition || null);
            request.input("bizTransactionList", formatArrayParameter(bizTransactionList));
            request.input("readPoint", readPoint || null);
            request.input("sourceList", formatArrayParameter(sourceList));
            request.input("destinationList", formatArrayParameter(destinationList));
            request.input("sensorElementList", formatArrayParameter(sensorElementList));
            request.input("childQuantityList", formatArrayParameter(childQuantityList));
            request.input("childEPCs", formatArrayParameter(childEPCs));
            request.input("parentID", parentID || null);
            request.input("inputEPCList", formatArrayParameter(inputEPCList));
            request.input("inputQuantityList", formatArrayParameter(inputQuantityList));
            request.input("outputEPCList", formatArrayParameter(outputEPCList));
            request.input("ilmd", ilmd || null);
            request.input("eventID", eventID || null);
            request.input("errorDeclaration", errorDeclaration || null);
            request.input("quantityList", formatArrayParameter(quantityList));
            request.input("persistentDisposition", persistentDisposition || null);
            request.input("creationDate", creationDate || null);
            request.input("sender", sender || null);
            request.input("receiver", receiver || null);
            request.input("instanceIdentifer", instanceIdentifer || null);

            // Execute the query
            await request.query(query);

            return res.status(200).send({ message: "EPCISEvent inserted successfully." });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    }

}

export default EPCISController;


