const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
} = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const https = require("https");
const { getSurahInfo, getAudioUrl, RECITERS } = require("../utils/quranApi");
const { setPlayer } = require("../utils/playerManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play the Qur'an in the voice channel")
    .addStringOption((option) =>
      option
        .setName("surah")
        .setDescription("Surah name or number")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reciter")
        .setDescription("Choose reciter (optional)")
        .setRequired(false)
        .addChoices(
          { name: "Mishary Rashid Al Afasy", value: "mishary_rashid_alafasy" },
          { name: "Abu Bakr Al Shatri", value: "abu_bakr_al_shatri" },
          { name: "Nasser Al Qatami", value: "nasser_al_qatami" },
          { name: "Yasser Al Dosari", value: "yasser_al_dosari" },
          { name: "Hani Ar Rifai", value: "hani_ar_rifai" }
        )
    ),

  async execute(interaction) {
    try {
      const voiceChannel = interaction.member?.voice?.channel;
      if (!voiceChannel) {
        return interaction.reply({
          content: "Enter a voice channel first!",
          ephemeral: true,
        });
      }

      await interaction.deferReply();

      const surahInput = interaction.options.getString("surah");
      const reciterKey =
        interaction.options.getString("reciter") || "mishary_rashid_alafasy";

      const surahInfo = await getSurahInfo(surahInput);
      if (!surahInfo) {
        return interaction.editReply({ content: "Surah not found." });
      }

      const reciter = RECITERS[reciterKey];
      const audioUrl = await getAudioUrl(surahInfo.surahNo, reciter.id);

      if (!audioUrl) {
        return interaction.editReply({
          content: "Couldn't get the sound.",
        });
      }

      // Skapa en attachment från lokal bild
      const cover = new AttachmentBuilder("./images/quran.webp");

      // Använd thumbnail istället för image
      const embed = new EmbedBuilder()
        .setTitle("🗣️ Spelar Qur'an")
        .setColor("#1DB954")
        .addFields(
          {
            name: "📖 Surah",
            value: `${surahInfo.surahNo}. ${surahInfo.surahName}`,
            inline: true,
          },
          { name: "🎙️ Reciter", value: reciter.name, inline: true }
        )
        .setThumbnail("attachment://quran.webp");

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("resume")
          .setLabel("Play")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("pause")
          .setLabel("Pause")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("stop")
          .setLabel("Stop")
          .setStyle(ButtonStyle.Danger)
      );

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();

      https.get(audioUrl, (res) => {
        const resource = createAudioResource(res);
        connection.subscribe(player);
        player.play(resource);

        setPlayer(interaction.guildId, player, connection);
      });

      player.on(AudioPlayerStatus.Playing, () => {
        console.log(
          `Playing: Surah ${surahInfo.surahNo} (${surahInfo.surahName}) - ${reciter.name}`
        );
      });

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("Finished");
        connection.destroy();
      });

      connection.on(VoiceConnectionStatus.Disconnected, () => {
        console.log("Bot disconnected from voice channel");
        connection.destroy();
      });

      await interaction.editReply({
        embeds: [embed],
        files: [cover],
        components: [row],
      });
    } catch (err) {
      console.error("Error in /play command:", err);
      await interaction.editReply({ content: "An error occurred." });
    }
  },
};
