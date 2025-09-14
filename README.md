# Qur'an Discord Audio Bot 🎵

A modern Discord bot that plays complete Qur'an surahs with multiple reciters.  
Built with **Node.js**, **Discord.js v14**, and **@discordjs/voice**.

## ✨ Features

- 🎙️ **Multiple Reciters** – Choose from 5 well-known Qur'an reciters  
- 📖 **Complete Surahs** – Play entire surahs by number or name  
- 🔍 **Smart Search** – Match surah by number, English or Arabic name  
- 🎛️ **Interactive Controls** – Control playback with buttons (▶️ Play, ⏸️ Pause, ⏹️ Stop)  
- 📱 **Slash Commands** – Clean and modern interface with `/play`, `/stop`, `/info`  
- 🖼️ **Custom Cover Image** – Local image displayed in embeds  
- 🛡️ **Error Handling** – Clear user feedback if something goes wrong  

---

## 📖 Available Reciters

1. **Mishary Rashid Al Afasy** *(Default)*  
2. **Abu Bakr Al Shatri**  
3. **Nasser Al Qatami**  
4. **Yasser Al Dosari**  
5. **Hani Ar Rifai**  

---

## 🚀 Installation

### Prerequisites

- **Node.js** v16.11.0 or higher (recommended v18+)  
- A **Discord Bot Token** and **Application ID**  
- **Git** installed (for version control)  

⚠️ Unlike older bots, **FFmpeg is not required** – this bot streams audio directly using HTTPS.

---

### Step 1: Clone Repository

```bash
git clone https://github.com/<your-username>/quran-discord-bot.git
cd quran-discord-bot
````

---

### Step 2: Install Dependencies

```bash
npm install
```

---

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```env
DISCORD_TOKEN=your-bot-token-here
CLIENT_ID=your-application-id-here
```

---

### Step 4: Run the Bot

```bash
node index.js
```

If successful, you’ll see:

```
✅ Bot is ready! Logged in as Quran Bot#1234
🎵 Qur'an Audio Bot is online!
```

---

## 🎮 Commands

* `/play surah:<number or name> reciter:<optional>`
  → Plays a surah in your current voice channel.
  Example:

  ```
  /play surah:1 reciter:Mishary Rashid Al Afasy
  ```

* `/stop`
  → Stops playback and disconnects the bot.

* `/info`
  → Shows a usage guide and available reciters.

### Playback Controls (UI)

When you use `/play`, the bot will send an embed with buttons:

* ▶️ **Play / Resume**
* ⏸️ **Pause**
* ⏹️ **Stop**

---

## 🌍 Hosting & Deployment

### Railway (Recommended)

1. Push your bot to GitHub.
2. Go to [Railway](https://railway.app/), log in with GitHub.
3. Create a new project → “Deploy from GitHub Repo”.
4. Add environment variables (`DISCORD_TOKEN`, `CLIENT_ID`) in project settings.
5. Railway will automatically install dependencies and run your bot 24/7.

### Render

Similar process to Railway, also free tier available.

### VPS (Advanced)

1. SSH into your server.
2. Clone your repo.
3. Run with `pm2`:

   ```bash
   npm install -g pm2
   pm2 start index.js --name quran-bot
   pm2 save
   pm2 startup
   ```

---

## 📌 To Make Your Bot Public

* In [Discord Developer Portal](https://discord.com/developers/applications):

  * Enable **Public Bot**
  * Generate an invite URL under **OAuth2 → URL Generator** with:

    * Scopes: `bot`, `applications.commands`
    * Permissions: `Connect`, `Speak`, `Send Messages`, `Embed Links`, `Use Slash Commands`

Share this invite link so others can add your bot to their servers.

---

## 🏆 Optional: List on top.gg

1. Keep your bot **online 24/7**.
2. Create an account at [top.gg](https://top.gg).
3. Add your bot and fill in description, images, and commands.
4. Once approved, your bot will be searchable by anyone.

---

## 👨‍💻 Developer

* Built with [discord.js](https://discord.js.org/) + [@discordjs/voice](https://github.com/discordjs/voice)
* Open source and extendable
* Designed for simple, reliable Qur’an playback in Discord

