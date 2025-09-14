# Qur'an Discord Audio Bot 🎵

A Discord bot that plays complete Qur'an surahs with multiple reciters available. Built with Node.js, Discord.js, and the @discordjs/voice library.

## Features

- 🎙️ **Multiple Reciters**: Choose from 6 renowned Qur'an reciters
- 📖 **Complete Surahs**: Plays entire surahs from start to finish
- 🔍 **Flexible Search**: Find surahs by name or number
- 🎛️ **Voice Controls**: React with ⏹️ to stop playback
- 📱 **Slash Commands**: Modern Discord slash command interface
- 🛡️ **Error Handling**: Comprehensive error handling and user feedback

## Available Reciters

1. **Mishary Rashid Alafasy** (Default)
2. **Abdul Basit Abdul Samad** (Murattal)
3. **Mahmoud Khalil Al-Husary**
4. **Saad Al Ghamdi**
5. **Maher Al Muaiqly**
6. **Ahmed Ibn Ali Al-Ajamy**

## Installation

### Prerequisites

- **Node.js** v16.11.0 or higher
- **FFmpeg** (for audio processing)
- **A Discord Bot Token** and **Application ID**

### Step 1: Install FFmpeg

**Windows:**
1. Download FFmpeg from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract and add to your system PATH

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ffmpeg
```

### Step 2: Set Up Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the bot token
5. Go to "General Information" and copy the Application ID
6. Go to "OAuth2 > URL Generator":
   - Select "bot" and "applications.commands" scopes
   - Select "Connect", "Speak", and "Use Voice Activity" permissions
   - Copy the generated URL and invite the bot to your server

### Step 3: Install and Configure

1. **Initialize the project:**
```bash
mkdir quran-discord-bot
cd quran-discord-bot
npm init -y
```

2. **Install dependencies:**
```bash
npm install