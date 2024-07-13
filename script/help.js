const axios = require('axios');

module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['command', 'cmd'],
  description: "Beginner's guide",
  usage: "Help [page] or [command] or [all]",
  credits: 'Developer',
};

module.exports.run = async function ({ api, event, enableCommands, args, Utils, prefix }) {
  const input = args.join(' ');

  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;

    const totalCommands = commands.length;
    const pages = Math.ceil(totalCommands / 20); 

    if (!input || !isNaN(input)) {
      const page = input ? parseInt(input) : 1;

      if (page < 1 || page > pages) {
        return api.sendMessage(`Page ${page} does not exist. Please choose a page between 1 and ${pages}.`, event.threadID, event.messageID);
      }

      const start = (page - 1) * 15;
      const end = Math.min(start + 15, totalCommands);

      let helpMessage = `𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧\n`;
      for (let i = start; i < end; i++) {
        helpMessage += `➤ ${commands[i]}\n`;
      }

      helpMessage += `━━━━━𝗣𝗔𝗚𝗘: <${page}/${pages}>━━━━\n`;
      helpMessage += `━━━𝗦𝗘𝗠𝗕𝗟𝗔𝗡𝗖𝗘 𝗔𝗨𝗧𝗢𝗕𝗢𝗧━━━\n`;
      helpMessage += `Type "help all" to see all commands.\n\n`;
      helpMessage += `𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥: https://www.facebook.com/cyril.pumdal\n\n`;
      helpMessage += `Create your own Bot https://tinyurl.com/2585cfad\n\nTutorial on how to get your account Appstate: https://tinyurl.com/yeysv3x3`;

      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (input.toLowerCase() === 'all') {
      let helpMessage = `━━━━━━━━━━━━━━━━\n`;
      for (let i = 0; i < totalCommands; i++) {
        helpMessage += `➤ ${commands[i]}\n`;
      }

      helpMessage += `━━━𝗦𝗘𝗠𝗕𝗟𝗔𝗡𝗖𝗘 𝗔𝗨𝗧𝗢𝗕𝗢𝗧━━━\n`;
      helpMessage += `𝗧𝗢𝗧𝗔𝗟 𝗖𝗠𝗗𝗦: ${totalCommands}\n`;
      helpMessage += `𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥: https://www.facebook.com/cyril.pumdal\n\n`;
      helpMessage += `Create your own Bot https://tinyurl.com/2585cfad\n\nTutorial on how to get your account Appstate: https://tinyurl.com/yeysv3x3`;

      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;

        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '~> Permission: admin' : (role === 2 ? '~> Permission: thread Admin' : (role === 3 ? '~> Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `~> Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `~ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `~> Credits: ${credits}\n` : '';
        const versionMessage = version ? `~> Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `~> Cooldown: ${cooldown} second(s)\n` : '';

        const message = `「 Command 」\n\n~> Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.handleEvent = async function ({ api, event, prefix }) {
  const { threadID, messageID, body } = event;
  const message = prefix ? 'This is my prefix: ' + prefix : "My apologies but I don't have a prefix";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
};
