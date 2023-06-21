const { db, query } = require("../database");

module.exports = {
    confirmDelivery : async (req, res) => {
        const idTransaction = parseInt(req.params.idTransaction)
        const {status}= req.body
        await query(`UPDATE transaction SET status = ${db.escape(status)} WHERE idtransaction = ${db.escape(idTransaction)}`)
        res.status(200).send({message:'Delivery Confirmed'})
    }
}