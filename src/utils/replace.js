const replace_in_file = require('replace-in-file')

const replace = async (options, _callback = () => {}) => {
    try {
        await replace_in_file(options)
        _callback()
    } catch (err) {
        console.log(err)
        process.exit(-1)
    }
}

module.exports = replace