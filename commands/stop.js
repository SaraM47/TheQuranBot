const { SlashCommandBuilder } = require('discord.js');
const { stopPlayer } = require('../utils/playerManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop Qur\'an and disconnect voice.'),

    async execute(interaction) {
        const result = stopPlayer(interaction.guildId);

        if (result === "stopped") {
            await interaction.reply("The sound was stopped and the bot was disconnected from the voice channel.");
        } else if (result === "none") {
            await interaction.reply({ content: 'No sound is currently playing.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'An error occurred while trying to stop the bot.', ephemeral: true });
        }
    },
};
