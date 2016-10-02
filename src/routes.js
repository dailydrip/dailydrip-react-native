import Welcome from './scenes/Welcome'
import Login from './scenes/Login/LoginContainer'
import Topic from './scenes/Topic/TopicContainer'
import Topics from './scenes/Topics/TopicsContainer'
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

  topics: {
    initialRoute: false,

    title: 'Topics',
    component: Topics,
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
