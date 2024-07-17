const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "kick",
  version: "1.0.0",
  role: 2, // Adjust role as needed
  hasPrefix: true,
  description: "Kick mentioned users from the group chat",
  usages: "kick @mention1 @mention2 ...",
  credits: "chilli",
  cooldowns: 0
};

module.exports.run = async function({ api, event }) {
  try {
    const botID = api.getCurrentUserID();
    const threadInfo = await api.getThreadInfo(event.threadID);
    
    // Check if the bot is an admin
    if (!threadInfo.adminIDs.some(admin => admin.id === botID)) {
      return api.sendMessage("I need to be an admin to kick users. Please make me an admin first.", event.threadID, event.messageID);
    }
    
    const mentions = event.mentions;
    
    if (Object.keys(mentions).length === 0) {
      return api.sendMessage("Please mention the users you want to kick.", event.threadID, event.messageID);
    }
    
    let message = "Kicked the following users:\n\n";
    for (const userID in mentions) {
      await api.removeUserFromGroup(userID, event.threadID);
      message += `${mentions[userID]} (ID: ${userID})\n`;
    }
    
    api.sendMessage(message, event.threadID);
  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
