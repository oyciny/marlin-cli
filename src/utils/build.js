const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

const bundle_path = './bundle'
const home_dir = os.homedir()

const build = () => {
    console.clear()
    exec(`python3 ${bundle_path}/platformio.py check core --dump-state ./pio/pioinstaller-state.json`, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            return
        }
        let pio_exe = require('../../pio/pioinstaller-state.json').platformio_exe
        console.log('Building firmware...')
        exec(`${pio_exe} run`, { cwd: path.join(__dirname, '../../tmp') }, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
            }
            const files = fs.readdirSync(path.join(__dirname, '../../tmp/.pio/build'))
            
            for (const file of files) {
                if (file !== '.DS_Store' && file !== 'project.checksum') {
                    fs.rename(`${path.join(__dirname, `../../tmp/.pio/build/${file}/firmware.bin`)}`, `${home_dir}/Desktop/firmware.bin`, (err) => {
                        if (err) {
                            throw err
                        }
                        console.clear()
                        console.log('Firmware has been built. You can now copy the firmware.bin file to your microSD card.')
                    })
                }
            }
        })
    })
}

module.exports = build