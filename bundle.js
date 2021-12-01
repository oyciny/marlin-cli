#! /usr/bin/env node

const { execSync } = require('child_process')
const os = require('os')
const path = require('path')
const fs = require('fs')

const root_dir = path.join(__dirname, './')

bundle_uri = 'https://github.com/oyciny/marlin-cli-bundle.git'
platformio_uri = 'https://raw.githubusercontent.com/platformio/platformio/master/scripts/get-platformio.py'

console.clear()
if (fs.existsSync('./bundle')) {
    fs.rmdir('./bundle', { recursive: true }, (err) => {
        if (err) {
            console.log(err)
            return
        }
        execSync(`git clone ${bundle_uri} bundle`, { cwd: root_dir, stdio: 'inherit' })
        execSync('python3 -c "$(curl -fsSL https://raw.githubusercontent.com/platformio/platformio/master/scripts/get-platformio.py)"', { cwd: root_dir, stdio: 'inherit'})
    })
} else {
    execSync(`git clone ${bundle_uri} bundle`, { cwd: root_dir, stdio: 'inherit' })
    execSync('python3 -c "$(curl -fsSL https://raw.githubusercontent.com/platformio/platformio/master/scripts/get-platformio.py)"', { cwd: root_dir, stdio: 'inherit'})
}