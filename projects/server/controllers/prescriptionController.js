const { db, query } = require("../database");
const { format } = require("date-fns");

module.exports = {
  uploadPrescription: async (req, res) => {
    const iduser = parseInt(req.params.iduser);
    const filename = "/" + req.file.filename;
    const uploadPrescriptionQuery = `INSERT INTO prescription VALUES (null, null, ${db.escape(
      iduser
    )}, ${db.escape(filename)}, "ONQUEUE", ${db.escape(
      format(Date.now(), "yyyy-MM-dd HH:mm:ss")
    )})`;
    console.log(uploadPrescriptionQuery);
  },
};
