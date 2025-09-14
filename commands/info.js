const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('View information about Quran Bot'),

        async execute(interaction) {
            const embed = new EmbedBuilder()
                .setTitle('ℹ️ Quran Bot Guide')
                .setColor('#3498db')
                .setDescription('This bot plays Qur\'an recitations in your voice channel with different reciters. Here is how you can use it:')
                .addFields(
                    { 
                        name: 'Start Playing and choosing a reciter', 
                        value: 'Use /play-commando and type in the surah number in surah-field. \nExample: `/play surah:1 reciter:Mishary Rashid Al Afasy`.\nIf you don’t choose, Mishary Rashid Al Afasy is the default.', 
                        inline: false 
                    },
                    { 
                        name: 'Stop', 
                        value: 'Press the **Stop** button or use `/stop` to stop playback and disconnect the bot from the voice channel.', 
                        inline: false 
                    },
                    { 
                        name: 'Available Reciters', 
                        value: 'Mishary Rashid Al Afasy, Abu Bakr Al Shatri, Nasser Al Qatami, Yasser Al Dosari, Hani Ar Rifai', 
                        inline: false 
                    }
                );
        await interaction.reply({ embeds: [embed] });
    },
};
