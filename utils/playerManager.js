const players = new Map();

function setPlayer(guildId, player, connection) {
    players.set(guildId, { player, connection });
}

function getPlayer(guildId) {
    return players.get(guildId);
}

function stopPlayer(guildId) {
    const data = players.get(guildId);
    if (!data) return "none"; 

    try {
        if (data.player) {
            data.player.stop(true);
        }

        if (data.connection && data.connection.state.status !== 'destroyed') {
            data.connection.destroy();
        }

        players.delete(guildId);
        return "stopped";
    } catch (err) {
        console.error("Error stopping player:", err);
        return "error";
    }
}

module.exports = { setPlayer, getPlayer, stopPlayer };
