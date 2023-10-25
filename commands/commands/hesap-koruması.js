const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('hesap')
    .setDescription("Hesap koruması sistemini ayarlarsınız.")
    .addSubcommand(option => option.setName('koruması').setDescription('Hesap koruması sistemini ayarlarsınız.').addStringOption(option =>  option.setName('durum').setDescription('Hedef Durum.').addChoices({name: "aktif", value: "true"},{name: "deaktif", value: "false"}).setRequired(true)))
    .setDefaultMemberPermissions( Discord.PermissionFlagsBits.Administrator )

module.exports.execute = async (client, interaction, db) => {

    const embed = new Discord.EmbedBuilder()
    .setColor("#ED4245")
    .setDescription(":x: | Koruma log'un aktif edilmesi gerekiyor.")

    if(!db.fetch(`korumaLog.channel_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

    if(interaction.options.getString("durum") === "true") {

        const embed = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription("😕 | Hesap koruması koruması zaten aktif.")

        if(db.fetch(`korumaLog.guardAccountUser_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const embed1 = new Discord.EmbedBuilder()
        .setColor("#57F287")
        .setDescription(":gear: | Hesap koruması koruması `aktif` edilidi!")
        .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        
        db.set(`korumaLog.guardAccountUser_${interaction.guild.id}`, true)
        interaction.reply({ embeds: [embed1] })

    } else {

        const embed = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription("😕 | Hesap koruması koruması zaten deaktif.")

        if(!db.fetch(`korumaLog.guardAccountUser_${interaction.guild.id}`)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const embed1 = new Discord.EmbedBuilder()
        .setColor("#57F287")
        .setDescription(":gear: | Hesap koruması koruması `deaktif` edilidi!")
        .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        
        db.delete(`korumaLog.guardAccountUser_${interaction.guild.id}`)
        interaction.reply({ embeds: [embed1] })

    }


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};