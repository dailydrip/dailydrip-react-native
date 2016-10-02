import Welcome from './scenes/Welcome'
import Login from './scenes/Login/LoginContainer'
import Topic from './scenes/Topic'
import Drip from './scenes/Drip/DripContainer'

export default {
  welcome: {
    initialRoute: true,

    title: 'Welcome',
    component: Welcome,
  },

  login: {
    initialRoute: false,

    title: 'Login',
    component: Login,
  },

  topic: {
    initialRoute: false,

    title: 'Topic',
    component: Topic,
  },

  drip: {
    initialRoute: false,

    title: 'Drip',
    component: Drip,
  },
}
