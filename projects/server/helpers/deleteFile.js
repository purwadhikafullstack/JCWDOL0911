const fs = require('fs')

module.exports = (filename) => {
    fs.unlinkSync(process.cwd() + '/uploads/' + filename)
}