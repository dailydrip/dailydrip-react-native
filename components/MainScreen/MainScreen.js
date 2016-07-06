import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Actions from '../../actions';
import API from '../../api/DailyDripApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


class MainScreen extends Component {
  static propTypes = {
    fetchTopics: React.PropTypes.func,
  }
  static defaultProps = {
    fetchTopics() {},
  }

  componentDidMount() {
    this.props.fetchTopics();
    AsyncStorage.getItem('auth_token')
    .then((value) => {
      if (!value) {
        RouterActions.loginScreen({ type: 'reset' });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>DailyDrip Main Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => {
      API.getTopics().then((response) => {
        dispatch(Actions.setTopics(response.data.topics));
      });
    },
  };
};

const ConnectedMainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreen);

// export MainScreen
export default ConnectedMainScreen;
