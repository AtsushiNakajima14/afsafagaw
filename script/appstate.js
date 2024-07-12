const axios = require('axios');

module.exports.config = {
  name: "appstate",
  version: "1.0",
  role: 0,
  description: "get your account appstate without extension",
  hasPrefix: true,
  usage: "appstate [uid] [password]",
  credits: "Developer",
  aliases: ["fbstate", "c3c"], 
  cooldown: 3
};

module.exports.run = async function ({ api, event, args, chat }) {

  if (args.length !== 2) {
    return chat.reply("Please provide email and password.\n\nexample: appstate [email] [password]", event.threadID, event.messageID);
  }

  //const { messageID } = event;

  const [email, password] = args.map(arg => arg.trim());

  //const marky = await chat.reply("Processing your request, wait for a moment...");
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  const marky = await new Promise(resolve => {
        chat.reply("Getting your appstate, please wait...", event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });

  try {
    const mark = await axios.get(`https://appstates.onrender.com/fbcookie?user=${email}&pass=${password}`);
    const userData = mark.data;

    api.setMessageReaction("✔️", event.messageID, () => {}, true);
    
    const formattedData = userData.map(cookie => ({
      "key": cookie.key,
      "value": cookie.value,
      "domain": cookie.domain,
      "path": cookie.path,
      "hostOnly": cookie.hostOnly,
      "creation": cookie.creation,
      "lastAccessed": cookie.lastAccessed
    }));
     chat.edit(JSON.stringify(formattedData, null, 4), marky.messageID);
  } catch (error) {
    console.error("error", error);
    chat.reply("Error occurred; try changing your password and do it again.", event.threadID, event.messageID);
  }
                      }
