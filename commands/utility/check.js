const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('check')
    .setDescription('Check information')
    .addIntegerOption(option =>
      option
        .setName('member')
        .setDescription('The member ID')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('season')
        .setDescription('The season')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('num')
        .setDescription('The objekt number')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('physical')
        .setDescription('The objekt is physical or not')
        .setRequired(false)
        .addChoices(
          { name: 'A', value: 'A' },
          { name: 'Z', value: 'Z' }
        )
    ),
  async execute(interaction) {
    const member = interaction.options.getInteger('member');
    const season = interaction.options.getString('season');
    const num = interaction.options.getInteger('num');
    const physical = interaction.options.getInteger('physical');

    // Your logic here (e.g., look up information based on the arguments)

    await interaction.reply(`Checking info for member ${member}, season ${season}, and number ${num}, physical ${physical}`);
  },
};