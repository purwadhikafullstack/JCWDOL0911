const { db, query }  = require('../database')
const jwt = require('jsonwebtoken')

module.exports = {
    addQuestion: async (req, res) => {
        const iduser = parseInt(req.params.id)
        const { question,title } = req.body
        const date = new Date()
        const dateTime =
        date.getFullYear() + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
        const expiredDate = date.getHours() === 23
        ? date.getFullYear() + "/" +
          ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
          ("00" + (date.getDate() + 1)).slice(-2) + " " +
          "00" + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2)
        : date.getFullYear() + "/" +
          ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
          ("00" + date.getDate()).slice(-2) + " " +
          ("00" + (date.getHours() + 1)).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
        
        const addQuestion = await query(`INSERT INTO question VALUE(null,${db.escape(iduser)},${db.escape(question)},${db.escape(dateTime)},${db.escape(title)},false,${db.escape(expiredDate)})`)

        res.status(200).send({message:"question created"})
        

    },
    deleteQuestion: async (req, res) => {
        console.log("delete");
        const questionId = parseInt(req.params.id)
        await query(`DELETE FROM question WHERE idquestion= ${db.escape(questionId)}`)
        res.status(200).send({message:"Delete succes"})
    },
    fetchUserQuestion: async (req, res) => {
        const userId = parseInt(req.params.id)
        const offset = parseInt(req.query.offset)?parseInt(req.query.offset):0
        const search = req.query.search
        const sort = req.query.sort
        const questionQuery = await query(`SELECT * FROM question WHERE iduser = ${db.escape(userId)}
        ${search ? `AND (question.title LIKE ${db.escape(`%${search}%`)} OR question.question LIKE ${db.escape(`%${search}%`)})` : ''}
        ORDER BY idquestion ${sort} LIMIT 4 OFFSET ${db.escape(offset)}`)
        const countData = await query(`SELECT COUNT(*) as count FROM question WHERE iduser = ${db.escape(userId)}
        ${search ? `AND (question.title LIKE ${db.escape(`%${search}%`)} OR question.question LIKE ${db.escape(`%${search}%`)})` : ''}`)
        res.status(200).send({ questionQuery, countData })
    },
    fetchAllQuestion: async (req, res) => {
        const offset = parseInt(req.query.offset || 10) //ada opsi kalau ternyata datanya kosong
        const search = req.query.search
        let sort = req.query.sort || 'DESC'
        const questionQuery = await query(`SELECT question.*,user.username,user.profile_image FROM question INNER JOIN user ON question.iduser = user.iduser WHERE question.is_answer=true   
        ${search ? `AND (question.title LIKE ${db.escape(`%${search}%`)} OR question.question LIKE ${db.escape(`%${search}%`)})` : ''}
        ORDER BY idquestion ${sort} LIMIT 6 OFFSET ${db.escape(offset)};`)
        const countData = await query(`SELECT COUNT(*) as count FROM question WHERE is_answer = true`)
        res.status(200).send({ questionQuery, countData })
    }
}