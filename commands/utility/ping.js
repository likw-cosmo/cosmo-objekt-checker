const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back'))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to echo into')),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};