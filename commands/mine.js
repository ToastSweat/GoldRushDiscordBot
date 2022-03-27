const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mine')
    .setDescription('Use this command to mine for elements to make money and upgrade you equipment.'),
  async execute(interaction) {
    return interaction.reply('You found ' + getRandomElement() + '!');
  },
};


function getRandomElement() {
  let element = 'IRON';
  const ROLL_INDEX = getRandomInt(100);

  console.log('ROLL_INDEX: ' + ROLL_INDEX);

  if (ROLL_INDEX <= 35) {
    element = 'IRON';
  } else if (ROLL_INDEX <= 65) {
    element = 'SILVER';
  } else if (ROLL_INDEX <= 98) {
    element = 'GOLD';
  } else if (ROLL_INDEX >= 99) {
    element = 'DIAMOND';
  } else {
    const rubyRollIndex = getRandomInt(100);
    console.log('rubyRollIndex: ' + rubyRollIndex);
    if (rubyRollIndex === 100) {
      const opalRollIndex = getRandomInt(100);
      console.log('opalRollIndex: ' + opalRollIndex);
      if (opalRollIndex === 100) {
        element = 'OPAL';
      } else {
        element = 'RUBY';
      }
    }
  }
  return element;
  // This doesn't work, and it makes me hate my life
  /**
  switch (ROLL_INDEX) {
    case 1:
      element = 'COPPER';
    case 35:
      element = 'SILVER';
    case 65:
      element = 'GOLD';
    case 99:
      element = 'DIAMOND';
    case 100:
      const rubyRollIndex = getRandomInt(100);
      if (rubyRollIndex === 100) {
        const opalRollIndex = getRandomInt(100);
        if (opalRollIndex === 100) {
          element = 'OPAL';
          return element;
        } else {
          element = 'RUBY';
          return element;
        }
      } else {
        return element;
      }
    default:
      element = 'COPPER';
  }
  return element;
  */
}


function getRandomInt(max) {
  //return Math.floor(Math.random() * max);
  return Math.floor(Math.random() * max) + 1;
}
