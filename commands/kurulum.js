const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication, MessageActionRow, MessageButton } = require("discord.js");
const { çizgi, green, red, star } = require('../jaylen.json');
const ayar = require('../jaylen.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kurulum")
    .setDescription("Destek bot kanal ve emoji kurulumunu sağlar."),

  async execute(interaction, client) {
   
     if(interaction.guild === null) {
        return interaction.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if(!ayar.OwnerID.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
      } else {

    const kkurulum = new MessageButton()
    .setCustomId("kanal")
    .setLabel("Kanal Kurulum")
    .setStyle("SUCCESS")
    .setEmoji("920412144716103801") 

    const ekurulum = new MessageButton()
    .setCustomId("emoji")
    .setLabel("Emoji Kurulum")
    .setStyle("DANGER")
    .setEmoji("920412153712889877") 

    const row = new MessageActionRow()
    .addComponents([kkurulum, ekurulum])

    interaction.reply({ content: `Lütfen **20 saniye** içerisinde hangi kurulum yapacağınızı aşağıdaki butonlara tıklayarak cevaplayınız.`, components: [row], ephemeral: true })

    var filter = (button) => button.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 })

    collector.on("collect", async (interaction) => {

        if(interaction.customId === "kanal") {

            const parent2 = await interaction.guild.channels.create('Canlı Destek', { 
                type: 'GUILD_CATEGORY' 
              });

            await interaction.guild.channels.create('Canlı Destek', { 
                type: 'GUILD_TEXT',
                parent: parent2.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: ayar.CanlıDestekEkibiRoleID,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
               }]
            });

            const parent = await interaction.guild.channels.create('📋 Yetkili basvuru', { 
                type: 'GUILD_CATEGORY' 
              });

            await interaction.guild.channels.create('📋・yetkili-basvuru', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                }]
            });
            await interaction.guild.channels.create('📋・yetkili-basvuru-onay', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGES'],
                }]
            });
            await interaction.guild.channels.create('📋・yetkili-basvuru-log', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
               {
                    id: ayar.YetkiliAlımRoleID,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
               }]
            });
            await interaction.guild.channels.create('istek-sikayet-log', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }]
            });        
            interaction.reply({ content: `${green} Support Kanal kurulumu başarıyla tamamlanmıştır.`, components: [] , ephemeral: true })

        }

        if(interaction.customId === "emoji") {
          
            const emojis = [
                { name: "green", url: "https://cdn.discordapp.com/emojis/716657219457777674.gif?size=96" },
                { name: "red", url: "https://cdn.discordapp.com/emojis/915754675742081076.gif?size=96" },
                { name: "star", url: "https://cdn.discordapp.com/emojis/920340166604890224.gif?size=96" },
                { name: "cizgi", url: "https://cdn.discordapp.com/emojis/916013869816745994.gif?size=96" }
            ]

            emojis.forEach(async (x) => {
                const emoji = await interaction.guild.emojis.create(x.url, x.name);
              });

            interaction.reply({ content: `${green} Support Emoji kurulumu başarıyla tamamlanmıştır.`, components: [] , ephemeral: true })

        }

    })

}
  },
};
