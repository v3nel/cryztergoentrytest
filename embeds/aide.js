const { EmbedBuilder } = require("discord.js");

function HelpEmbed(interaction, state = 'default'){
	if(state === 'default') {
		return new EmbedBuilder()
			.setTitle('Aide')
			.setDescription(`Bienvenu dans le centre d'aide ${interaction.user.mention}. Choisis la catégorie de commande`)
			.setFields(
				{name: "Modération", value:"Ces commandes ne sont accessibles seulement par les modérateurs tu peux les voir mais pas les utiliser si tu n'as pas ce role"},
				{name: "Fun", value: "Ces commandes sont purement pour du divertissement"},
				{name: "Gestion du compte", value: "Si tu souhaites gérer les infos de ton compte, toutes les commandes nécessaires sont disponible dans cette catégorie"},
			)
	} else if(state === 'moderation') {
		return new EmbedBuilder()
			.setTitle('Aide')
			.setDescription(`Tu as choisis la catégorie modération, ne t'inquiètes pas les commandes seront bientot la.`)
	} else if(state === 'fun') {
		return new EmbedBuilder()
			.setTitle('Aide')
			.setDescription(`Tu as choisis la catégorie fun, ne t'inquiètes pas les commandes seront bientot la.`)
	} else if (state === 'gestion') {
		return new EmbedBuilder()
			.setTitle('Aide')
			.setDescription(`Tu as choisis la catégorie gestion, ne t'inquiètes pas les commandes seront bientot la.`)
	}
}

module.exports = { HelpEmbed };
