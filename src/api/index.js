import axios from 'axios'
import { AsyncStorage } from 'react-native'

const BASE_URL = 'https://www.dailydrip.com/api'

const loginUrl = `${BASE_URL}/request_token`
const topicsUrl = `${BASE_URL}/topics`
const dripsUrl = (topicId) => `${BASE_URL}/topics/${topicId}/drips`

const rawInstance = axios.create({
  baseURL: `${BASE_URL}`,
})

// Returns an instance with an auth token
const authedInstance = () => {
  return AsyncStorage.getItem('auth_token').then((authToken) => {
    return axios.create({
      baseURL: `${BASE_URL}`,
      headers: { Authorization: `Token token=${authToken}` },
    })
  })
}

export default {
  login: function login(email, password) {
    return rawInstance.post(loginUrl, {
      email,
      password,
      device_type: 'ios',
    })
  },
  getUserInformation: function getUserInformation(){
    return { email: 'dailydrip@dailydrip.com', name: 'DailyDrip' }
  },
  updateUserInformation: function updateUserInformation(){

  },
  getTopics: function getTopics() {
    return authedInstance().then((instance) => { return instance.get(topicsUrl) })
  },
  getDrips: function getDrips(topicId) {
    return authedInstance().then((instance) => { return instance.get(dripsUrl(topicId)) })
  },
}
