#! /usr/bin/env node
const { program } = require('commander')
const pkg = require('../package.json')
const utils = require('./utils')
const path = require('path')
const updateNotifier = require('update-notifier')

const marlin_uri = 'https://codeload.github.com/MarlinFirmware/Marlin/zip/bugfix-2.0.x'
global.root_dir = path.join(__dirname, '../')

program.version(pkg.version)

updateNotifier({pkg}).fetchInfo()

program
    .command('update')
    .description('Updates the Marlin Configs and Firmware')
    .action(() => {
        console.clear()
        utils.collect.marlin(marlin_uri)
            .catch(e => {
                console.log(e)
            })
    })

program
    .command('platformio')
    .action(() => {
        console.clear()
        utils.collect.platformio()
            .then(() => {

            })
            .catch(e => {
                console.log(e)
            })
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