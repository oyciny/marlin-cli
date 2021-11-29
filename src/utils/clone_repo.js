const { exec, execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const gitConfigsUri = 'https://github.com/MarlinFirmware/Configurations.git'
const gitFirmwareUri = 'https://github.com/MarlinFirmware/Marlin.git'

const clone = () => {
    console.log('Hang tight! We are collecting the latest versions of the firmware before moving on.')
    try {
        if (fs.existsSync(path.join(__dirname, '../../temp'))) {
            console.log('Cleaning up old versions')
            exec('rm -rf ./temp', { cwd: path.resolve(__dirname, '../')})
        }
        console.log('Collecting base configurations')
        execSync(`git clone ${gitConfigsUri} temp/configs`, { cwd: path.resolve(__dirname, '../../')})
        console.log('Collecting firmware, we can continue after this completes')
        execSync(`git clone ${gitFirmwareUri} temp/firmware`, { cwd: path.resolve(__dirname, '../../')})
    } catch (err) {
        console.log("Oops! We ran into an issue")
    }
}

module.exports = clone