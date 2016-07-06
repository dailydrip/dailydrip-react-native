import React, { Component } from 'react';
import { View, TouchableHighlight, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../actions';
import { Actions as RouterActions } from 'react-native-router-flux';
import API from '../../api/DailyDripApi';
import DripCard from '../DripCard/DripCard';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  items: {
    padding: 10,
    height: 20,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

class TopicScreen extends Component {
  static propTypes = {}

  static defaultProps = {
    fetchDrips() {},
    onPress() {},
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.drips),
    };
    RouterActions.refresh({ title: this.props.topic.title });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.drips),
    });
  }

  componentDidMount() {
    this.props.fetchDrips(this.props.topic.id);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={() => {
          this.props.onPress(rowData);
          RouterActions.dripScreen();
        }}
      >
         <View>
           <DripCard drip={rowData} />
         </View>
      </TouchableHighlight>
    );
  }

  render() {
    const drips = this.props.drips || [];
    return (
      <View style={styles.container}>
        <ListView
          style={styles.items}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}


const mapStateToProps = function mapStateToProps(state) {
  return {
    drips: state.drips,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchDrips: (topicId) => {
      API.getDrips(topicId).then((data) => {
        dispatch(Actions.setDrips(data.data.drips));
      }).catch((error) => {
        console.log(error);
      });
    },
    onPress: (drip) => {
      // NOTE: This should really just set the dripID, and it should reduce to the right one
      dispatch(Actions.setDrip(drip));
    },
  };
};

const ConnectedTopicScreen = connect(mapStateToProps, mapDispatchToProps)(TopicScreen);

// export default TopicScreen
export default ConnectedTopicScreen;
