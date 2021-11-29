const fs = require('fs')
const path = require('path')
const tempPath = path.join(__dirname, '../../../../../../temp')
const replace = require('replace-in-file')

const configure = async (config) => {
    if (config.device === 'Ender 3 Pro') {
        const config_adv = fs.readFileSync(`${tempPath}/configs/config/examples/Creality/Ender-3 Pro/BigTreeTech SKR Mini E3 2.0/Configuration_adv.h`, 'utf-8')
        const bootscreen = fs.readFileSync(`${tempPath}/configs/config/examples/Creality/Ender-3 Pro/BigTreeTech SKR Mini E3 2.0/_Bootscreen.h`, 'utf-8')
        const statusscreen = fs.readFileSync(`${tempPath}/configs/config/examples/Creality/Ender-3 Pro/BigTreeTech SKR Mini E3 2.0/_Statusscreen.h`, 'utf-8')

        /**
         * 
         *  Modify Configuration.h with user defined values
         * 
         */
        const configFilePath = `${tempPath}/configs/config/examples/Creality/Ender-3 Pro/BigTreeTech SKR Mini E3 2.0/Configuration.h`
        try {
            await replace({
                files: configFilePath,
                from: /\/\/#define USE_PROBE_FOR_Z_HOMING/g,
                to: '#define USE_PROBE_FOR_Z_HOMING'
            })
            await replace({
                files: configFilePath,
                from: /\/\/#define BLTOUCH/g,
                to: '#define BLTOUCH'
            })
            await replace({
                files: configFilePath,
                from: /#define NOZZLE_TO_PROBE_OFFSET { 10, 10, 0 }/g,
                to: `#define NOZZLE_TO_PROBE_OFFSET { ${config.nozzle_to_probe_offset[0]}, ${config.nozzle_to_probe_offset[1]}, 0 }`
            })
            await replace({
                files: configFilePath,
                from: /#define X_BED_SIZE 235/g,
                to: `#define X_BED_SIZE ${config.buildplate[0]}`
            })
            await replace({
                files: configFilePath,
                from: /#define Y_BED_SIZE 235/g,
                to: `#define Y_BED_SIZE ${config.buildplate[1]}`
            })
            await replace({
                files: configFilePath,
                from: /\/\/#define AUTO_BED_LEVELING_BILINEAR/g,
                to: '#define AUTO_BED_LEVELING_BILINEAR'
            })
            await replace({
                files: configFilePath,
                from: /#define MESH_BED_LEVELING/g,
                to: '//#define MESH_BED_LEVELING'
            })
            await replace({
                files: configFilePath,
                from: /\/\/#define PREHEAT_BEFORE_LEVELING/g,
                to: '#define PREHEAT_BEFORE_LEVELING'
            })
        } catch (err) {
            console.log(err)
        }

        // Read Updated File
        const configFile = fs.readFileSync(configFilePath, { encoding: 'utf-8' })

        /**
         * 
         *  Save Files to Marlin Firmware for Building Process
         * 
         */
        fs.writeFileSync(`${tempPath}/firmware/Marlin/Configuration.h`, configFile)
        fs.writeFileSync(`${tempPath}/firmware/Marlin/Configuration_adv.h`, config_adv)
        fs.writeFileSync(`${tempPath}/firmware/Marlin/_Bootscreen.h`, bootscreen)
        fs.writeFileSync(`${tempPath}/firmware/Marlin/_Statusscreen.h`, statusscreen)
    }
}

module.exports = configure

