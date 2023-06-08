const { db, query } = require("../database/index")

module.exports = {
    getAllProducts: (req, res) => {
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

}