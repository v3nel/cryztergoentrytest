const {SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, MessageFlags} = require("discord.js");
const { buildTestEmbed }= require("../../embeds/test");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Test de la row"),
	async execute(interaction) {
		const menu = new StringSelectMenuBuilder()
			.setCustomId("test")
			.setPlaceholder("Choisis nan ?")
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel("Test1")
					.setValue("test1"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Test 2")
					.setValue("test2"),
			);
		const row = new ActionRowBuilder().addComponents(menu);

		const response = await interaction.reply({
			content:"Jsp sah choisis",
			components: [row],
			embeds: [ buildTestEmbed() ],
			withResponse: true,
			flags: MessageFlags.Ephemeral,
		});

		const collector = response.resource.message.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			time: 600_000,
		});

		collector.on('collect', async (interaction) => {
			const selected = interaction.values[0];
			let result = '';

			if (selected === 'test1') result = 'Tu as choisi le choix 1';
			else if (selected === 'test2') result = 'Tu as choisi le choix 2';

			await interaction.update({
				content: result,
				components: [ row ],
				embeds: [ buildTestEmbed(selected) ],
				flags: MessageFlags.Ephemeral,
			});
		});

		collector.on('end', async (collected) => {
			if (collected.size === 0) {
			await interaction.editReply({
        			content: "L'interaction a expirée relance la commande pour l'utiliser a nouveau",
        			components: [],
				embeds: [],
        			});
			}
		});
	},
};
