import axios from "axios"
import { AsyncStorage, } from 'react-native'

BASE_URL = "https://www.dailydrip.com/api"

let loginUrl = `${BASE_URL}/request_token`

let instance = axios.create({
  baseURL: `${BASE_URL}`,
})

// Returns an instance with an auth token
let authedInstance = function authedInstance(){
  return AsyncStorage.getItem("auth_token").then((auth_token) => {
    return axios.create({
      baseURL: `${BASE_URL}`,
      headers: { 'Authorization': `Token token=${auth_token}` },
    })
  })
}

let DailyDrip = {
  login: function login(email, password){
    return instance.post(loginUrl, {
      email: email,
      password: password,
      device_type: 'ios'
    })
  },
  getTopics: function getTopics(){
    let topicsUrl = `${BASE_URL}/topics`
    return authedInstance().then((instance) => { return instance.get(topicsUrl) } )
  }
}

export default DailyDrip
