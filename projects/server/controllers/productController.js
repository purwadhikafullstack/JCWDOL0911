const { query, db } = require("../database");
const deleteFile = require('../helpers/deleteFile')

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

    const limit = 8
    const pageNumber = !isNaN(Number(page)) ? Number(page) : 1
    const offset = limit * pageNumber - limit

    if (productName) {
      filterQuery = `SELECT product.* FROM product WHERE name LIKE ${db.escape(productName + '%')}`
    }

    if (category) {
      filterQuery = `SELECT product.*, category.name as 'category.name',category.idcategory as 'category.idcategory' FROM product INNER JOIN category on product.idcategory = category.idcategory WHERE category.name = ${db.escape(category)}`
    }

    const ordering = order && order.toLowerCase() === "desc" ? "desc" : "asc";

    if (sortBy === "name" || sortBy === "price" || sortBy === "idproduct") {
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
    const productQuery = await query(`SELECT * FROM product`);
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

  getProductById: async (req, res) => {
    try {
      const { idProduct } = req.params;

      const getProductByIdQuery = `
      SELECT
        product.*,
        category.idcategory as 'category.idcategory',
        category.name as 'category.name'
      from
        product as product
      LEFT outer join
        category on category.idcategory = product.idcategory
      where
        product.idproduct = ${idProduct};`;

      const product = await query(getProductByIdQuery);

      if (!product[0]) {
        return res.status(404).send({ message: 'Product not found' });
      }

      const category = {}

      Object.keys(product[0]).forEach(key => {
        if (key.match(/\bcategory.\b/)) {
          category[key.split('category.')[1]] = product[0][key]
          delete product[0][key]
        }
      })

      product[0].category = category

      return res.status(200).send({ product: product[0] });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  // Admin
  createProduct: async (req, res) => {
    // const { filename } = req.file;
    const filename = req.file?.filename;

    try {
      const { idunit, idcategory, idpromo, name, price, description, stock } = req.body;

      const createProductQuery = `INSERT INTO product (idunit, idcategory, idpromo, name, price, description, stock, product_image) VALUES (${db.escape(idunit)},${db.escape(idcategory)},${db.escape(idpromo)},${db.escape(name)},${db.escape(price)},${db.escape(description)},${db.escape(stock)}, ${db.escape(filename)});`;

      await query(createProductQuery);
      return res.status(200).send({ message: "create success" });
    } catch (error) {
      deleteFile(filename)
      return res.status(500).send({ message: error });
    }
  },
  updateProduct: async (req, res) => {
    const filename = req.file?.filename;

    try {
      const { name, price, description, stock } = req.body;
      const { idProduct } = req.params;

      let updateQuery = 'UPDATE product SET '

      if (name) {
        updateQuery += `name = ${db.escape(name)},`
      }
      if (price) {
        updateQuery += `price = ${db.escape(price)},`
      }
      if (description) {
        updateQuery += `description = ${db.escape(description)},`
      }
      if (stock) {
        updateQuery += `stock = ${db.escape(stock)},`
      }
      if (filename) {
        updateQuery += `product_image = ${db.escape(filename)},`
      }

      updateQuery = updateQuery.slice(0, updateQuery.length - 1) + ` WHERE idproduct = ${idProduct};`

      await query(updateQuery);

      return res.status(200).send({ message: "Edit Success" });

    } catch (error) {
      if (filename) {
        deleteFile(filename)
      }
      return res.status(500).send({ message: error });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { idProduct } = req.params;
      const deleteQuery = `DELETE FROM product WHERE idproduct = ${idProduct};`;

      await query(deleteQuery);

      return res.status(200).send({ message: "Delete Success" });
    } catch (error) {
      return res.status(200).send({ message: error });
    }
  }

};
