import React from 'react'
import { ScrollView, Text, Image, View, ListView, Button } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Card, Text as TextElements } from 'react-native-elements'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Api from '../Services/DailyDripApi'

// Styles
import styles from './Styles/LaunchScreenStyles'
import ReactNativeUA from 'react-native-ua';

export default class FeedScreen extends React.Component {

  constructor(props) {
    super(props);

    ReactNativeUA.enable_notification(); // prompt user to enable notification

    ReactNativeUA.enable_geolocation(); // prompt user to enable geolocation

    const dataObjects = [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'},
      {title: 'Eighth Title', description: 'Eighth Description'},
      {title: 'Ninth Title', description: 'Ninth Description'},
      {title: 'Tenth Title', description: 'Tenth Description'},
      {title: 'Eleventh Title', description: 'Eleventh Description'},
      {title: '12th Title', description: '12th Description'},
      {title: '13th Title', description: '13th Description'},
      {title: '14th Title', description: '14th Description'},
      {title: '15th Title', description: '15th Description'},
      {title: '16th Title', description: '16th Description'},
      {title: '17th Title', description: '17th Description'},
      {title: '18th Title', description: '18th Description'},
      {title: '19th Title', description: '19th Description'},
      {title: '20th Title', description: '20th Description'}
    ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    this.ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: this.ds.cloneWithRows(dataObjects)
    }
  }

  componentWillMount() {
    // add handler to handle all incoming notifications
    ReactNativeUA.on_notification((notification) => {
        console.log('notification:',
                    notification.url, // if action url is disabled
                    notification.platform,
                    notification.event,
                    notification.alert,
                    notification.data);

        alert(notification.alert);
    });

    // Check if user enabled notifications
    ReactNativeUA.are_notifications_enabled().then(enabled => {
      console.log('notifications enabled:', enabled);
    })

    // Get channel id for device
    ReactNativeUA.get_channel_id().then(channelId => {
      console.log('channel id:', channelId);
    })

    // pass the topic id here
    Api.getDrips('10').then((response)=>{
      // Datasource is always in state
      this.setState({
        dataSource: this.ds.cloneWithRows(response.data.drips)
      })
    })
  }

  renderRow (rowData) {
    return (
      <View style={styles.row}>
        <Card
          title={rowData.title}>
          <Text style={{marginBottom: 10}}>
            {rowData.teaser}
          </Text>
          <Button
            onPress={() => NavigationActions.contentScreen({drip: rowData})}
            backgroundColor='#03A9F4'
            style={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
      <View style={{alignItems:'center'}}>
      </View>
      <ScrollView>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            pageSize={15}
          />
        </ScrollView>
      </View>
    )
  }
}
