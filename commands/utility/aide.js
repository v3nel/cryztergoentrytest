const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("aide")
		.setDescription("Demande de l'aide"),
	async execute(interaction) {
		await interaction.reply(`Tu veux de l'aide ${interaction.user.username}`)
	}
}
