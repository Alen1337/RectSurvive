let _activeInputs = []


function update(activeInputs) {
    _activeInputs = activeInputs
    //console.log(_activeInputs)
}

function getActiveInputs() {
    return _activeInputs
}

module.exports = {
    update,
    getActiveInputs
}