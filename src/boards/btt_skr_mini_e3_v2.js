// BigTreeTech SKR Mini E3 2.0
//
// This file manages the writing of configuration files specifically for the board listed above.
// If any changes come out that change how this specific board must be configured only this file
// will need to be edited. The rest of the program should still work.
const Board = require('./Board')

class BTT_SKR_MINI_E3_V2 extends Board {
    
    constructor(conf, bundle) {
        super(conf)
        this.bundle = bundle
    }
    
}

module.exports = BTT_SKR_MINI_E3_V2

/*
const fs = require('fs')
const path = require('path')
const Board = require('./Board')

// Set Environment
const root_dir = path.join(__dirname, '../../')

class BTT_SKR_MINI_E3_V2 extends Board {

    async modifyConfig() {
        let file = fs.readFileSync(`${root_dir}tmp/Marlin/Configuration.h`, { encoding: 'utf-8' })
        // Define Changes to be made
        let changes = [
            { from: /#define CUSTOM_MACHINE_NAME "Ender-3 Pro"/g, to: `#define CUSTOM_MACHINE_NAME "${this.DEVICE_NAME}"` },    // Custom Device Name
            { from: /#define X_BED_SIZE 235/g, to: `#define X_BED_SIZE ${this.BUILDPLATE_X_AXIS}` },                            // Buildplate X Size
            { from: /#define Y_BED_SIZE 235/g, to: `#define Y_BED_SIZE ${this.BUILDPLATE_Y_AXIS}` },                            // Buildplate Y Size
            { from: /\/\/#define PREHEAT_BEFORE_LEVELING/g, to: '#define PREHEAT_BEFORE_LEVELING' }                             // Preheat Before Leveling
        ]
        if (typeof this.Z_PROBE_TYPE !== 'undefined' && this.Z_PROBE_TYPE) {
            changes.push({ from: /\/\/#define USE_PROBE_FOR_Z_HOMING/g, to: '#define USE_PROBE_FOR_Z_HOMING' })
            changes.push({ from: /\/\/#define BLTOUCH/g, to: `#define BLTOUCH` })
            changes.push({ from: /#define NOZZLE_TO_PROBE_OFFSET { 10, 10, 0 }/g, to: `#define NOZZLE_TO_PROBE_OFFSET { ${this.Z_PROBE_X_OFFSET}, ${this.Z_PROBE_Y_OFFSET}, 0 }` })
            changes.push({ from: /\/\/#define AUTO_BED_LEVELING_BILINEAR/g, to: '#define AUTO_BED_LEVELING_BILINEAR' }),
            changes.push({ from: /#define MESH_BED_LEVELING/g, to: '//#define MESH_BED_LEVELING' })
            changes.push({ from: /\/\/#define Z_SAFE_HOMING/g, to: '#define Z_SAFE_HOMING'})
        }

        for await (const change of changes) {
            file = file.replace(change.from, change.to)
        }

        fs.writeFileSync(`${root_dir}tmp/Marlin/Configuration.h`, file, { encoding: 'utf-8' })

    }

    async modifyAdv() {
        let file = fs.readFileSync(`${root_dir}tmp/Marlin/Configuration_adv.h`, { encoding: 'utf-8' })       // Read File
        let changes = [
            { from: /\/\/#define SOUND_MENU_ITEM/g, to: '#define SOUND_MENU_ITEM' },            // Add Mute Selection to Menu
            { from: /\/\/#define SHOW_REMAINING_TIME/g, to: '#define SHOW_REMAINING_TIME' },    // Show Estimated Time Remaining on Print
            { from: /\/\/#define STATUS_HEAT_PERCENT/g, to: '#define STATUS_HEAT_PERCENT' },    // Status Bar Shown when Heating
        ]
        if (typeof this.Z_PROBE_TYPE !== 'undefined' && this.Z_PROBE_TYPE) {
            changes.push({ from: /\/\/#define PROBE_OFFSET_WIZARD/g, to: '#define PROBE_OFFSET_WIZARD' })                               // Offset Wizard
            changes.push({ from: /\/\/#define PROBE_OFFSET_WIZARD_START_Z -4.0/g, to: '#define PROBE_OFFSET_WIZARD_START_Z -4.0' })     // Offset Wizard Start Offset
        }

        for await (const change of changes) {
            file = file.replace(change.from, change.to)
        }

        fs.writeFileSync(`${root_dir}tmp/Marlin/Configuration_adv.h`, file, { encoding: 'utf-8' })      // Write File

    }

    async modifyPlatformIO() {
        let file = fs.readFileSync(`${root_dir}tmp/platformio.ini`, { encoding: 'utf-8' })      // Read File

        let changes = [
            { from: /default_envs = mega2560/g, to: 'default_envs = STM32F103RC_btt_maple' }
        ]

        for await (const change of changes) {
            file = file.replace(change.from, change.to)
        }

        fs.writeFileSync(`${root_dir}tmp/platformio.ini`, file, { encoding: 'utf-8' })

    }

    configure() {
        // Package Files Required for board
        return new Promise((resolve, reject) => {
            this.package()
                .then(() => {
                    this.modifyConfig()
                })
                .then(() => {
                    this.modifyAdv()
                })
                .then(() => {
                    this.modifyPlatformIO()
                })
                .then(resolve)
                .catch(reject)
        })
    }

}

module.exports = BTT_SKR_MINI_E3_V2
*/