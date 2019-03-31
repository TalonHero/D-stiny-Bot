
const Discord = require("discord.js");


const client = new Discord.Client();


const config = require("./config.json");



client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// Here
client.on('message', (message) => {
  if (message.content.startsWith("How do I apply here?")) {
    message.channel.send('If you want to apply! Then go to #📋registration📋 Good luck!');
  }

 
})

client.on("message", async message => {
  if (message.content.startsWith(config.prefix + "help")) {
    let author = message.member;
    let role = message.guild.roles.find('name', "Administrator");
    let role2 = message.guild.roles.find('name', "Administrator");
    let role3 = message.guild.roles.find('name', "Valued Customer");
    message.channel.send({
        embed: {
            color: 0x85CE13,
            title: "Help Information",
            description: "You will soon receive a message from me in direct messages " + message.author + ".",
            timestamp: consDate,
            footer: {
                icon_url: message.author.avatarURL,
                text: "Done by, " + message.author.username
            }
        }
    });
    message.delete();
    if (author.roles.has(role.id) || author.roles.has(role2.id) || author.roles.has(role3.id)) {
        message.author.send({
            embed: {
                color: 0x85CE13,
                title: "Help Page - Admin Version",
                description: "This is a list of commands you can make me do.",
                fields: [{
                    name: "Ping",
                    value: "Replies to show how long it takes for the server to respond, command = *ping."
                },
                {
                    name: "Clear/Purge",
                    value: "Clears entire text channel, command = *clear."
                },
                {
                    name: "Game",
                    value: "Changes current game the bot is playing, command = *play <title>."
                },
                {
                    name: "Stream",
                    value: "Makes the bot look like it is streaming, command = *stream <title>."
                },
                {
                    name: "Status",
                    value: "Changes status of the bot, command = *status <status (online, idle, dnd, invisible)>."
                },
                {
                    name: "Shutdown",
                    value: "Turns the entire bot off, command = *shutdown."
                }
                ]
            }
        });
        message.author.send({
            embed: {
                color: 0x85CE13,
                title: "What's coming soon.",
                description: "There will be more commands coming soon, there will also be many more enjoyable abilities included in this bot."
            }
        });
        message.author.send({
            embed: {
                color: 0x85CE13,
                title: "Information",
                description: "Do not enter bot commands in dm's, must be in a server to run commands."
            }
        });
        console.log(message.author + " has received the admin help list through his direct messages.");
    } else {
        message.author.send({
            embed: {
                color: 0x85CE13,
                title: "Help Page",
                description: "This is a list of commands you can make me do.",
                fields: [{
                    name: "Ping",
                    value: "Replies to show how long it takes for the server to respond."
                },
                {
                    name: "Clear/Purge",
                    value: "Clears entire text channel, command = +clear."
                }
                ]
            }
        });
        console.log(message.author + " has received the normal help list through his direct messages.");
        message.author.send({
            embed: {
                color: 0x85CE13,
                title: "What's coming soon.",
                description: "There will be more commands coming soon, there will also be many more enjoyable abilities included in this bot."
            }
        });
        message.author.send({
            embed: {
                color: 0x85CE13,
                title: "Information",
                description: "Do not enter bot commands in dm's, must be in a server to run commands."
            }
        });
        console.log(message.author + " has received the normal help list through his direct messages.");
    }
}
})

client.on("message", async message => {



  if (message.author.bot) return;


  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  

  if (command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    message.channel.send(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)

  }

  if (command === "say") {

    const sayMessage = args.join(" ");

    message.delete().catch(O_o => { });

    message.channel.send(sayMessage);
  }

  if (command === "kick") {

    if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");


    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");


    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";


    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }



  

  if (command === "ban") {

    if (!message.member.roles.some(r => ["Administrator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if (command === "purge") {

    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");


    const fetched = await message.channel.fetchMessages({ limit: deleteCount });
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN); 


