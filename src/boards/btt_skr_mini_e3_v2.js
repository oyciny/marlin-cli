// BigTreeTech SKR Mini E3 2.0
//
// This file manages the writing of configuration files specifically for the board listed above.
// If any changes come out that change how this specific board must be configured only this file
// will need to be edited. The rest of the program should still work.

const fs = require('fs')
const path = require('path')
const replace = require('../utils/replace')
const Board = require('./Board')

// Set Environment
const root_dir = path.join(__dirname, '../../')
const bundle_dir = path.join(__dirname, `${root_dir}/bundle`)

class BTT_SKR_MINI_E3_V2 extends Board {

    configure() {
        // Package Files Required for board
        this.package(() => {
            // Available Configurable Parameters
            //
            // DEVICE_NAME
            //
            // BUILDPLATE_X_AXIS
            // BUILDPLATE_Y_AXIS
            //
            // Z_PROBE_TYPE
            // Z_PROBE_X_OFFSET
            // Z_PROBE_Y_OFFSET

            // Paths to Files
            const CONFIG_FILE = `${root_dir}tmp/Marlin/Configuration.h`
            const CONFIG_ADV_FILE = `${root_dir}tmp/Marlin/Configuration_adv.h`
            const PLATFORMIO = `${root_dir}tmp/platformio.ini`

            // Define Changes to be made
            const LINE_CHANGES = []
            
            // Machine Name
            LINE_CHANGES.push({ from: /#define CUSTOM_MACHINE_NAME "Ender-3 Pro"/g, to: `#define CUSTOM_MACHINE_NAME "${this.DEVICE_NAME}"`})
            // Bed size
            LINE_CHANGES.push({ from: /#define X_BED_SIZE 235/g, to: `#define X_BED_SIZE ${this.BUILDPLATE_X_AXIS}` })
            LINE_CHANGES.push({ from: /#define Y_BED_SIZE 235/g, to: `#define Y_BED_SIZE ${this.BUILDPLATE_Y_AXIS}` })
            // Z Axis Probe
            if (typeof this.Z_PROBE_TYPE !== 'undefined' && this.Z_PROBE_TYPE) {
                LINE_CHANGES.push({ from: /\/\/#define USE_PROBE_FOR_Z_HOMING/g, to: '#define USE_PROBE_FOR_Z_HOMING' })
                LINE_CHANGES.push({ from: /\/\/#define BLTOUCH/g, to: `#define BLTOUCH` })
                LINE_CHANGES.push({ from: /#define NOZZLE_TO_PROBE_OFFSET { 10, 10, 0 }/g, to: `#define NOZZLE_TO_PROBE_OFFSET { ${this.Z_PROBE_X_OFFSET}, ${this.Z_PROBE_Y_OFFSET}, 0 }` })
                LINE_CHANGES.push({ from: /#define Z_MIN_PROBE_ENDSTOP_INVERTING false/g, to: '#define Z_MIN_PROBE_ENDSTOP_INVERTING true' })
            }
            // Bed Leveling
            LINE_CHANGES.push({ from: /\/\/#define AUTO_BED_LEVELING_BILINEAR/g, to: '#define AUTO_BED_LEVELING_BILINEAR' })
            LINE_CHANGES.push({ from: /\/\/#define MESH_BED_LEVELING/g, to: '//#define MESH_BED_LEVELING' })
            // Prehead Before Leveling
            LINE_CHANGES.push({ from: /\/\/#define PREHEAT_BEFORE_LEVELING/g, to: '#define PREHEAT_BEFORE_LEVELING' })

            LINE_CHANGES.map(LINE_CHANGE => {
                replace({
                    files: CONFIG_FILE,
                    from: LINE_CHANGE.from,
                    to: LINE_CHANGE.to
                })
            })

            //
            // Advanced Configuration
            //

            // Enable Offset Wizard
            replace({
                files: CONFIG_ADV_FILE,
                from: /\/\/#define PROBE_OFFSET_WIZARD/g,
                to: '#define PROBE_OFFSET_WIZARD'
            })
            replace({
                files: CONFIG_ADV_FILE,
                from: /\/\/#define PROBE_OFFSET_WIZARD_START_Z -4.0/g,
                to: '#define PROBE_OFFSET_WIZARD_START_Z -4.0'
            }, () => {
                console.log('Z Offset Wizard Enabled')
            })

            // Enable Mute Option
            replace({
                files: CONFIG_ADV_FILE,
                from: /\/\/#define SOUND_MENU_ITEM/g,
                to: '#define SOUND_MENU_ITEM'
            }, () => {
                console.log('Sound Mute Option Enabled')
            })

            // Enable Print Time Remaining Option
            replace({
                files: CONFIG_ADV_FILE,
                from: /\/\/#define SHOW_REMAINING_TIME/g,
                to: '#define SHOW_REMAINING_TIME'
            }, () => {
                console.log('Show Remaining Print Time Enabled')
            })

            // Enable Heating Status Bar
            replace({
                files: CONFIG_ADV_FILE,
                from: /\/\/#define STATUS_HEAT_PERCENT/g,
                to: '#define STATUS_HEAT_PERCENT'
            })

            //
            // PlatformIO Config
            //
            replace({
                files: PLATFORMIO,
                from: /default_envs = mega2560/g,
                to: 'default_envs = STM32F103RC_btt_maple'
            }, () => {
                console.log('PlatformIO has been configured. you may now proceed to build the firmware.')
            })
        })
    }

}

module.exports = BTT_SKR_MINI_E3_V2