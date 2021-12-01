const fs = require('fs')
const os = require('os')
const { execSync } = require('child_process')
const https = require('https')
const zlib = require('zlib')

const marlin_uri = 'https://codeload.github.com/MarlinFirmware/Marlin/zip/bugfix-2.0.x'

class Board {

    constructor(conf) {
        this.type = conf.type
        if (conf.name) {
            this.name = conf.name
        }
        if (conf.z_probe) {
            this.z_probe = {
                type: conf.z_probe.type,
                offset: {
                    x: conf.z_probe.offset.x,
                    y: conf.z_probe.offset.y
                }
            }
        }
        this.buildplate = {
            x: conf.buildplate.x,
            y: conf.buildplate.y
        }
    }

    collect_bundle(bundle) {
        console.log(bundle)
    }

}

module.exports = Board

/*
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
        return new Promise((resolve, reject) => {
            fs.copy(this.bundle, `${root_dir}/tmp/Marlin`)
                .then(resolve)
                .catch(reject)
        })
    }

    copy_marlin(_callback) {
        return new Promise((resolve, reject) => {
            fs.copy(`${root_dir}/bundle/Marlin`, `${root_dir}/tmp`)
                .then(resolve)
                .catch(reject)
        })
    }

    package() {
        return new Promise((resolve, reject) => {
            this.copy_marlin()
                .then(() => {
                    this.copy_bundle()
                        .then(resolve)
                        .catch(reject)
                }).catch(reject)
        })
    }

}

module.exports = Board
*/