module.exports = {
    clone: require('./clone_repo'),
    configure: require('./configure'),
    build: require('./build'),
    collect: new (require('./collect'))
}