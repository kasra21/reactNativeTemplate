import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AppRegistry
} from 'react-native';
import AddButton from './custom/AddButton';
import GetUsers from './GetUsers';
import SearchField from './SearchField';

var searchVal = "";

export default class MainView extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <SearchField searchValue={searchVal} ref={(compo) => this._searchFieldView = compo} />
          <GetUsers navigation={this.props.navigation} ref={(compo) => this._getUsersView = compo} />
        </ScrollView>
        <AddButton navigation={this.props.navigation} ref={(compo) => this._addUserView = compo} />
      </View>
    );
  };

  componentDidMount() {
    this._searchFieldView.setState({getUsersView: this._getUsersView});
    this._addUserView.setState({getUsersView: this._getUsersView});
  };

}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('MainView', () => MainView)
