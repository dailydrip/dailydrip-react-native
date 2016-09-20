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
  }
}
