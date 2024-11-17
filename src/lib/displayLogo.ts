import cfonts from 'cfonts'

function displayLogo() {
  cfonts.say('varet', {
    font: 'simple3d',
    colors: ['red'],
    env: 'node',
  })
}

export default displayLogo
