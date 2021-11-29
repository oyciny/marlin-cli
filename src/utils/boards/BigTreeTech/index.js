const inquirer = require('inquirer')
const boards = require('./utils/boards')

class BigTreeTech {

    configure(config) {
        if (config.board === 'BigTreeTech SKR Mini E3 2.0') {
            boards.skr_mini_e3_v2(config)
        }
    }

}

module.exports = BigTreeTech