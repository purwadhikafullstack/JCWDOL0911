const { db, query } = require("../database");

module.exports = {
<<<<<<< Updated upstream
    ProvinceList: async (req, res) => {
        console.log('im called');
        const provincesQuery = await query('SELECT * FROM province') 
        res.status(200).send(provincesQuery)
    },
    addUserAddress: async (req, res) => {
        let { idUser, idCity, idProvince, street, isPrimary, district, postal_code,cityName,type } = req.body
        idUser = parseInt(idUser)
        idCity = parseInt(idCity)
        idProvince = parseInt(idProvince)
        postal_code = parseInt(postal_code)
        if (isPrimary) {
            await query (`UPDATE address SET isprimary = false WHERE isprimary = true`)
        }
        const addressQuery = await query(`INSERT INTO address VALUES(null,${db.escape(idUser)},${db.escape(idCity)},${db.escape(idProvince)},${db.escape(street)},${db.escape(isPrimary)},${db.escape(district)},${db.escape(postal_code)},${db.escape(cityName)},${db.escape(type)})`)
        res.status(200).send({message:"Address Created"})
    },
    primaryUserAddres: async (req, res) => {
    const idUser = parseInt(req.params.userId)
    const primaryAddress = await query(`SELECT address.*, province.province, user.full_name,user.phone_number
=======
  ProvinceList: async (req, res) => {
    const provincesQuery = await query("SELECT * FROM province");
    res.status(200).send(provincesQuery);
  },
  addUserAddress: async (req, res) => {
    let {
      idUser,
      idCity,
      idProvince,
      street,
      isPrimary,
      district,
      postal_code,
      cityName,
      type,
    } = req.body;
    idUser = parseInt(idUser);
    idCity = parseInt(idCity);
    idProvince = parseInt(idProvince);
    postal_code = parseInt(postal_code);
    if (isPrimary) {
      await query(
        `UPDATE address SET isprimary = false WHERE isprimary = true`
      );
    }
    const addressQuery = await query(
      `INSERT INTO address VALUES(null,${db.escape(idUser)},${db.escape(
        idCity
      )},${db.escape(idProvince)},${db.escape(street)},${db.escape(
        isPrimary
      )},${db.escape(district)},${db.escape(postal_code)},${db.escape(
        cityName
      )},${db.escape(type)})`
    );
    res.status(200).send({ message: "Address Created" });
  },
  primaryUserAddres: async (req, res) => {
    const idUser = parseInt(req.params.userId);
    const primaryAddress =
      await query(`SELECT address.*, province.province, user.full_name,user.phone_number
>>>>>>> Stashed changes
    FROM address
    INNER JOIN province ON address.idprovince = province.province_id
    INNER JOIN user ON address.iduser = user.iduser
    WHERE address.iduser = ${db.escape(idUser)} AND address.isprimary = true;
    `)
    res.status(200).send(primaryAddress)
    },
    userAddres: async (req, res) => {
        const idUser = (req.params.userId)
        const offset = parseInt(req.query.offset)?parseInt(req.query.offset):0

        const allAddress = await query (`SELECT address.*, province.province, user.*
        FROM address
        INNER JOIN province ON address.idprovince = province.province_id
        INNER JOIN user ON address.iduser = user.iduser
        WHERE address.iduser = ${db.escape(idUser)}
        ORDER BY address.isprimary DESC
<<<<<<< Updated upstream
        LIMIT 3 OFFSET ${db.escape(offset)};
        `)
        const counData = await query (`SELECT COUNT(*) as count FROM address WHERE iduser = ${db.escape(idUser)}`)
        res.status(200).send({ allAddress, counData })
    },
    removeAddress: async (req, res) => {
        const idAddress = parseInt(req.params.idAddress)
        await query(`DELETE FROM address WHERE idaddress = ${db.escape(idAddress)}`)
        res.status(200).send({message:'Delete Success'})
    },
    setPrimary: async (req, res) => {
        const idAddress = parseInt(req.params.idAddress)
        await query (`UPDATE address SET isprimary = false WHERE isprimary = true`)
        await query(`UPDATE address SET isprimary = true WHERE idaddress = ${db.escape(idAddress)}`)
        res.status(200).send({message:'New Primary Address Has Been Set'})
=======
        LIMIT 2 OFFSET ${db.escape(offset)};
        `);
    const counData = await query(
      `SELECT COUNT(*) as count FROM address WHERE iduser = ${db.escape(
        idUser
      )}`
    );
    res.status(200).send({ allAddress, counData });
  },
  removeAddress: async (req, res) => {
    const idAddress = parseInt(req.params.idAddress);
    await query(
      `DELETE FROM address WHERE idaddress = ${db.escape(idAddress)}`
    );
    res.status(200).send({ message: "Delete Success" });
  },
  setPrimary: async (req, res) => {
    const idAddress = parseInt(req.params.idAddress);
    await query(`UPDATE address SET isprimary = false WHERE isprimary = true`);
    await query(
      `UPDATE address SET isprimary = true WHERE idaddress = ${db.escape(
        idAddress
      )}`
    );
    res.status(200).send({ message: "New Primary Address Has Been Set" });
  },
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
>>>>>>> Stashed changes

    },
    
}