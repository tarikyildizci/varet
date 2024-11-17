import cfonts from 'cfonts'

function displayLogo() {
  return cfonts.render('varet', {
    font: 'simple3d',
    colors: ['red'],
    env: 'node',
  })
}

export default displayLogo
