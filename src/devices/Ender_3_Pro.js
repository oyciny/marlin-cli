const inquirer = require('inquirer')
const { btt_skr_mini_e3_v2 } = require('../boards')

class Ender_3_Pro {

    constructor(conf) {
        this.type = conf.device_type
        if (conf.custom_name === false) {
            this.name = this.type
        } else {
            this.name = conf.custom_name
        }
        this.buildplate = conf.buildplate
        if (conf.z_homing_device !== 'None') {
            this.z_homing = {
                device: conf.z_homing_device,
                offset: conf.probe_offset
            } 
        } else {
            this.z_homing = {
                device: conf.z_homing_device,
                offset: [0, 0]
            }
        }
    }

    set_board(callback) {
        console.clear()
        inquirer.prompt([
            { type: 'list', name: 'board', choices: [/*'BigTreeTech SKR Mini E3 1.2', */'BigTreeTech SKR Mini E3 2.0'/*, 'Creality v4.2.2', 'Creality v4.2.7'*/]}
        ]).then(a => {
            this.board = a.board
        }).then(callback)
    }

    write_files(callback) {
        if (this.board === 'BigTreeTech SKR Mini E3 2.0') {
            let board = new btt_skr_mini_e3_v2({
                type: this.type,
                buildplate: this.buildplate
            }, { test: 'test' })
            board.collect_bundle(board.bundle)
        }
        /*
        if (this.board === 'BigTreeTech SKR Mini E3 1.2') {
            // Configure for SKR Mini E3 1.2

        }
        if (this.board === 'BigTreeTech SKR Mini E3 2.0') {
            // Configure for SKR Mini E3 2.0
            let board = new btt_skr_mini_e3_v2({ type: this.type, bundle: `${root_dir}/bundle/Ender-3 Pro/BigTreeTech SKR Mini E3 2.0/`, options: { name: this.name, buildplate: this.buildplate, z_homing: this.z_homing }})
            board.configure().then(() => {
                console.clear()
                console.log('Firmware is ready to be built')
            })
        }
        if (this.board === 'Creality v4.2.2') {
            // Configure for Creality v4.2.2

        }
        if (this.board === 'Creality v4.2.7') {
            // Configure for Creality v4.2.7

        }
        */

        callback()
    }

}

module.exports = Ender_3_Pro