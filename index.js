const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const keep_alive = require('./keep.alive.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`);
});

client.on('messageCreate', message => {
    if (message.mentions.users.has(client.user.id) && !message.author.bot && message.author.id === '931183401392820225') {
        const embed = new EmbedBuilder()
            .setDescription('Please read the server rules above and click "Verify" to see all channels.')
            .setColor('#FECF24');

        const button = new ButtonBuilder()
            .setCustomId('verify-button')
            .setLabel('Verify')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('messageCreate', message => {
    if (message.content === '-embed2' && message.channelId === '1176463903178358864') {
        message.channel.send('React to this message to get your roles!');

        const embed = new EmbedBuilder()
            .setDescription('Receive notifications whenever the following events are about to start\n\n[Click here](https://discord.com/channels/1069535713537818635/1169260233823092777)')
            .setColor('#70b0ff');

        const button = new ButtonBuilder()
            .setCustomId('notification-button')
            .setLabel('Get Notified')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        message.channel.send({ embeds: [embed], components: [row] });
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'notification-button') {
        const roleToAssign = interaction.guild.roles.cache.find(role => role.id === '1107310815104733234');
        if (roleToAssign) {
            try {
                await interaction.member.roles.add(roleToAssign);
                const successMessage = new EmbedBuilder()
                    .setColor('#43B581')
                    .setDescription('You have been assigned the notification role!');
                if (!interaction.replied) {
                    await interaction.reply({ ephemeral: true, embeds: [successMessage] });
                }
            } catch (error) {
                const errorMessage = new EmbedBuilder()
                    .setColor('#F04747')
                    .setDescription('There was an error assigning the role.');
                if (!interaction.replied) { // Check if no reply has been sent before
                    await interaction.reply({ ephemeral: true, embeds: [errorMessage] });
                }
            }
        } else {
            const roleNotFoundError = new EmbedBuilder()
                .setColor('#F04747')
                .setDescription('Error: Role not found.');
            if (!interaction.replied) { // Check if no reply has been sent before
                await interaction.reply({ ephemeral: true, embeds: [roleNotFoundError] });
            }
        }
    }
});


  client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'verify-button') {
      await interaction.deferReply({ ephemeral: true }); // Defer the reply if further processing is needed

      const verifiedRoleId = '1069573283097350154'; // Your verified role ID
      const nonVerifiedRoleId = '1109498585223016608'; // Your non-verified role ID

      if (interaction.member.roles.cache.has(verifiedRoleId)) {
          const alreadyVerifiedEmbed = new EmbedBuilder()
              .setColor('#FF0000') // Red color for error
              .setDescription('You are already verified!');
          await interaction.editReply({ embeds: [alreadyVerifiedEmbed] });
          return;
      }

      const verifiedRole = interaction.guild.roles.cache.get(verifiedRoleId);
      const nonVerifiedRole = interaction.guild.roles.cache.get(nonVerifiedRoleId);

      if (verifiedRole && nonVerifiedRole) {
          try {
              await interaction.member.roles.add(verifiedRole);
              await interaction.member.roles.remove(nonVerifiedRole);
              const verificationSuccessEmbed = new EmbedBuilder()
                  .setColor('#43B581') // Green color for success
                  .setDescription('You have been verified!');
              await interaction.editReply({ embeds: [verificationSuccessEmbed] });
          } catch (error) {
              const verificationErrorEmbed = new EmbedBuilder()
                  .setColor('#F04747') // Red color for error
                  .setDescription('There was an error verifying your account.');
              await interaction.editReply({ embeds: [verificationErrorEmbed] });
          }
      } else {
          const roleNotFoundErrorEmbed = new EmbedBuilder()
              .setColor('#F04747') // Red color for error
              .setDescription('Error: Role not found.');
          await interaction.editReply({ embeds: [roleNotFoundErrorEmbed] });
      }
  }

    if (interaction.customId === 'notification-button') {
        const roleToAssign = interaction.guild.roles.cache.find(role => role.id === '1107310815104733234');
        if (roleToAssign) {
            try {
                await interaction.member.roles.add(roleToAssign);
                const successMessage = new EmbedBuilder()
                    .setColor('#43B581')
                    .setDescription('You have been assigned the notification role!');
                await interaction.reply({ ephemeral: true, embeds: [successMessage] });
            } catch (error) {
                const errorMessage = new EmbedBuilder()
                    .setColor('#F04747')
                    .setDescription('There was an error assigning the role.');
                await interaction.reply({ ephemeral: true, embeds: [errorMessage] });
            }
        } else {
            const roleNotFoundError = new EmbedBuilder()
                .setColor('#F04747')
                .setDescription('Error: Role not found.');
            await interaction.reply({ ephemeral: true, embeds: [roleNotFoundError] });
        }
    }
});

client.login('MTE3NDYwNTgyMzg1NTU2MjgyMg.GCtDLj.v0rx0sdKrPhVcab9hRjjrUI3GPfFdDo8UUkke8');
