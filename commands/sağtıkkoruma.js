
const wait = require("util").promisify(setTimeout);
client.on("guildBanAdd", async function(guild, user) {
 
    let rol = guild.roles.get("1164339133603401800")
    let kanal = guild.channels.get("1164339259579318272")
    if (!kanal) return;
    if (!rol) return;
    wait(1000);
    const entry = await guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then(audit => audit.entries.first());
    const yetkili = await guild.members.get(entry.executor.id);
    
    if (entry.executor.id == guild.owner.id) return;
    const kisi = guild.members.get(entry.executor.id);
    kisi.roles.forEach(x => kisi.removeRole(x).then(f => kisi.addRole(rol.id)))
    
    
    
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle(`UYARI`)
      .setDescription(
        `**<@${yetkili.id}> Sağ Tık Ban Attığı için Bütün Yetkileri Alındı!\n \n__▪ Yasaklanan Kullanıcı:__ \`${user.tag}\`\n__▪ Yasaklanan Kullanıcı ID:__ \`${user.id}\`**`
      )
      .setFooter(guild.name)
      .setTimestamp()
      .setThumbnail(guild.iconURL);
    kanal.send(embed);
    guild.owner.send(
      `**\`${yetkili.tag}\`  İsimli Yetkili  \`${user.tag}\`  Adlı Kişiyi Sağ Tık ile Banladı Ve Yetkilerini Aldım!**`
    );
 
});