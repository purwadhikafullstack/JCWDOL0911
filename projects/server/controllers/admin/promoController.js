const { db, query } = require("../../database/index");


module.exports = {
    createDiscount: async (req, res) => {
        try {
            const { title, description, percentage, minimumTransaction, type } = req.body
            await query(`INSERT INTO promo VALUES (null,${db.escape(title)},${db.escape(description)},${db.escape(minimumTransaction)},${db.escape(percentage)},${db.escape(type)},false)`) 
            res.status(200).send({message:"Discount Created"})
        } catch (error) {
            
        }
    },
    allDiscounts: async (req, res) => {
        try {
            const { order, filter, search, offset } = req.query;
            const queryStr = `
              SELECT * FROM promo
              ${filter ? `WHERE isDisable = ${Boolean(filter)}` : ''}
              ${search ? `WHERE name LIKE '%${search}%'` : ''} 
              ${order ? `ORDER BY name ${order}` : ''}
              LIMIT 5
              ${offset ? `OFFSET ${offset}` : ''}
            `;
            const allDiscounts = await query(queryStr);
            const countData = await query(`SELECT COUNT(*) as count FROM promo  ${filter ? `WHERE isDisable = ${Boolean(filter)}` : ''}
            ${search ? `WHERE name LIKE '%${search}%'` : ''} `)
            res.status(200).send({allDiscounts,countData});
        } catch (error) {
            // Handle error
        }
    },          
    fetchDiscount: async (req, res) => {
        try {
            const idpromo = parseInt(req.params.idpromo)
            const discount = await query(`SELECT * FROM promo WHERE idpromo = ${db.escape(idpromo)}`)
            res.status(200).send(discount)
        } catch (error) {
            
        }
    },
    disableDiscount: async (req, res) => {
        
        try {
            const idpromo = parseInt(req.params.idpromo)
            await query(`UPDATE promo SET isDisable = true WHERE idpromo =${db.escape(idpromo)}`)
            res.status(200).send({message:'Update Succes'})
        } catch (error) {
            
        }
    },
    enableDiscount: async (req, res) => {
        
        try {
            const idpromo = parseInt(req.params.idpromo)
            await query(`UPDATE promo SET isDisable = false WHERE idpromo =${db.escape(idpromo)}`)
            res.status(200).send({message:'Update Succes'})
        } catch (error) {
            
        }
    },
    updateDiscount: async (req, res) => {
        const idpromo = parseInt(req.params.idpromo)
        const {name,description,condition,discount}= req.body
        await query(`
        UPDATE promo 
        SET name = ${db.escape(name)}, 
            description = ${db.escape(description)},
            \`condition\` = ${db.escape(condition)},
            discount = ${db.escape(discount)}
        WHERE idpromo = ${db.escape(idpromo)}
      `);        
        res.status(200).send({message:'Edit Succes'})
      
    },
    assignPromoProducts: async (req, res) => {
        const idpromo = parseInt(req.params.idpromo)
        
        const { idproduct } = req.body
        console.log(idproduct);
        if (idproduct.checked) {
            await query(`UPDATE product SET idpromo = ${db.escape(idpromo)} WHERE idproduct = ${db.escape(idproduct.idproduct)}`)   
        } else {
            await query(`UPDATE product SET idpromo = null WHERE idproduct = ${db.escape(idproduct.idproduct)}`)     
        }
        res.status(200).send({message:'Promo is assigned succesfully'})
    },
    fetchTransactionDiscount: async (req, res) => {
        const transactionDiscount = await query(`SELECT * FROM promo WHERE type = 'Transaction Discount'`)
        res.status(200).send(transactionDiscount)
        
    },
    bonusItemData: async (req, res) => {
        const bonusItemQuery = await query (`SELECT bp.*, p.idpromo,pr.description, pr.name,transaction.waiting_date
        FROM bonus_products bp
        JOIN transaction ON bp.idtransaction = transaction.idtransaction
        JOIN product p ON bp.idproduct = p.idproduct
        JOIN promo pr ON p.idpromo = pr.idpromo;`)
        const countSamePromo = await query(`SELECT COUNT(*) AS total_count, p.idpromo,pr.name,pr.description,pr.type
        FROM bonus_products bp
        JOIN transaction ON bp.idtransaction = transaction.idtransaction
        JOIN product p ON bp.idproduct = p.idproduct
        JOIN promo pr ON p.idpromo = pr.idpromo
        GROUP BY p.idpromo;`)
        res.status(200).send({ bonusItemQuery, countSamePromo })
    },
    transactionDiscountData: async (req, res) => {
        const trasactionDiscount = await query (`SELECT *
        FROM transaction
        LEFT JOIN promo ON transaction.idpromo = promo.idpromo
        WHERE transaction.idpromo IS NOT NULL;`)
        const countSameDiscount = await query(`SELECT  COUNT(*) AS total_count,transaction.idpromo,promo.name,promo.description,promo.type
        FROM transaction
        LEFT JOIN promo ON transaction.idpromo = promo.idpromo
        WHERE transaction.idpromo IS NOT NULL
        GROUP BY transaction.idpromo;`)
        res.status(200).send({trasactionDiscount,countSameDiscount})

    },
    productDiscountData: async (req, res) => {
        const productDiscount = await query (`SELECT pt.*,p.name as product_name,t.waiting_date,pr.type,pr.name as promo_name,pr.description
        FROM product_transaction pt
        JOIN transaction t ON pt.idtransaction = t.idtransaction
        JOIN product p ON pt.idproduct = p.idproduct
        LEFT JOIN promo pr ON p.idpromo = pr.idpromo
        WHERE pr.type = 'Product Discount'
        ORDER BY p.name;`)
        const countSameDiscount = await query (`SELECT SUM(pt.quantity) AS total_count, p.idpromo,pr.name,pr.description,pr.type
        FROM product_transaction pt
        JOIN product p ON pt.idproduct = p.idproduct
        JOIN promo pr ON p.idpromo = pr.idpromo
        WHERE pr.type = 'Product Discount'
        GROUP BY p.idpromo;`)
        res.status(200).send({productDiscount,countSameDiscount})
    }
} 