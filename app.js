require("dotenv").config();
const fs = require("fs");
const Path = require("path");
const Discord = require("discord.js");
const { GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = global.client = new Discord.Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

client.commands = global.commands = new Discord.Collection();
client.functions = global.functions = require("./helpers/functions");
const synchronizeSlashCommands = require('discord-sync-commands');


const eventsRegister = () => {
    let eventsDir = Path.resolve(__dirname, './events');
    if (!fs.existsSync(eventsDir)) return client.functions.log("Events klasörü yok.", "EVENTS_REGISTER");
    fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
        let prop = require(`./events/${event}`);
        if (!prop) return client.functions.log("Props(lar) yok.", "EVENTS_REGISTER");
        client.functions.log(`${event} etkinliği uygulandı.`, "EVENTS_REGISTER");
        client.on(event.split('.')[0], prop.bind(null, client));
        delete require.cache[require.resolve(`./events/${event}`)];
    });
};

const commandsRegister = () => {
    let commandsDir = Path.resolve(__dirname, './commands');
    if (!fs.existsSync(commandsDir)) return client.functions.log("Events klasörü yok.", "COMMANDS_REGISTER");
    fs.readdirSync(commandsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((command) => {
        let prop = require(`./commands/${command}`);
        if (!prop) return client.functions.log("Props(lar) yok.", "COMMANDS_REGISTER");
        client.functions.log(`${command} komutu kaydedildi.`, "COMMANDS_REGISTER");
        client.commands.set(prop.options.name, prop);
        delete require.cache[require.resolve(`./commands/${command}`)];
    });
};



const slashCommandsRegister = () => {
    const commands = client.commands.filter((c) => c.options);
    const fetchOptions = { debug: true };
    synchronizeSlashCommands(client, commands.map((c) => c.options), fetchOptions);
};

const portRegister = () => {
    const app = require("express")();
    app.use("*", async (req, res, next) => {
        res.json({ message: "Api!" });
        next();
    });
    app.listen(process.env.PORT || 80);
};

eventsRegister();
commandsRegister();
slashCommandsRegister();
portRegister();


client.login("OTE1NjAzNzgxMDk2NDY4NTQw.GpP6Ws.5mwEdzTwMXtE2KipsAE1tU-e-oXQDe2FIKvIQM" || null).then((_) => {
    return client.functions.log("Token girişi başarılı.", "TOKEN_LOGIN");
}).catch((e) => {
    return client.functions.log("Token girişi başarısız.", "TOKEN_LOGIN");
});


process.on('unhandledRejection', error => {
    console.log(error);
});

const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
  let channel = client.channels.cache.get("1164339617261166632")
 

      const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
  });
})
