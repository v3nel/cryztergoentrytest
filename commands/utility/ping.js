const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Sends pong to the user"),
	async execute(interaction) {
		await interaction.reply('Pong !!')
	},
};
