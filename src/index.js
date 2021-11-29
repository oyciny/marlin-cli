const { program, Option, Argument } = require('commander')
const inquirer = require('inquirer')
const version = require('../package.json').version
const utils = require('./utils')

program.version(version)

program
    .command('configure')
    .action(() => {
        inquirer.prompt([
            { type: 'confirm', message: 'Would you like to update to the latest version of the marlin firmware?\n', name: 'conf'}
        ]).then(a => {
            if (a.conf) {
                utils.clone()
            } else {
                utils.configure()
            }
        })
    })

program.parse()