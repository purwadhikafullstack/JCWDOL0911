const { query, db } = require("../database");

module.exports = {
  getLatestProduct: async (req, res) => {
    try {
      const getLatestProductQuery = `SELECT * FROM product ORDER BY idproduct DESC LIMIT 10;`;
      const latestProduct = await query(getLatestProductQuery);

      return res.status(200).send(latestProduct);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
  getAllProductsByFilter: (req, res) => {
    let filterQuery = `SELECT * FROM product`;
    const { order, productName, category, sortBy, page } = req.query;

    const limit = 2;
    const pageNumber = !isNaN(Number(page)) ? Number(page) : 1;
    const offset = limit * pageNumber - limit;

    if (productName) {
      filterQuery = `SELECT * FROM product WHERE name LIKE ${db.escape(
        productName + "%"
      )}`;
    }

    if (category) {
      filterQuery = `SELECT * FROM product INNER JOIN category on product.idcategory = category.idcategory WHERE category.name = ${db.escape(
        category
      )}`;
    }

    const ordering = order && order.toLowerCase() === "desc" ? "desc" : "asc";

    if (sortBy === "name" || sortBy === "price") {
      filterQuery = `${filterQuery} ORDER BY product.${sortBy} ${ordering}`;
    }

    let totalPage = 0;
    db.query(filterQuery, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      totalPage = Math.ceil(results.length / limit);
    });

    filterQuery = `${filterQuery} LIMIT ${offset}, ${limit}`;

    db.query(filterQuery, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ products: results, totalPage });
    });
  },
  adminProduct: async (req, res) => {
    const order = req.query.order
    const filter = req.query.filter
    const queryCondition = filter === 'converted' ? 'WHERE product.idunit IS NOT NULL' : filter === 'not converted' ? 'WHERE product.idunit IS NULL' : '';
    const productQuery = await query(`SELECT *
    FROM product
    LEFT JOIN unit ON product.idunit = unit.idunit
    ${queryCondition}
    ORDER BY product.name ${order}`);
    const categoryQuery =
      await query(`SELECT products_categories.*,category.name as category_name
    FROM products_categories
    INNER JOIN category ON products_categories.idcategory = category.idcategory
    `);
    res.status(200).send({ productQuery, categoryQuery });
  },
  updateStock: async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    let { stock, updatedStock, unit } = req.body;
    const status = updatedStock > 0 ? "Penambahan" : "Pengurangan";
    updatedStock = Math.abs(updatedStock);
    const date = new Date();
    const dateTime =
      date.getFullYear() +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2);
    stock = parseInt(stock);

    await query(
      `UPDATE product SET stock = ${db.escape(
        stock
      )} WHERE idproduct =${db.escape(idProduct)}`
    );
    await query(
      `INSERT INTO restock VALUES(null,${db.escape(idProduct)},${db.escape(
        unit
      )},${db.escape(dateTime)},${db.escape(
        updatedStock
      )},'Update Stock',${db.escape(status)})`
    );
    res.status(200).send({ message: "Update stock succes" });
  },
  getAllProductOnAdminDashboard: async (req, res) => {
    try {
      const idCategory = req.query.idcategory;
      const sort = req.query.sort;
      const key = req.query.key;
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;

      let getAllProductQuery = `SELECT p.*, c.name as category_name, c.idcategory as category_id FROM product p
      LEFT JOIN products_categories pc ON p.idproduct = pc.id_product
      LEFT JOIN category c ON pc.idcategory = c.idcategory`;

      console.log("getAllProductQuery", getAllProductQuery);

      let getCountQuery = `SELECT Count(*) as count FROM (SELECT p.*, c.name as category_name, c.idcategory as category_id FROM product p
      LEFT JOIN products_categories pc ON p.idproduct = pc.id_product
      LEFT JOIN category c ON pc.idcategory = c.idcategory) y`;

      console.log("getcountquery", getCountQuery);

      if (idCategory !== undefined) {
        getCountQuery = `SELECT Count(*) as count FROM (SELECT p.*, c.name as category_name, c.idcategory as category_id FROM product p
        LEFT JOIN products_categories pc ON p.idproduct = pc.id_product
        LEFT JOIN category c ON pc.idcategory = c.idcategory WHERE c.idcategory=${idCategory}) y;`;
        getAllProductQuery += ` WHERE c.idcategory=${idCategory}`;
      }

      if (sort) {
        getAllProductQuery += ` ORDER BY ${key} ${sort}`;
      }

      console.log("getcountquerycat", getCountQuery);

      const countData = await query(getCountQuery);

      getAllProductQuery += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

      const getAllProduct = await query(getAllProductQuery);

      res
        .status(200)
        .send({ products: getAllProduct, count: countData[0].count });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  },
  getDetailProductOnAdminDashboard: async (req, res) => {
    try {
      const idParams = req.params.idproduct;

      const getDetailProductonAdminDashboardQuery = `SELECT p.*, c.name as category_name, c.idcategory as category_id FROM product p
      LEFT JOIN products_categories pc ON p.idproduct = pc.id_product
      LEFT JOIN category c ON pc.idcategory = c.idcategory WHERE p.idproduct=${idParams};`;

      const getDetailProductonAdminDashboard = await query(
        getDetailProductonAdminDashboardQuery
      );

      return res.status(200).send(getDetailProductonAdminDashboard);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  },
  UnitConversionRules: async (req, res) => {
    const { unit, quantity, unitDefault } = req.body
    const unitQuery = await query(`SELECT * FROM unit WHERE unitname = ${db.escape(unit)} AND quantity = ${db.escape(quantity)}`)
    if (unitQuery.length > 0) {
      res.status(200).send({message:"Unit Conversion Rules Has Been Set"})
    }
    else {
       await query(`INSERT INTO unit VALUES(null,${db.escape(unitDefault)},${db.escape(unit)},${db.escape(quantity)})`)
      res.status(200).send({message:"Unit Conversion Rules Has Been Set"})
    }
  },
  convertedUnit: async (req, res) => {
    const convertedQuery = await query(`SELECT product.*,unit.unitname,unit.quantity as conversion_quantity FROM product
    INNER JOIN unit ON product.idunit = unit.idunit`)
    res.status(200).send(convertedQuery)
  },
  setConversionRules: async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    const {idUnit}= req.body
    await query(`UPDATE product SET idunit = ${db.escape(idUnit)} WHERE idproduct= ${db.escape(idProduct)}`)
    res.status(200).send({message:"Rules has been set to this product"})
  },
  fetchRules: async (req, res) => {
    let rulesQuery = await query(`SELECT * FROM unit`)
    res.status(200).send(rulesQuery)
  },
  changeDefaultUnit: async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    const {unit_product,stock}= req.body
    await query(`UPDATE product SET unit_product = ${db.escape(unit_product)} , stock = ${db.escape(stock)} WHERE idproduct = ${db.escape(idProduct)}`)
    res.status(200).send({message:"Change Succes"})
  },
  removeRule: async (req, res) => {
    const idProduct = parseInt(req.params.idProduct)
    await query(`UPDATE product SET idunit = null WHERE idproduct= ${db.escape(idProduct)}`)
    res.status(200).send({message:"Rule has been Removed"})
  }
}
