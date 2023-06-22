const { db, query } = require("../database");
const { format } = require("date-fns");

module.exports = {
  uploadOrder: async (req, res) => {
    try {
      console.log("Testing");
      const iduser = parseInt(req.params.iduser);
      const { orderProduct, orderAddress, orderPrice } = req.body;

      const setTransactionOrderQuery = `insert into transaction values (null, null, null, ${db.escape(
        iduser
      )}, null, ${db.escape(format(Date.now(), "yyyy-MM-dd"))}, ${db.escape(
        format(Date.now(), "HH:mm:ss")
      )}, "WAITING FOR PAYMENT", ${db.escape(orderPrice)}, null)`;

      // console.log(setTransactionOrderQuery);
      const setTransactionOrder = await query(setTransactionOrderQuery);
      // console.log(setTransactionOrder);
      const { insertId } = setTransactionOrder;

      orderProduct.forEach(async (product, index) => {
        let setProductTransactionQuery = `insert into product_transaction values (null, ${db.escape(
          product.idproduct
        )}, ${db.escape(insertId)}, ${db.escape(product.quantity)})`;
        await query(setProductTransactionQuery);
      });

      return res.status(200).send({
        success: true,
        message: "Your order has been recorded!",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
