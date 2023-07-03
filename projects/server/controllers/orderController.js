const { db, query } = require("../database");
const { format } = require("date-fns");

module.exports = {
  uploadOrder: async (req, res) => {
    console.log('im order');
    try {
      const iduser = parseInt(req.params.iduser);
      const {
        orderProduct,
        orderAddress,
        orderPrice,
        courierData,
        serviceData,
      } = req.body;
      console.log(req.body);

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
      console.log(setTransactionOrderQuery);

      const setTransactionOrder = await query(setTransactionOrderQuery);
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
      const ascDescend = req.query.sort || "desc";
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

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchWaitingOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where transaction.iduser = ${iduser} and payment_image is null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.waiting_date ${ascDescend} limit ${db.escape(
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
        // console.log(order);
        const fetchWaitingProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction} order by transaction.waiting_date asc limit 10 offset 0;`;
        console.log(fetchWaitingProductQuery);
        const fetchWaitingProduct = await query(fetchWaitingProductQuery);
        return { ...order, orderProduct: fetchWaitingProduct };
      });
      const waitingOrder = await Promise.all(oldTemp);
      console.log(waitingOrder);

      return res
        .status(200)
        .send({ success: true, waitingOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getAllWaitingOrder: async (req, res) => {
    try {
      const order = req.query.order || "desc";
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "desc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where payment_image is null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchAllWaitingOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where payment_image is null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.waiting_date ${order} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;

      const fetchAllWaitingOrder = await query(fetchAllWaitingOrderQuery);

      // if fetchWaitingOrder length is 0, we return the result
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

  getFinishedOrder: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "desc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where iduser=${db.escape(
        iduser
      )} and status = "COMPLETE" and transaction.finished_date is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchFinishedOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where transaction.iduser = ${iduser} and status = "COMPLETE" and transaction.finished_date is not null and transaction.idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.onprocess_date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchFinishedOrder = await query(fetchFinishedOrderQuery);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchFinishedOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchFinishedOrder.map(async (order, index) => {
        const fetchFinishedProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchFinishedProduct = await query(fetchFinishedProductQuery);
        return { ...order, orderProduct: fetchFinishedProduct };
      });
      const finishedOrder = await Promise.all(oldTemp);
      return res
        .status(200)
        .send({ success: true, finishedOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getAllFinishedOrder: async (req, res) => {
    try {
      const idadmin = req.params.idadmin;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "desc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where status = "COMPLETE" and transaction.finished_date is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchFinishedOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where status = "COMPLETE" and transaction.finished_date is not null and transaction.idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.onprocess_date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchFinishedOrder = await query(fetchFinishedOrderQuery);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchFinishedOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchFinishedOrder.map(async (order, index) => {
        const fetchFinishedProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchFinishedProduct = await query(fetchFinishedProductQuery);
        return { ...order, orderProduct: fetchFinishedProduct };
      });
      const finishedOrder = await Promise.all(oldTemp);
      return res
        .status(200)
        .send({ success: true, finishedOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getSendOrder: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "desc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where iduser=${db.escape(
        iduser
      )} and status = "ON THE WAY" and transaction.send_date is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchSendOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where transaction.iduser = ${iduser} and status = "ON THE WAY" and transaction.send_date is not null and transaction.idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.onprocess_date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchSendOrder = await query(fetchSendOrderQuery);
      console.log(fetchSendOrder);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchSendOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchSendOrder.map(async (order, index) => {
        const fetchSendProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchSendProduct = await query(fetchSendProductQuery);
        return { ...order, orderProduct: fetchSendProduct };
      });
      const sendOrder = await Promise.all(oldTemp);
      return res
        .status(200)
        .send({ success: true, sendOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getAllSendOrder: async (req, res) => {
    try {
      const idadmin = req.params.idadmin;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "desc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where status = "ON THE WAY" and transaction.send_date is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchSendOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where status = "ON THE WAY" and transaction.send_date is not null and transaction.idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.onprocess_date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchSendOrder = await query(fetchSendOrderQuery);
      console.log(fetchSendOrder);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchSendOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchSendOrder.map(async (order, index) => {
        const fetchSendProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchSendProduct = await query(fetchSendProductQuery);
        return { ...order, orderProduct: fetchSendProduct };
      });
      const sendOrder = await Promise.all(oldTemp);
      return res
        .status(200)
        .send({ success: true, sendOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getOnProcessOrder: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "asc";
      const offset = limit * page;
      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where iduser=${db.escape(
        iduser
      )} and status = "ON PROCESS" and transaction.onprocess_date is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;

      console.log(totalRowsQuery);
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchOnProcessOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where transaction.iduser = ${iduser} and status = "ON PROCESS" and transaction.onprocess_date is not null and transaction.idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.onprocess_date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchOnProcessOrder = await query(fetchOnProcessOrderQuery);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchOnProcessOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchOnProcessOrder.map(async (order, index) => {
        const fetchOnProcessProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchOnProcessProduct = await query(fetchOnProcessProductQuery);
        return { ...order, orderProduct: fetchOnProcessProduct };
      });
      const onProcessOrder = await Promise.all(oldTemp);
      return res
        .status(200)
        .send({ success: true, onProcessOrder, totalOfRows, totalPages, page });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getAllOnProcessOrder: async (req, res) => {
    try {
      const idadmin = req.params.idadmin;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "asc";
      const offset = limit * page;

      console.log(idadmin);
      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where status = "ON PROCESS" and transaction.onprocess_date is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchOnProcessOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where status = "ON PROCESS" and transaction.onprocess_date is not null and transaction.idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.onprocess_date ${ascDescend} limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      const fetchOnProcessOrder = await query(fetchOnProcessOrderQuery);

      //if fetchWaitingOrder length is 0, we return the result
      if (fetchOnProcessOrder.length === 0) {
        return res.status(200).send({
          success: false,
          message: "You don't have any waiting order!",
        });
      }

      const oldTemp = fetchOnProcessOrder.map(async (order, index) => {
        const fetchOnProcessProductQuery = `select transaction.idtransaction, transaction.iduser, transaction.idpromo, transaction.waiting_date, transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date, transaction.status, transaction.total, product_transaction.quantity, product.name, product.price, product.description, product.product_image, product.unit from transaction inner join product_transaction on transaction.idtransaction = product_transaction.idtransaction inner join product on product_transaction.idproduct = product.idproduct where transaction.idtransaction = ${order.idtransaction};`;
        const fetchOnProcessProduct = await query(fetchOnProcessProductQuery);
        return { ...order, orderProduct: fetchOnProcessProduct };
      });
      const onProcessOrder = await Promise.all(oldTemp);
      return res
        .status(200)
        .send({ success: true, onProcessOrder, totalOfRows, totalPages, page });
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
      const ascDescend = req.query.sort || "desc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where iduser=${db.escape(
        iduser
      )} and (status = "UNDER REVIEW" or status = "PAYMENT CONFIRMED") and transaction.review_date is not null and transaction.payment_image is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;

      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchReviewOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where transaction.iduser = ${iduser} and (status = "UNDER REVIEW" or status = "PAYMENT CONFIRMED") and transaction.review_date is not null and transaction.payment_image is not null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.review_date ${ascDescend} limit ${db.escape(
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

  getAllReviewOrder: async (req, res) => {
    try {
      const idadmin = req.params.idadmin;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 3);
      const search = req.query.search || "";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idtransaction) as totalOfRows from transaction where status = "UNDER REVIEW" and transaction.review_date is not null and transaction.payment_image is not null and idtransaction like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;
      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      //first thing we do is simply fetch the transaction where iduser matching and payment_image = null, limit by 3 offset 0
      const fetchReviewOrderQuery = `select  transaction.idtransaction, transaction.idprescription, transaction.idadmin, transaction.iduser, transaction.idpromo, transaction.idaddress, transaction.waiting_date,
      transaction.review_date, transaction.onprocess_date, transaction.send_date, transaction.finished_date, transaction.cancel_date,
      transaction.status, transaction.total, transaction.payment_image,transaction.courier, transaction.service, transaction.description, transaction.freightCost, address.street, province.province, address.city_name, address.address_type, user.username, user.full_name, user.phone_number, user.email, address.postal_code
      from transaction inner join address on transaction.idaddress = address.idaddress inner join user on transaction.iduser = user.iduser inner join province on address.idprovince = province.province_id where status = "UNDER REVIEW" and transaction.review_date is not null and transaction.payment_image is not null and idtransaction like ${
        search ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      } order by transaction.review_date desc limit ${db.escape(
        limit
      )} offset ${db.escape(offset)};`;
      // console.log(fetchReviewOrderQuery);
      const fetchReviewOrder = await query(fetchReviewOrderQuery);
      //if fetchReviewOrder length is 0, we return the result
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

  getAllPrescriptionOrder: async (req, res) => {
    try {
      const idadmin = req.params.idadmin;
      const page = parseInt(req.query.page || 0);
      const limit = parseInt(req.query.limit || 10);
      const search = req.query.search || "";
      const ascDescend = req.query.sort || "asc";
      const offset = limit * page;

      //querying total rows of data transaction from sql
      const totalRowsQuery = `select count(idprescription) as totalOfRows from prescription where status = "ON QUEUE" and prescription.date is not null and prescription.prescription_image is not null and idprescription like ${
        search || "" ? `${db.escape(`%${search}%`)}` : `${db.escape("%%")}`
      };`;

      const totalRows = await query(totalRowsQuery);
      const { totalOfRows } = totalRows[0];
      const totalPages = Math.ceil(totalOfRows / limit);

      const fetchTransactionOrderQuery = `select prescription.idprescription, prescription.idadmin, prescription.iduser, user.username, user.full_name, prescription.prescription_image,
      prescription.status, prescription.date from prescription inner join user on prescription.iduser = user.iduser where status = "ON QUEUE" and prescription.date is not null and prescription.prescription_image is not null and idprescription like ${
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

  acceptPayment: async (req, res) => {
    try {
      const idAdmin = req.params.idadmin;
      const { idtransaction } = req.body;
      const acceptIdTransactionQuery = `update transaction set status = "PAYMENT CONFIRMED", idadmin=${db.escape(
        idAdmin
      )} where idtransaction = ${idtransaction}`;
      const acceptIdTransaction = await query(acceptIdTransactionQuery);

      if (acceptIdTransaction.affectedRows !== 0) {
        return res
          .status(200)
          .send({ success: true, message: "We are processing your order" });
      } else {
        return res.status(200).send({
          success: false,
          message: "Fail to update your order, we don't know why",
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  confirmPayment: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const { idtransaction } = req.body;
      const acceptIdTransactionQuery = `update transaction set status = "ON PROCESS", onprocess_date = ${db.escape(
        format(new Date(), "yyyy-MM-dd HH:mm:ss")
      )} where idtransaction = ${idtransaction}`;
      const acceptIdTransaction = await query(acceptIdTransactionQuery);

      if (acceptIdTransaction.affectedRows !== 0) {
        return res
          .status(200)
          .send({ success: true, message: "We are processing your order" });
      } else {
        return res.status(200).send({
          success: false,
          message: "Fail to update your order, we don't know why",
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  rejectPayment: async (req, res) => {
    try {
      const idAdmin = req.params.idadmin;
      const { idtransaction } = req.body;
      const acceptIdTransactionQuery = `update transaction set status = "WAITING FOR PAYMENT", cancel_date=${db.escape(
        format(new Date(), "yyyy-MM-dd HH:mm:ss")
      )}, idadmin=${db.escape(
        idAdmin
      )}, payment_image=null where idtransaction = ${idtransaction}`;
      // console.log(acceptIdTransactionQuery);
      const acceptIdTransaction = await query(acceptIdTransactionQuery);

      if (acceptIdTransaction.affectedRows !== 0) {
        return res
          .status(200)
          .send({ success: true, message: "We are processing your order" });
      } else {
        return res.status(200).send({
          success: false,
          message: "Fail to update your order, we don't know why",
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  submitPayment: async (req, res) => {
    try {
      const idAdmin = req.params.idadmin;
      const { idtransaction } = req.body;
      const submitIdTransactionQuery = `update transaction set status = "ON THE WAY", send_date=${db.escape(
        format(new Date(), "yyyy-MM-dd HH:mm:ss")
      )}, idadmin=${db.escape(idAdmin)} where idtransaction = ${idtransaction}`;
      // console.log(acceptIdTransactionQuery);
      const submitIdTransaction = await query(submitIdTransactionQuery);

      if (submitIdTransaction.affectedRows !== 0) {
        return res
          .status(200)
          .send({ success: true, message: "Your order is on the way" });
      } else {
        return res.status(200).send({
          success: false,
          message: "Fail to update your order, we don't know why",
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  completePayment: async (req, res) => {
    try {
      const iduser = req.params.iduser;
      const { idtransaction } = req.body;
      const completeIdTransactionQuery = `update transaction set status = "COMPLETE", finished_date=${db.escape(
        format(new Date(), "yyyy-MM-dd HH:mm:ss")
      )} where idtransaction = ${idtransaction}`;
      // console.log(acceptIdTransactionQuery);
      const completeIdTransaction = await query(completeIdTransactionQuery);

      if (completeIdTransaction.affectedRows !== 0) {
        return res
          .status(200)
          .send({ success: true, message: "Thank you for purchasing" });
      } else {
        return res.status(200).send({
          success: false,
          message: "Fail to update your order, we don't know why",
        });
      }
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
