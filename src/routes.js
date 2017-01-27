import Welcome from './scenes/Welcome'
import Login from './scenes/Login/LoginContainer'
import Topic from './scenes/Topic/TopicContainer'
import Topics from './scenes/Topics/TopicsContainer'
import Drip from './scenes/Drip/DripContainer'
import GetStarted from './scenes/GetStarted'
import Settings from './scenes/Settings/SettingsContainer'

export default {
  welcome: {
    initialRoute: true,

    title: 'Welcome',
    component: Welcome,
    hideHeader: true,
  },

  login: {
    initialRoute: false,

    title: 'Login',
    component: Login,
  },

  settings: {
    initialRoute: false,

    title: 'Settings',
    component: Settings,
  },

  getStarted: {
    initialRoute: false,

    title: 'Get Started',
    component: GetStarted,
  },

  topics: {
    initialRoute: false,

    title: 'Topics',
    component: Topics,
    children: {
      topic: {
        initialRoute: false,

        title: 'Topic',
        component: Topic,
        children: {
          drip: {
            initialRoute: false,

            title: 'Drip',
            component: Drip,
          },
        },
      },
    },
  },
}
