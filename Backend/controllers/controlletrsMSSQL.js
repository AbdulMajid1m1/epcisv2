import { pool2, bcrypt, nodemailer, jwt, saltRounds } from "../utils/common.js";

const TracebilityStep1 = {
  async test(req, res, next) {
    try {
      const query = `
        SELECT * from tbl_ItemsReAllocationPicked
      `;
      const pool = pool2;
      const request = pool.request();
      const data = await request.query(query);

      if (data.recordsets[0].length === 0) {
        return res.status(404).send({ message: "No items found." });
      }
      return res.status(200).send(data.recordsets[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },

  // Other controller methods...
};

export default TracebilityStep1;
