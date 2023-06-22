const { db, query } = require("../database");

module.exports = {
    setStatus: async (req, res) => {
        console.log('im Status');
        const idTransaction = parseInt(req.params.idTransaction)
        const {status}= req.body
        await query(`UPDATE transaction SET status = ${db.escape(status)} WHERE idtransaction = ${db.escape(idTransaction)}`)
        res.status(200).send({message:'Delivery Confirmed'})
    },
    fetchTransactionInfo: async (req, res) => {
        console.log('im transaction');
        const idUser = parseInt(req.params.idUser)
        const transactionQUery = await query(`SELECT * FROM transaction WHERE iduser =${db.escape(idUser)}`)
        res.status(200).send(transactionQUery)
    }
}