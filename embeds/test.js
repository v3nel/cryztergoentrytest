const { EmbedBuilder } = require("discord.js");

function buildTestEmbed(state = 'default') {
	if (state === 'default') {
		return new EmbedBuilder()
			.setTitle("Aide")
			.setDescription(`Choisis la catégorie de commande`)
			.setFields(
				{name: "choix1", value:"Choix1"},
				{name: "choix2", value:"Choix2"}
			)
	} else if (state === 'test1') {
		return new EmbedBuilder()
			.setTitle("Aide")
			.setDescription("Vous avez choisis le choix 1")
	} else if (state === 'test2') {
		return new EmbedBuilder()
			.setTitle("Aide")
			.setDescription("Vous avez choisis le choix 2")
	}
}

module.exports = { buildTestEmbed };
