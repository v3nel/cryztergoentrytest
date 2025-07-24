const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType, MessageFlags } = require("discord.js");
const { HelpEmbed } = require('../../embeds/aide');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("aide")
		.setDescription("Demande de l'aide"),
	async execute(interaction) {
		const options = new StringSelectMenuBuilder()
			.setCustomId('aide')
			.setPlaceholder('Trouve ta catégorie')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel("Modération")
					.setDescription("Toutes les commandes de modérations se trouvent dans cette catégorie")
					.setValue('moderation'),
				new StringSelectMenuOptionBuilder()
					.setLabel("Fun")
					.setDescription("Toutes les commandes concernant le divertissement se trouvent dans cette catégorie")
					.setValue('fun'),
				new StringSelectMenuOptionBuilder()
					.setLabel("Gestion du Compte")
					.setDescription("Toutes les commandes concernant la gestion de ton compte se trouvent dans cette catégorie.")
					.setValue('gestion'),
			);
		const row = new ActionRowBuilder().addComponents(options);

		const response = await interaction.reply({
			components: [row],
			embeds: [HelpEmbed(interaction)],
			withResponse: true,
			flags: MessageFlags.Ephemeral,
		});

		const collect = response.resource.message.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			time: 600_000,
		});

		collect.on('collect', async (interaction) => {
			const select = interaction.values[0];
			await interaction.update({
				components: [row],
				embeds: [HelpEmbed(interaction, select)],
				flags: MessageFlags.Ephemeral,
			});
		});

		collect.on('end', async (collected) => {
			if (collected.size === 0) {
				await interaction.editReply({
					content: "L'interaction a expirée relance la commande pour l'utiliser a nouveau",
					components: [],
					embeds: [],
				});
			}
		});
	}
}
