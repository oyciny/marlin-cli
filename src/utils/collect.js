const https = require('https')
const fs = require('fs')
const unzipper = require('unzipper')
const os = require('os')
const cliProgress = require('cli-progress')

class Collect {

    marlin = (url) => {
        return new Promise(
            (resolve, reject) => {
                https
                    .get(url)
                    .on('response', res => {
                        const writeable = fs.createWriteStream(`${os.tmpdir()}Marlin.zip`)
    
                        const len = parseInt(res.headers['content-length'], 10)
                        let progress = 0;
                        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    
                        bar.start(len, progress)
    
                        res.on('data', chunk => {
                            writeable.write(chunk)
                            progress += chunk.length
                            
                            bar.update(progress)
                        })
    
                        res.on('end', () => {
                            bar.stop()
                            const readable = fs.createReadStream(`${os.tmpdir()}Marlin.zip`)
                            readable.pipe(unzipper.Extract({ path: `${os.tmpdir()}` }))
                            resolve()
                        })
                    })
                    .on('error', err => {
                        reject(err)
                    })
            }
        )
    }

    platformio = () => {
        return new Promise(
            (resolve, reject) => {
                https
                    .get('https://raw.githubusercontent.com/platformio/platformio/master/scripts/get-platformio.py')
                    .on('response', res => {
                        const writeable = fs.createWriteStream(`${os.tmpdir()}platformio-install.py`)
                        const len = parseInt(res.headers['content-length'], 10)
                        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
                        
                        let progress = 0;

                        bar.start(len, progress)

                        res.on('data', chunk => {
                            writeable.write(chunk)
                            progress += chunk.length
                            bar.update(progress)
                        })

                        res.on('end', () => {
                            bar.stop()
                            resolve()
                        })
                    })
                    .on('error', err => {
                        reject(err)
                    })
            }
        )
    }

}

module.exports = Collect