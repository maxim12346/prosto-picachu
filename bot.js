const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`p!help ||${client.users.size} users II ${client.guilds.size} servers`, { type: "STREAMING" })
});
client.on('message', message => {
  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
        prefixes: "p!"
    };
}

const prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  if (command === 'ping') {
    message.reply('pong');

  }
  if (command === `${prefix}help`) {
    var help = 'привет! это бот модерации и не только. набери p!help чтобы посмотреть помощь. больше помощи найдешь на support server => https://discord.gg/Xyk5eKW'
    var helpEmbed = new Discord.RichEmbed()
      .setColor('aa00ff')
      .setTitle('HELP I ПОМОЩЬ')
      .setDescription(`[САЙТ](https://sahovskymaxim.wixsite.com/commands/prosto-piachu) \n [авторы бота](https://sahovskymaxim.wixsite.com/commands) \n [команды](https://sahovskymaxim.wixsite.com/commands/kommandy) `)
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(helpEmbed);
  }
  if (command === `${prefix}invite`) {
    var embed = new Discord.RichEmbed()
    .setColor('ADFF2F')
    .setTitle('спасибо что ты меня пригласил!')
    .setDescription(`ссылка на меня: [кликни!](https://discordapp.com/oauth2/authorize?client_id=581913872957440010&scope=bot&permissions=2146958591)`)
    .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
    message.channel.send(embed);
  }
  if (command === `${prefix}8ball`) {
    var fortunes = [
      "Без сомннения!",
      "да",
      "без сомнения!",
      "неа",
      "не совсем",
      "абсолютно!",
      "абсолютно нет",
      "нет",
      "неееет",
      "я вообще не знаю.."
    ]
    if (args[0]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
  }
  if (command === `${prefix}info`) {
    message.reply("первый создатель бота prosto picachu: \n `весений пикачу channel#8567` \n второй создатель бота prosto picachu: ``")
  }
  if (command === `${prefix}afk`) {
    if(message.content.startsWith(prefix+'afk')){
      let reason = args.join(' ');
      var SuccessfulEmbed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setTitle(`AFK`)
        .addField(`ушёл: ${message.author.tag} \n его ID: ${user.id} `)
        .addField('Причина:', reason)
        .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
        .setTimestamp();
      message.channel.send(SuccessfulEmbed);
      }
  }
  if (command === `${prefix}stopafk`) {
    message.reply("был снят с афк")
  }
  // Create an event listener for messages
  // If the message is "what is my avatar"
  if (message.content === `${prefix}avatar`) {
    // Send the user's avatar URL

    message.reply(message.author.avatarURL);
  };
  if (command === `${prefix}msg-all`) {
    const owner = '435123275975360516'
    if(message.author.id !== owner) return message.reply('запрет,команда для овнера!')
    let att = [];
    /*Поддержка attachments*/
    if (message.attachments.size > 0) message.attachments.forEach(attachment => att.push(attachment.url));
    client.guilds.forEach(guild => {
      let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
      if (channels.size > 0) channels.first().send(args.join(' ') + att.join('\n')); message.react("✅");
    });
  }
  if (!message.guild) return;
  // If the message content starts with "!kick"
  if (message.content.startsWith(`${prefix}kick`)) {
    var missingPermissionsEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle('ошибка :exclamation: ')
      .setDescription('**вам нужно право кикать игроков**')
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
      message.delete({ timeout: 1 });
    var missingArgsEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle('ошибка :exclamation: ')
      .setDescription('**Используйте: p!kick [@Пользователь] [Причина]**')
      .setFooter('prosto picachu. 2019. все права за пикачу', client.user.avatarURL)
      .setTimestamp();
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(missingPermissionsEmbed);
    let mentioned = message.mentions.users.first();
    if (!mentioned) return message.channel.send(missingArgsEmbed);
    let reason = args.slice(1).join(' ')
    if (!reason) return message.channel.send(missingArgsEmbed);
    var SuccessfulEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle(`Вы были кикнуты на сервере \`${message.guild.name}\``)
      .addField('кик был выдан:', message.author.tag)
      .addField('Причина:', reason)
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    mentioned.send(SuccessfulEmbed);
    var SuccessfulEmbed = new Discord.RichEmbed()
      .setColor('ADFF2F')
      .setTitle(`Я успешно кикнул данного пользователя.`)
      .addField('Причина:', reason)
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(SuccessfulEmbed);
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick({
          reason: 'reason',
        }).then(() => {
        }).catch(err => {
          console.error(err);
          //member.kick('Optional reason that will display in the audit logs').then(() => {  
        })
      }
    }
    //});
  }
  if (command === `${prefix}mute`) {
    message.member.addRole('muted');
    setTimeout(() => message.member.removeRole(muted), 600000)
    if ("muted") {
      const user = message.mentions.users.first()
      if ("user") {
        client.channels.get('user.id')
      }
      var missingPermissionsEmbed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('ошибка :exclamation: ')
        .setDescription('Вам нужно право `Кикать пользователей` чтобы использовать данную команду')
        .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
        .setTimestamp();
      var missingArgsEmbed = new Discord.RichEmbed()
        .setColor('FF0000')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('ошибка :exclamation: ')
        .setDescription('Используйте: `p!mute [@Пользователь] [Причина]`')
        .setFooter('prosto picachu. 2019. все права за пикачу', client.user.avatarURL)
        .setTimestamp();
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(missingPermissionsEmbed);
      let mentioned = message.mentions.users.first();
      if (!mentioned) return message.channel.send(missingArgsEmbed);
      let reason = args.slice(1).join(' ')
      if (!reason) return message.channel.send(missingArgsEmbed);
      var warningEmbed = new Discord.RichEmbed()
        .setColor('FFFF00')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Вам выдали мут на сервере \`${message.guild.name}\``)
        .addField('мут был выдан:', message.author.tag)
        .addField('Причина:', reason)
        .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
        .setTimestamp();
      mentioned.send(warningEmbed);
      var warnSuccessfulEmbed = new Discord.RichEmbed()
        .setColor('ADFF2F')
        .setTitle(`Я успешно выдал мут данному пользователю.`)
        .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
        .setTimestamp();
    }
  }
  if (command === `${prefix}warn`) {
    var missingPermissionsEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setTitle('ошибка :exclamation: ')
      .setDescription('Вам нужно право `Кикать пользователей` чтобы использовать данную команду')
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setTitle('')
      .setDescription('Используйте: `p!warn [@Пользователь] [Причина]`')
      .setFooter('prosto picachu. 2019. все права за пикачу', client.user.avatarURL)
      .setTimestamp();
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(missingPermissionsEmbed);
    let mentioned = message.mentions.users.first();
    if (!mentioned) return message.channel.send(missingArgsEmbed);
    let reason = args.slice(1).join(' ')
    if (!reason) return message.channel.send(missingArgsEmbed);
    var warningEmbed = new Discord.RichEmbed()
      .setColor('FFFF00')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle(`Вам выдали варн на сервере \`${message.guild.name}\``)
      .addField('Варн был выдан:', message.author.tag)
      .addField('Причина:', reason)
      .addField('**не введите себя плохо!**')
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    mentioned.send(warningEmbed);
    var warnSuccessfulEmbed = new Discord.RichEmbed()
      .setColor('ADFF2F')
      .setTitle(`Я успешно выдал варн данному пользователю.`)
      .setDescription (`варн был выдан администратором:\`${message.guild.name}\``)
      .addField('Причина:', args.join(' '))
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(warnSuccessfulEmbed);
  }
  if (command === `${prefix}version`) {
    var versionSuccessfulEmbed = new Discord.RichEmbed()
      .setColor('FFFF00')
      .setTitle(`текущая версия бота`)
      .setDescription('1.0.0')
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(versionSuccessfulEmbed);
  }
  if (command === `${prefix}update all`) {
    var updateSuccessfulEmbed = new Discord.RichEmbed()
      .setColor('ADFF2F')
      .setTitle('все текущии версии бота')
      .setDescription(`обновление: 1 добавлена команда +clear, \n обновление: 2 изменен силь команд kick,ban \n обновление 3 изменен стиль команды help`)
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(updateSuccessfulEmbed);
  }
  if (command === `${prefix}js`) {
    if(!['441954631539490857', '435123275975360516', ''].find(x => message.author.id === x)) return message.reply('ты не овнер!')
    const code = args.join(" ");

    try {

        let output = eval(code);
        
        if (output.length < 1950) message.channel.send(output, {code : 'js'}).then(() => {message.react("❎")}); 
        
        else message.channel.send(output, {split : '\n', code : 'js'}).then(() => {message.react("✅")}); 
        
    } 
    
    catch (error) { message.channel.send(`Ошибка!\`\`\`js\n${error}\`\`\``).then(() => message.react("❎")) };
  }
  if (command === `${prefix}rules`) {
    var missingPermissionsEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle('ошибка :exclamation: ')
      .setDescription('эту команду может испльзовать только `администратор`')
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(missingPermissionsEmbed);
    var rulesSuccessfulEmbed = new Discord.RichEmbed()
      .setColor('ADFF2F')
      .setTitle(`правила на сервере \ ${message.guild.name}`)
      .setDescription(`\n[1][Запрещен бред, чушь, капс, спам, флуд, накрутка левела](мут 10 мин)
        \n [2][Запрещены оскорбления, мат и грубые выражения (на любом языке)]
        \n[3][Запрещено попрошайничество (добавь в друзья и т.п.]
        \n[4][Запрещено устраивать торговую площадку и т.п.]
        \n[5][Запрещена неадекватная Ава и Никнейм]
        \n[6][Запрещены подозрительные ссылки] (бан навсегда!)
        \n[7][Запрещено скидывать изображения NSFW (18+, шок контент и т.п.)]
        \n[8][Запрещен обман участников сервера]
        \n[9][Не злоупотреблять выделением текста]
        \n[10][Нельзя использовать сторонние шрифты, в т.ч. иероглифы]
        \n[11][Запрещена национальная и расовая ненависть, экстремизм и прочая дребедень в этом духе]
        \n[12][Запрещены угрозы/принижения/насмешки/унижение/подражание и провокация игроков/админов/модераторов]
        \n[-][За нарушения правил пользователь получает mute на определенное время или БАН на неопределенный срок`)
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(rulesSuccessfulEmbed);
  }
  if (command === `${prefix}idea`) {

  }

  if (command === `${prefix}poll`) {
    exports.run = async (bot, message, args, ops) => {

      if (!message.member.roles.find("name", "@everyone")) { //Whatever role you want, I pick @everyone because everyone can use this command
        message.channel.send('Invalid permissions.');
        return;
      }
      // Check for input
      if (!args[0]) return message.channel.send('Proper usage: a.poll <question>');

      // Create Embed
      const embed = new Discord.RichEmbed()
        .setColor("#ffffff") //To change color do .setcolor("#fffff")
        .setFooter('React to Vote.')
        .setDescription(args.join(' '))
        .setTitle(`Poll Created By ${message.author.username}`);

      let msg = await message.channel.send(embed)
        .then(function (msg) {
          msg.react("❎");
          msg.react("✅"); // You can only add two reacts
          message.delete({ timeout: 1000 });
        }).catch(function (error) {
          console.log(error);
        }
        )}
    }
    if (command === `${prefix}memes`) {
      var fortunes = [
        "https://cdn.discordapp.com/attachments/529016532232044556/561629460596785152/unknown.png",
        "https://cdn.discordapp.com/attachments/488901948037398539/561600124678307851/1396643413_30.png",
      ]
      if (args[0]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    }
    if (command === `${prefix}say`) {
      //message.channel.send(message.content)
    }
    if (command === `${prefix}ohelp`) {
      const owner = '435123275975360516'
      if(message.author.id !== owner) return message.reply('запрет,команда для овнера!')
      var helpEmbed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`**${prefix}js** - <код> \n **${prefix}warn** - выдать варн пользователю \n **${prefix}msg-all** - написать сообщение по всем серверам! `)
      .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
      .setTimestamp();
    message.channel.send(helpEmbed);
    if (command === `${prefix}owarn`) {
      const owner = '435123275975360516'
      if(message.author.id !== owner) return message.reply('запрет,команда для овнера!')
      var missingArgsEmbed = new Discord.RichEmbed()
      .setColor('FF0000')
      .setTitle('')
      .setDescription('Используйте: `p!warn [@Пользователь] [Причина]`')
      .setFooter('prosto picachu. 2019. все права за пикачу', client.user.avatarURL)
      .setTimestamp();
      let mentioned = message.mentions.users.first();
      if (!mentioned) return message.channel.send(missingArgsEmbed);
      let reason = args.slice(1).join(' ')
      if (!reason) return message.channel.send(missingArgsEmbed);
      var warningEmbed = new Discord.RichEmbed()
        .setColor('FFFF00')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Вам выдали варн на сервере \`${message.guild.name}\``)
        .addField('Варн был выдан:', message.author.tag)
        .addField('Причина:', reason)
        .addField('**не введите себя плохо!**')
        .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
        .setTimestamp();
      mentioned.send(warningEmbed);
      var warnSuccessfulEmbed = new Discord.RichEmbed()
        .setColor('ADFF2F')
        .setTitle(`Я успешно выдал варн данному пользователю.`)
        .setDescription (`варн был выдан администратором:\`${message.guild.name}\``)
        .addField('Причина:', args.join(' '))
        .setFooter('prosto picachu. 2019. все права за пикачу.', client.user.avatarURL)
        .setTimestamp();
      message.channel.send(warnSuccessfulEmbed);
    }
    }
    if(command === `${prefix}prefix`) {
      if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("вам нужно право управление сервером");
      if(!args[0]) return message.channel.send("Использование: " + prefix + "prefix [префикс]");
      
      prefixes[message.guild.id] = {
          prefixes: args[0]
      };

      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
          if(err) console.log(err);
      });

      message.channel.send(`префикс изменен на ${args[0]}`)
}
if(command === `${prefix}prefix`) {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Вам нельзя!");
  if(!args[1]) return message.channel.send("Использование: " + prefix + "clear [количество сообщений]");
  message.channel.bulkDelete(args[1]);
  message.channel.send("Очищено " + args[1] + " сообщений!");
}
  });
client.login("setting.token")
