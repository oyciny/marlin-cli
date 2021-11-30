#! /usr/bin/env node
const { program } = require('commander')
const version = require('../package.json').version
const utils = require('./utils')

program.version(version)

program
    .command('update')
    .description('Updates the Marlin Configs and Firmware')
    .action(() => {
        utils.clone()
    })

program
    .command('configure')
    .description('Configure your own Marlin Firmware')
    .action(() => {
        utils.configure()
    })

program
    .command('build')
    .description('Build your firmware to flash to the machine')
    .action(() => {
        utils.build()
    })

program.parse()