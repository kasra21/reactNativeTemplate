import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View,
  AppRegistry
} from 'react-native';
import GetUsers from './../GetUsers';

export default class RefreshButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  onPressRefresh() {
    this.props.navigation.mainView._getUsersView.fetchUsers()
    this.props.navigation.mainView._getUsersView.render()
  };

  render() {
    return (
      <View style={{paddingRight: 12}}>
        <TouchableHighlight underlayColor='#ffffff' onPress={()=>
          this.onPressRefresh()
        } >
          <Image style={styles.iconImage} source={require('./../../../resources/refresh-icon.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconImage: {
    tintColor: '#54C7FC', width: 26, height: 26
  }
});

AppRegistry.registerComponent('RefreshButton', () => RefreshButton)
