const { db, query } = require("../database");
const { format } = require("date-fns");

module.exports = {
  uploadOrder: async (req, res) => {
    try {
      const iduser = parseInt(req.params.iduser);
      const {
        orderProduct,
        orderAddress,
        orderPrice,
        courierData,
        serviceData,
      } = req.body;

      const setTransactionOrderQuery = `insert into transaction values (null, null, null, ${db.escape(
        iduser
      )}, null, ${db.escape(orderAddress.idaddress)} ,${db.escape(
        format(new Date(), "yyyy-MM-dd HH:mm:ss")
      )},null, null, null, null, null, "WAITING FOR PAYMENT", ${db.escape(
        orderPrice
      )}, null, ${db.escape(courierData)}, ${db.escape(
        serviceData.service
      )}, ${db.escape(serviceData.description)}, ${db.escape(
        serviceData.cost[0].value
      )} );`;

      const setTransactionOrder = await query(setTransactionOrderQuery);
      console.log(setTransactionOrder);
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
  getWaitingOrder: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where iduser=${db.escape(
        iduser
      )} and payment_image is null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);
      console.log(totalPages);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchWaitingOrderQuery = `select * from transaction where iduser = ${iduser} and payment_image is null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.waiting_date desc limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchWaitingOrder = await query(fetchWaitingOrderQuery);
      // console.log(fetchWaitingOrder);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchWaitingOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchWaitingOrder.map(async (order, index) => {
        const fetchWaitingProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction} order by transaction.waiting_date asc limit 10 offset 0;`;
        const fetchWaitingProduct = await query(fetchWaitingProductQuery);

        return { ...order, orderProduct: fetchWaitingProduct };
      });
      const waitingOrder = await Promise.all(oldTemp);

      return res
        .status(200)
        .send({ success: true, waitingOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getAllWaitingOrder: async (req, res) => {
    try {
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where payment_image is null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchAllWaitingOrderQuery = `select transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, transaction.payment_image, user.username, user.full_name,user.phone_number, user.email from transaction 
      inner join user on transaction.iduser = user.iduser where payment_image is null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.waiting_date desc limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;

      console.log(fetchAllWaitingOrderQuery);

      const fetchAllWaitingOrder = await query(fetchAllWaitingOrderQuery);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchAllWaitingOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchAllWaitingOrder.map(async (order, index) => {
        const fetchAllWaitingProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction} order by transaction.waiting_date asc;`;
        const fetchAllWaitingProduct = await query(fetchAllWaitingProductQuery);

        return { ...order, orderProduct: fetchAllWaitingProduct };
      });
      const allWaitingOrder = await Promise.all(oldTemp);

      return res.status(200).send({
        success: true,
        allWaitingOrder,
        totalOfRows,
        totalPages,
        page,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getReviewOrder: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where iduser=${db.escape(
        iduser
      )} and status = "UNDER REVIEW" and transaction.review_date is not null and transaction.payment_image is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);
      console.log(totalPages);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchReviewOrderQuery = `select * from transaction where iduser = ${iduser} and status = "UNDER REVIEW" and transaction.review_date is not null and transaction.payment_image is not null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.review_date desc limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchReviewOrder = await query(fetchReviewOrderQuery);
      // console.log(fetchWaitingOrder);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchReviewOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchReviewOrder.map(async (order, index) => {
        const fetchWaitingProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchWaitingProduct = await query(fetchWaitingProductQuery);

        return { ...order, orderProduct: fetchWaitingProduct };
      });
      const reviewOrder = await Promise.all(oldTemp);

      return res
        .status(200)
        .send({ success: true, reviewOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getPrescriptionOrder: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 10);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "asc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idprescription) as totalOfRows from prescription where iduser=${db.escape(
        iduser
      )} and status = "ON QUEUE" and prescription.date is not null and prescription.prescription_image is not null and idprescription like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;

      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      const fetchTransactionOrderQuery = `select * from prescription where iduser = ${iduser} and status = "ON QUEUE" and prescription.date is not null and prescription.prescription_image is not null and idprescription like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by prescription.date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchTransactionOrder = await query(fetchTransactionOrderQuery);

      // if fetchWaitingOrder length is 0, we return the result
      if (fetchTransactionOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      return res.status(200).send({
        success: true,
        fetchTransactionOrder,
        totalOfRows,
        totalPages,
        page,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // getWaitingProduct: async (req, res) => {
  //   const idtransaction = req.params.idtransaction;
  //   const fetchWaitingProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.date, transaction.time, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, category.name from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct inner join category on product.idcategory = product.idcategory where transaction.idtransaction = ${29} order by date asc limit 3 offset 0;`;

  //   const fetchWaitingProduct = await query(fetchWaitingProductQuery);

  //   console.log(fetchWaitingProduct);
  //   res.status(200).send({ product: fetchWaitingProduct });
  // },
};
