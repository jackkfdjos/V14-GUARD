const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription("Select a Member and Ban them.")
    .addUserOption(userOption =>
      userOption
        .setName('target')
        .setDescription("The Member to Ban.")
        .setRequired(true))
    .addStringOption(stringOption =>
      stringOption
        .setName('reason')
        .setDescription("The Reason for Banning."))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? "No Reason provided.";

    try {
      const embedMessage = new EmbedBuilder()
        .setColor('Green')
        .setTitle("Info for Ban")
        .setDescription(`Banned **${target.username}** for Reason: **${reason}**`);
      await interaction.reply({ embeds: [embedMessage] });
      await interaction.guild.members.ban(target, { reason: reason });
    } catch (error) {
      const embedMessage = new EmbedBuilder()
        .setColor('Red')
        .setTitle("Error")
        .setDescription("An Error has occurred.");
      await interaction.editReply({ embeds: [embedMessage] });
      return console.error(error);
    }
  },
};