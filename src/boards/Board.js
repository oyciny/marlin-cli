const fs = require('fs-extra')
const path = require('path')

const root_dir = path.join(__dirname, '../../')

class Board {

    constructor (conf) {
        this.type = conf.type
        this.bundle = conf.bundle

        // Device Name
        this.DEVICE_NAME = conf.options.name

        // Buildplate Size
        this.BUILDPLATE_X_AXIS = conf.options.buildplate[0]
        this.BUILDPLATE_Y_AXIS = conf.options.buildplate[1]

        // Z Probe
        if (conf.options.z_homing.device !== 'None') {
            this.Z_PROBE_TYPE = conf.options.z_homing.device
            this.Z_PROBE_X_OFFSET = conf.options.z_homing.offset[0]
            this.Z_PROBE_Y_OFFSET = conf.options.z_homing.offset[1]
        }
    }

    copy_bundle(_callback) {
        try {
            fs.copySync(this.bundle, `${root_dir}/tmp/Marlin`)
        } catch (err) {
            console.log(err)
            process.exit(-1)
        }
        _callback()
    }

    copy_marlin(_callback) {
        try {
            fs.copySync(`${root_dir}/bundle/Marlin`, `${root_dir}/tmp`)
        } catch (err) {
            console.log(err)
            process.exit(-1)
        }
        _callback()
    }

    package(_callback) {
        this.copy_marlin(() => {
            this.copy_bundle(() => {
                _callback()
            })
        })
    }

}

module.exports = Board