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
    height: 20,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

class TopicScreen extends Component {
  static propTypes = {
    drips: React.PropTypes.arrayOf(React.PropTypes.object),
    topic: React.PropTypes.object,
    fetchDrips: React.PropTypes.function,
    onPress: React.PropTypes.function,
  }

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
    this.renderRow = this.renderRow.bind(this);
    RouterActions.refresh({ title: this.props.topic.title });
  }

  componentDidMount() {
    this.props.fetchDrips(this.props.topic.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.drips),
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor={'white'}
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
    return (
      <View style={styles.container}>
        <ListView
          style={styles.items}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={this.renderRow}
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
