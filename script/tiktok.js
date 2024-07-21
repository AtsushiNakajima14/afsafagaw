module.exports.config = {
	name: "tiktok",
	version: "1.0.0",
	role: 0,
	credits: "Developer", 
	description: "tiktok search",
	hasPrefix: false,
	aliases: ["tik", "tiksearch"],
	usage: "[Tiktok <search>]",
	cooldown: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event, args }) {
	try {
		const searchQuery = args.join(" ");
		if (!searchQuery) {
			api.sendMessage("Usage: tiktok <search text>", event.threadID);
			return;
		}

		api.sendMessage("⏱️ | Searching, please wait...", event.threadID);

		const response = await axios.get(`https://markdevs69-1efde24ed4ea.herokuapp.com/api/tiksearch?search=${encodeURIComponent(searchQuery)}`);

		const videos = response.data.data.videos;

		if (!videos || videos.length === 0) {
			api.sendMessage("No videos found for the given search query.", event.threadID);
			return;
		}

		const videoData = videos[0];
		const videoUrl = videoData.play;

		const message = `Posted by: ${videoData.author.nickname}\nUser: ${videoData.author.unique_id}\n\nTitle: ${videoData.title}`;

		const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
		const writer = fs.createWriteStream(filePath);

		const videoResponse = await axios({
			method: 'get',
			url: videoUrl,
			responseType: 'stream'
		});

		videoResponse.data.pipe(writer);

		writer.on('finish', () => {
			api.sendMessage(
				{ body: message, attachment: fs.createReadStream(filePath) },
				event.threadID,
				() => fs.unlinkSync(filePath)
			);
		});
	} catch (error) {
		console.error('Error:', error);
		api.sendMessage("An error occurred while processing the request.", event.threadID);
	}
};
