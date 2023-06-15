const { db, query } = require("../database");

module.exports = {
  addAddress: async (req, res) => {
    try {
      const {
        iduser,
        first_name,
        last_name,
        idprovince,
        idcity,
        phone_number,
        label_address,
        postal_code,
        address,
        isprimary,
      } = req.body;

      if (isprimary) {
        let allAddressQuery = `select * from address where iduser=${db.escape(
          iduser
        )}`;
        const allAddress = await query(allAddressQuery);
        allAddress.map(async (address) => {
          if (address.isprimary) {
            let changePrimaryQuery = `update address set isprimary = false where idaddress = ${db.escape(
              address.idaddress
            )}`;
            await query(changePrimaryQuery);
          }
        });
      }

      let newAddressQuery = `insert into address values (null, ${db.escape(
        iduser
      )}, ${db.escape(address)}, ${db.escape(isprimary)}, ${db.escape(
        first_name
      )}, ${db.escape(last_name)}, ${db.escape(phone_number)}, ${db.escape(
        idprovince
      )}, ${db.escape(idcity)}, ${db.escape(postal_code)}, ${db.escape(
        label_address
      )})`;

      const newAddress = await query(newAddressQuery);
      console.log(newAddress);
      if (newAddress.affectedRows > 0) {
        return res
          .status(200)
          .send({ success: true, message: "Data successfully added" });
      } else {
        return res
          .status(200)
          .send({ success: false, message: "Fail to add data" });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
