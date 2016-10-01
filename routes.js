export default {
  welcome: {
    initialRoute: true,

    title: 'Welcome',
    component: require('./scenes/Welcome').default
  },

  login: {
    initialRoute: false,

    title: 'Login',
    component: require('./scenes/Login').default
  },

  topic: {
    initialRoute: false,

    title: 'Topic',
    component: require('./scenes/Topic').default
  },

  drip: {
    initialRoute: false,

    title: 'Drip',
    component: require('./scenes/Drip').default
  }
}
