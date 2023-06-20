const { query, db } = require("../database");

module.exports = {
  getLatestProduct: async (req, res) => {
    try {
      console.log('im called');
      const getLatestProductQuery = `SELECT * FROM product ORDER BY idproduct DESC LIMIT 10;`;
      const latestProduct = await query(getLatestProductQuery);

      return res.status(200).send(latestProduct);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
  getAllProductsByFilter: (req, res) => {
    let filterQuery = `SELECT * FROM product`
    const { order, productName, category, sortBy, page } = req.query

    const limit = 2
    const pageNumber = !isNaN(Number(page)) ? Number(page) : 1
    const offset = limit * pageNumber - limit

    if (productName) {
      filterQuery = `SELECT * FROM product WHERE name LIKE ${db.escape(productName + '%')}`
    }

    if (category) {
      filterQuery = `SELECT * FROM product INNER JOIN category on product.idcategory = category.idcategory WHERE category.name = ${db.escape(category)}`
    }

    const ordering = order && order.toLowerCase() === 'desc' ? 'desc' : 'asc'

    if (sortBy === 'name' || sortBy === 'price') {
      filterQuery = `${filterQuery} ORDER BY product.${sortBy} ${ordering}`
    }

    let totalPage = 0;
    db.query(filterQuery, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      totalPage = Math.ceil(results.length / limit)
    })

    filterQuery = `${filterQuery} LIMIT ${offset}, ${limit}`

    db.query(filterQuery, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ products: results, totalPage })
    })
  },
  adminProduct: async (req, res) => {
    const productQuery =await query (`SELECT product.*,category.name as category_name
    FROM product
    INNER JOIN category ON product.idcategory=category.idcategory
    `)
    res.status(200).send(productQuery)
  },
  updateStock : async (req, res) => {
    const idProduct = parseInt(req.params.idProduct) 
    let {stock,updatedStock}= req.body
    console.log(updatedStock);
    const type = 'Update Stock'
    const status = updatedStock > 0 ? 'penambahan' : 'pengurangan'
    updatedStock = Math.abs(updatedStock)
    const date = new Date()
    const dateTime = date.getFullYear() + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2);
    stock= parseInt(stock)

    await query(`UPDATE product SET stock = ${db.escape(stock)} WHERE idproduct =${db.escape(idProduct)}`)
    await query (`INSERT INTO restock VALUES(null,${db.escape(idProduct)},${db.escape(dateTime)},${db.escape(updatedStock)},'Update Stock',${db.escape(status)})`)
    res.status(200).send({message:'Update stock succes'})
  }
}
