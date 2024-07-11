const { get } = require('axios');
const fs = require('fs');
const path = require('path');

let url = "https://joshweb.click";
let f = path.join(__dirname, 'cache', 'emi.png');

module.exports.config = {
    name: "emi",
    version: "1.0.0",
    role: 0,
    hasPrefix: false,
    credits: "Deku",
    description: "Generate image in emi",
    usages: "[prompt]",
    cooldown: 5,
    aliases: ["em"]
};

module.exports["run"] = async function ({ api, event, args }) {
    function r(msg) {
        api.sendMessage(msg, event.threadID, event.messageID);
    }

    const a = args.join(" ");
    if (!a) return r('Missing prompt!');
    
    const cliff = await new Promise(resolve => { api.sendMessage('🔍 | Generating Emi image...', event.threadID, (err, info1) => {
      resolve(info1);
     }, event.messageID);
    });
    try {
        const d = (await get(url + '/emi?prompt=' + encodeURIComponent(a), {
            responseType: 'arraybuffer'
        })).data;
        fs.writeFileSync(f, Buffer.from(d, "utf8"));
        return r({ attachment: fs.createReadStream(f) });
        fs.unlinkSync(f),event.messageID;    api.unsendMessage(cliff.messageID);
    } catch (e) {
        return r(e.message);
    }
};
