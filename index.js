const fs = require("node:fs");
const path = require("node:path");
const dotenv = require('dotenv');
const {Client, Events, GatewayIntentBits, Collection, MessageFlags} = require("discord.js");

dotenv.config();

const token = process.env.DISCORD_TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.username}`);
});

client.commands = new Collection();

const foldersP = path.join(__dirname, 'commands');
const commandsF = fs.readdirSync(foldersP);

for (const folder of commandsF) {
	const commandsP = path.join(foldersP, folder);
	const commandFi = fs.readdirSync(commandsP).filter(file => file.endsWith(".js"));
	for (const file of commandFi) {
		const fileP = path.join(commandsP, file);
		const command = require(fileP);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log(`[INFO] La commande ${command.data.name} a bien été synchronisée`);
		} else {
			console.log(`[WARN] La commande ${fileP} n'a pas d'attribut 'data' ou 'execute'`);
		}
	}
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.login(token);
