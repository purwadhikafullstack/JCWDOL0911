const { query, db } = require("../database");

module.exports = {
    createCategory: async (req, res) => {
        try {
            const { name } = req.body
            categoryQuery = `INSERT INTO category (name) VALUES (${db.escape(name)});`;
            const getCategoryResult = await query(categoryQuery);
            return res.status(200).send(getCategoryResult);

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
            return res.status(200).send({ message: 'success' });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { idCategory } = req.params
            const deleteQuery = `DELETE FROM category WHERE idcategory = ${idCategory};`
            await query(deleteQuery);

            return res.status(200).send({ message: "Delete Success" });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const getAllQuery = `SELECT * FROM category;`;
            const categories = await query(getAllQuery);

            res.status(200).send({ categories });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    }
};