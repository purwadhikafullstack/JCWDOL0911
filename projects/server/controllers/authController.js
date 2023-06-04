const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, phone_number } = req.body;

      const getUsersQuery = `SELECT * FROM user WHERE email=${db.escape(
        email
      )};`;
      const getUsers = await query(getUsersQuery);

      if (getUsers.length > 0 && getUsers[0].email === email) {
        return res.status(400).send({ message: "Email has been used" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const addUserQuery = `INSERT INTO user VALUES(null, ${db.escape(
        username
      )}, null, null, null, ${db.escape(email)} ,${phone_number}, ${db.escape(
        hashPassword
      )}, 0, null, null);`;
      const addUser = await query(addUserQuery);

      const payload = { id: addUser.insertId };
      const token = jwt.sign(payload, process.env.JWT_KEY);

      const insertTokenQuery = `UPDATE user SET token=${db.escape(
        token
      )} WHERE iduser=${db.escape(addUser.insertId)}`;
      const insertToken = await query(insertTokenQuery);

      let mail = {
        from: `Admin <${process.env.NODEMAILER_USER}>`,
        to: `${email}`,
        subject: `Please verified your account!`,
        html: `
        <div>
        <p>Thanks for register, you need to activate your account,</p>
        <a href="${process.env.LINK_VERIFICATION}${token}">Click here</a>
        <span>to activate</span>
        </div>`,
      };

      let response = await nodemailer.sendMail(mail);

      return res.status(200).send({
        data: addUser,
        message: "Success register! Please verify your email",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  },
};
