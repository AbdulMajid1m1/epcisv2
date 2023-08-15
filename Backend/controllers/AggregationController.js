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

const AggregationController = {
    async getAllDataFromAggregationEvent(req, res, next) {
        try {
            const query = `
        SELECT * from AggregationEvent
      `;
            const pool = pool1;
            const request = pool.request();
            const data = await request.query(query);

            if (data.recordsets[0].length === 0) {
                return res.status(404).send({ message: "No Record found." });
            }

            // return res.status(200).send(data.recordsets[0]);
            const stringToArray = data.recordsets[0].map(parseJSONArrays);

            return res.status(200).send(stringToArray);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    },


    async insertAggregationEvent(req, res, next) {
        console.log(req.body);
        try {
            const {
                parentID,
                childEPCs,
                childQuantityList,
                action,
                bizStep,
                disposition,
                readPoint,
                bizLocation,
                bizTransactionList,
                sourceList,
                destinationList,
                sensorElementList
            } = req.body;

            const pool = pool1;
            const request = pool.request();

            // Helper function to format array parameters
            const formatArrayParameter = (array) => {
                if (Array.isArray(array)) {
                    return JSON.stringify(array);
                } else {
                    return array.join(', ');
                }
            };

            // Construct the INSERT query
            const query = `
            INSERT INTO AggregationEvent (type, parentID, childEPCs, childQuantityList, action, bizStep, disposition, readPoint, bizLocation, bizTransactionList, sourceList, destinationList, sensorElementList)
            VALUES ('AggregationEvent', @parentID, @childEPCs, @childQuantityList, @action, @bizStep, @disposition, @readPoint, @bizLocation, @bizTransactionList, @sourceList, @destinationList, @sensorElementList)
          `;

            // Set the parameter values
            request.input("parentID", parentID);
            request.input("childEPCs", formatArrayParameter(childEPCs));
            request.input("childQuantityList", formatArrayParameter(childQuantityList));
            request.input("action", action);
            request.input("bizStep", bizStep);
            request.input("disposition", disposition);
            request.input("readPoint", readPoint);
            request.input("bizLocation", bizLocation);
            request.input("bizTransactionList", formatArrayParameter(bizTransactionList));
            request.input("sourceList", formatArrayParameter(sourceList));
            request.input("destinationList", formatArrayParameter(destinationList));
            request.input("sensorElementList", formatArrayParameter(sensorElementList));

            // Execute the query
            await request.query(query);

            return res.status(200).send({ message: "AggregationEvent inserted successfully." });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    }
    ,



};

export default AggregationController;
