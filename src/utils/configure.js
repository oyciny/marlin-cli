const inquirer = require('inquirer')
const devices = require('../devices')

const conf = {}
const questions = [
    { type: 'list', name: 'device', choices: ['Ender-3 Pro'], message: 'Which device will this firmware be running on?' },
    { type: 'confirm', name: 'custom_name', message: 'Would you like to give your device a custom name? '},
    { type: 'number', name: 'buildplate_x', message: 'Bed Size on X axis: ' },
    { type: 'number', name: 'buildplate_y', message: 'Bed Size on Y axis: ' },
    { type: 'list', name: 'z_homing_device', choices: ['BL-Touch', 'CR-Touch', 'None'], message: 'Z Axis homing device (Choose None if you do not have one)' }
]

const configure = () => {
    inquirer.prompt(questions).then(a => {
        conf.device_type = a.device
        conf.custom_name = a.custom_name
        conf.buildplate = [a.buildplate_x, a.buildplate_y]
        conf.z_homing_device = a.z_homing_device
    }).then(() => {
        
        // If Custom Name ask user for the name they wish to use

        if (conf.custom_name) {
            custom_naming(() => {
                if (conf.z_homing_device !== 'None') {
                    probing_setup(() => {
                        device_setup()
                    })
                } else {
                    device_setup()
                }
            })
        } else {
            if (conf.z_homing_device !== 'None') {
                probing_setup(() => {
                    device_setup()
                })
            } else {
                device_setup()
            }
        }
    })
}

const custom_naming = (callback) => {
    inquirer.prompt([
        { type: 'input', name: 'custom_name', message: 'Device Custom Name: ' }
    ]).then(a => {
        conf.custom_name = a.custom_name
    }).then(callback)
}

const probing_setup = (callback) => {
    inquirer.prompt([
        { type: 'number', name: 'probe_offset_x', message: 'Probe X axis offset: ' },
        { type: 'number', name: 'probe_offset_y', message: 'Probe Y axis offset: ' }
    ]).then(a => {
        conf.probe_offset = [a.probe_offset_x, a.probe_offset_y]
    }).then(callback)
}

const device_setup = async () => {
    let target_device
    if (conf.device_type === 'Ender-3 Pro') {
        target_device = new devices.Ender_3_Pro(conf)
    }
    target_device.set_board(() => {
        target_device.write_files(() => {
            // Continue after files have been written

        })
    })
}

module.exports = configure