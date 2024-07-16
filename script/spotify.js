const bingchilling = require("axios");
const chilliHot = require("fs");
const pogi = require("path");

module.exports.config = {
    name: "spotify",
    version: "1.0.0",
    credits: "churchillitos",
    description: "Search music",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["spot"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let searchQuery = args.join(" ");
        if (!searchQuery) {
            return api.sendMessage("Missing search query for the Spotify command", event.threadID, event.messageID);
        }

        api.sendMessage("Searching for the track, please wait...", event.threadID, async (err, info) => {
            if (err) {
                console.error("Error sending initial message:", err);
                return;
            }

            try {
                const response = await bingchilling.get(`https://hiroshi-rest-api.replit.app/search/spotify?search=${encodeURIComponent(searchQuery)}`);
                const trackData = response.data[0];
                const downloadUrl = trackData.download;

                const downloadResponse = await bingchilling.get(downloadUrl, { responseType: 'stream' });
                const audioPath = pogi.resolve(__dirname, 'audio.mp3');
                const writer = chilliHot.createWriteStream(audioPath);

                downloadResponse.data.pipe(writer);

                writer.on('finish', () => {
                    api.sendMessage({
                        body: `Here is your track: ${trackData.name}`,
                        attachment: chilliHot.createReadStream(audioPath)
                    }, event.threadID, () => {
                        chilliHot.unlinkSync(audioPath);
                    });
                });

                writer.on('error', (error) => {
                    console.error("Error writing audio file:", error);
                    api.sendMessage("An error occurred while downloading the track.", event.threadID);
                });

            } catch (error) {
                console.error(error);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (error) {
        console.error("Error in Spotify command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
