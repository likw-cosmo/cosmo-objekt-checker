import { SlashCommandBuilder } from 'discord.js';
const execute = async (interaction) => {
    return await interaction.reply('Pong!');
}
const ping = () => {
    return new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!');
}
export default ping
