import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  AppRegistry
} from 'react-native';

export default class AddButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
    };
  };

  onPressBtn() {
    this.state.navigation.navigate('CreateEditUserPage',
     {isCreate: true, getUsers: this.state.getUsersView});
  }

  render() {
    return (
      <TouchableHighlight style={styles.addButton}
        underlayColor='#FF3516' onPress={()=>{
          this.onPressBtn(); }
        }>
        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#ff0000',
    borderColor: '#ff0000',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});

AppRegistry.registerComponent('AddButton', () => AddButton)
