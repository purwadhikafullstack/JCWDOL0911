const { query, db } = require("../database");

module.exports = {
    createCategory: async (req, res) => {
        try {
            const { category} = req.body
            categoryQuery = `INSERT INTO category (name) VALUES (${db.escape(category)});`;
            const getCategoryResult = await query(categoryQuery);
            return res.status(200).send({message:"New Category Created"});

        } catch (error) {
            return res.status(500).send({ message: error });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const { idCategory } = req.params;

            const updateQuery = `UPDATE category SET name = ${db.escape(name)} WHERE idcategory = ${idCategory};`;

            const updateResult = await query(updateQuery);
            return res.status(200).send({ message: 'Update Category Succes' });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { idCategory } = req.params
            const deleteQuery = `DELETE FROM category WHERE idcategory = ${idCategory};`
            await query(deleteQuery);

            return res.status(200).send({ message: "Delete Category Succes" });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const search = req.query.search
            const sort = req.query.sort
            const offset = parseInt(req.query.offset)
            console.log(search);
            const categories = await query(`SELECT * FROM category ${search ? `WHERE name LIKE '%${search}%' ` : ''} ORDER BY name ${sort} LIMIT 5 OFFSET ${offset}`);
            const countData = await query(`SELECT COUNT(*) as count FROM category ${search ? `WHERE name LIKE '%${search}%' ` : ''} `);
            console.log(categories);
            res.status(200).send({ categories,countData });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    }
};