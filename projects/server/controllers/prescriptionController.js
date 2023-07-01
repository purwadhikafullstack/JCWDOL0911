const { db, query } = require("../database");
const { format } = require("date-fns");

module.exports = {
  uploadPrescription: async (req, res) => {
    try {
      const iduser = parseInt(req.params.iduser);
      const filename = "/" + req.file.filename;
      const uploadPrescriptionQuery = `INSERT INTO prescription VALUES (null, null, ${db.escape(
        iduser
      )}, ${db.escape(filename)}, "ON QUEUE", ${db.escape(
        format(Date.now(), "yyyy-MM-dd HH:mm:ss")
      )})`;
      const uploadPrescription = await query(uploadPrescriptionQuery);
      if (uploadPrescription.affectedRows !== 0) {
        return res
          .status(200)
          .send({ success: true, message: "Prescription Submitted!" });
      } else {
        return res
          .status(200)
          .send({ success: false, message: "No Data Recorded" });
      }
    } catch (error) {
      return res.send(400).status(error);
    }
  },
};
