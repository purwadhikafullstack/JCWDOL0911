const { db, query }  = require('../database')
const jwt = require('jsonwebtoken')

module.exports = {
    addQuestion: async (req, res) => {
        const iduser = parseInt(req.params.id)
        const { question } = req.body
        const date = new Date()
        const dateTime =
        date.getFullYear() + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
        console.log(dateTime);
        
         const expiredDate= date.getFullYear() + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + (date.getHours() + 1)).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
        console.log(expiredDate>dateTime                                                                                                                                                                                                                );
        
        const addQuestion = await query(`INSERT INTO question VALUE(null,${db.escape(iduser)},${db.escape(question)},${db.escape(dateTime)},null,false,${db.escape(expiredDate)})`)
        const payload = {id:addQuestion.insertId}
        const token = jwt.sign(payload, 'rifqi', { expiresIn: '1h' })
        await query (`UPDATE question SET delete_token = ${db.escape(token)} WHERE idquestion = ${db.escape(addQuestion.insertId)}`)

        res.status(200).send({message:"question created"})
        

    },
    deleteQuestion: async (req, res) => {
        
    }
}