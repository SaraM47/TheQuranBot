require('dotenv').config();

const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { getPlayer, stopPlayer } = require('./utils/playerManager'); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] Command at ${filePath} missing "data" or "execute".`);
    }
}

client.once('clientReady', () => {
    console.log(`Bot is ready! Logged in som ${client.user.tag}`);
    console.log(`Qur'an Audio Bot is online!`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred!', ephemeral: true });
            }
        }
    }

    if (interaction.isButton()) {
        const guildId = interaction.guildId;
        const data = getPlayer(guildId);

        if (!data) {
            return interaction.reply({ content: 'No playback to control.', ephemeral: true });
        }

        const { player, connection } = data;

        if (interaction.customId === 'pause') {
            player.pause();
            await interaction.reply({ content: 'Paused the sound.', ephemeral: true });
        }

        if (interaction.customId === 'resume') {
            player.unpause();
            await interaction.reply({ content: 'The sound continues.', ephemeral: true });
        }

        if (interaction.customId === 'stop') {
            stopPlayer(guildId);
            await interaction.reply({ content: 'Stopped the sound and disconnected.', ephemeral: true });
        }
    }
});

async function deployCommands() {
    const commands = [];
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if ('data' in command) commands.push(command.data.toJSON());
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    try {
        console.log(`Uppdated ${commands.length} kommandon...`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log(`Registered ${data.length} kommandon.`);
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

(async () => {
    await deployCommands();
    await client.login(process.env.DISCORD_TOKEN);
})();
