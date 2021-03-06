module.exports = function notifyCap(dispatch) {
    const chat = new (require('./lib/chatCommands.js'))(dispatch)
    const msg = new (require('./lib/message.js'))(dispatch, 'notify', '#ffffff')
    const inv = new (require('./lib/inventory.js'))(dispatch, notifyInventory)
    const ploc = new (require('./lib/playerLocation.js'))(dispatch)

    var vgCooldown = false
    var vgTimer = null
    var markCooldown = false
    var markTimer = null

    function notifyInventory() {
        if (!markCooldown) {
            var marks = inv.getAmount(151643)
            if (marks > 70) {
                markCooldown = true
                msg.notify('WARNING: Elleon Marks almost capped (' + marks + '/100)', 44)
                markTimer = setTimeout(function () { markCooldown = false }, 20000)
            }
        }
    }

    dispatch.hook('S_AVAILABLE_EVENT_MATCHING_LIST', 2, event => {
        if (!vgCooldown && (event.callMethod == -1 || event.callMethod == 1) && event.vgCredits > 7000) {
            vgCooldown = true
            msg.notify('WARNING: VG credits almost capped (' + event.vgCredits + '/9000)', 44)
            vgTimer = setTimeout(function () { vgCooldown = false }, 20000)
        }
    });
}
