const inquirer = require('inquirer')
const boards = require('./boards')

const configure = () => {
    const deviceConfig = {}
    inquirer.prompt([
        { type: 'list', name: 'device', choices: ['Ender 3 Pro'], message: 'Which device will this firmware be running on?\n'},
        { type: 'confirm', name: 'bltouch', message: 'Does this device have a BL-Touch equipt?\n' },
        { type: 'number', name: 'xsize', message: 'What is the max build size on the X axis?\n' },
        { type: 'number', name: 'ysize', message: 'What is the max build size on the Y axis?\n' },
    ]).then(a => {
        deviceConfig.device = a.device
        deviceConfig.bltouch = a.bltouch
        deviceConfig.buildplate = [a.xsize, a.ysize]

        if (deviceConfig.bltouch) {
            inquirer.prompt([
                { type: 'number', name: 'x_probe_offset', message: 'What is your nozzle to probe X offset?\n' },
                { type: 'number', name: 'y_probe_offset', message: 'What is your nozzle to probe Y offset?\n' }
            ]).then(a => {
                deviceConfig.nozzle_to_probe_offset = [a.x_probe_offset, a.y_probe_offset]
                // Ender 3 Pro Configuration
                if (deviceConfig.device === 'Ender 3 Pro') {
                    inquirer.prompt([
                        { type: 'list', name: 'board', choices: ['BigTreeTech SKR Mini E3 1.2', 'BigTreeTech SKR Mini E3 2.0', 'Creality v4.2.2', 'Creality v4.2.7']}
                    ]).then(a => {
                        deviceConfig.board = a.board
                        if (deviceConfig.board === 'BigTreeTech SKR Mini E3 1.2' || deviceConfig.board === 'BigTreeTech SKR Mini E3 2.0') {
                            boards.BigTreeTech.configure(deviceConfig)
                        }
                        if (deviceConfig.board === 'Creality v4.2.2' || deviceConfig.board === 'Creality v4.2.7') {
                            boards.Creality(deviceConfig)
                        }
                    })
                }
            })
        } else {
            // Ender 3 Pro Configuration
            if (deviceConfig.device === 'Ender 3 Pro') {
                inquirer.prompt([
                    { type: 'list', name: 'board', choices: ['BigTreeTech SKR Mini E3 2.0']}
                ]).then(a => {
                    deviceConfig.board = a.board
                    if (deviceConfig.board === 'BigTreeTech SKR Mini E3 1.2' || deviceConfig.board === 'BigTreeTech SKR Mini E3 2.0') {
                        boards.BigTreeTech.configure(deviceConfig)
                    }
                    if (deviceConfig.board === 'Creality v4.2.2' || deviceConfig.board === 'Creality v4.2.7') {
                        boards.Creality(deviceConfig)
                    }
                })
            }
        }
    })
}

module.exports = configure