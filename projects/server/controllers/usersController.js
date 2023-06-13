const { db, query } = require("../database");

module.exports = {
    fetchUser: async (req, res) => {
        const user_id= parseInt(req.params.id)
        const userQuery = await query(`SELECT * FROM user WHERE iduser=${db.escape(user_id)}`)
        const user = {
            username : userQuery[0].username,
            email : userQuery[0].email,
            phone_number : userQuery[0].phone_number,
            fullname : userQuery[0].full_name,
            gender : userQuery[0].gender,
            profile_image: userQuery[0].profile_image,
            birthdate : userQuery[0].birthdate
        }
        res.status(200).send(user)
    },
    uploadPicture: async (req, res) => {
        const user_id = parseInt(req.params.id)
        const filename = '/' + req.file.filename
        await query (`UPDATE user SET profile_image = ${db.escape(filename)} WHERE iduser =${db.escape(user_id)}`)
        res.status(200).send({message:"Upload Succes"})
    },
    editProfiles: async (req, res) => {
        const user_id = parseInt(req.params.id)
        const { username, fullname, gender, birthdate, email } = req.body
        console.log(username);
        const date = new Date(birthdate)
        const dateTime =
        date.getFullYear() + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2)
        
        if (username) {
        await query (`UPDATE user SET username = ${db.escape(username)} WHERE iduser =${db.escape(user_id)}`)

        }
        if (fullname) {
        await query (`UPDATE user SET full_name = ${db.escape(fullname)} WHERE iduser =${db.escape(user_id)}`)
   
        }
        if (gender) {
        await query (`UPDATE user SET gender = ${db.escape(gender)} WHERE iduser =${db.escape(user_id)}`)
        }
        if (birthdate) {
        await query (`UPDATE user SET birthdate = ${db.escape(dateTime)} WHERE iduser =${db.escape(user_id)}`)
        }
        if (email) {
        await query (`UPDATE user SET email = ${db.escape(email)} WHERE iduser =${db.escape(user_id)}`)
  
        }
        res.status(200).send({message:'Update succes'})
        
  fetchUser: async (req, res) => {
    const user_id = parseInt(req.params.id);
    const userQuery = await query(
      `SELECT * FROM user WHERE iduser=${db.escape(user_id)}`
    );
    if (userQuery.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "User Not Found" });
    }

    const userAddressQuery = `select address.address, address.isprimary from address inner join user on address.iduser = user.iduser where user.iduser=${db.escape(
      user_id
    )} order by address.isprimary desc`;

    const userAddress = await query(userAddressQuery);

    const user = {
      username: userQuery[0].username,
      email: userQuery[0].email,
      phone_number: userQuery[0].phone_number,
      fullname: userQuery[0].full_name,
      gender: userQuery[0].gender,
      profile_image: userQuery[0].profile_image,
      address: userAddress,
    };
    res.status(200).send(user);
  },
  uploadPicture: async (req, res) => {
    const user_id = parseInt(req.params.id);
    const filename = "/" + req.file.filename;
    await query(
      `UPDATE user SET profile_image = ${db.escape(
        filename
      )} WHERE iduser =${db.escape(user_id)}`
    );
    res.status(200).send({ message: "Upload Succes" });
  },
  editProfiles: async (req, res) => {
    const user_id = parseInt(req.params.id);
    const { username, fullname, gender, birthdate, email } = req.body;
    console.log(username);
    const date = new Date(birthdate);
    const dateTime =
      date.getFullYear() +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2);

    if (username) {
      await query(
        `UPDATE user SET username = ${db.escape(
          username
        )} WHERE iduser =${db.escape(user_id)}`
      );
    }
    if (fullname) {
      await query(
        `UPDATE user SET full_name = ${db.escape(
          fullname
        )} WHERE iduser =${db.escape(user_id)}`
      );
    }
    if (gender) {
      await query(
        `UPDATE user SET gender = ${db.escape(
          gender
        )} WHERE iduser =${db.escape(user_id)}`
      );
    }
    if (birthdate) {
      await query(
        `UPDATE user SET birthdate = ${db.escape(
          dateTime
        )} WHERE iduser =${db.escape(user_id)}`
      );
    }
    if (email) {
      await query(
        `UPDATE user SET email = ${db.escape(email)} WHERE iduser =${db.escape(
          user_id
        )}`
      );
    }
    res.status(200).send({ message: "Update succes" });
  },
};
