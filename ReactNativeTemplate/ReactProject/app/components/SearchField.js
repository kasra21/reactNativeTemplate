import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  AppRegistry
} from 'react-native';

export default class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: props.searchValue,
    };
  };

  onChangeText(value) {
    if(value == ""){
      this.setState({searchValue: value});
      this.state.getUsersView.fetchUsers();
    }
    else{
      this.setState({searchValue: value});
      this.state.getUsersView.searchUsers(value);
    }
    this.state.getUsersView.render();
  };

  render() {
    return (
      <View style={{padding: 20}}>
        <Text> Search: </Text>
        <TextInput value={this.state.searchValue} underlineColorAndroid={'transparent'} style={ styles.defaultInput }
         onChangeText={(value) => this.onChangeText(value)} >
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultInput: {
    height:40,
    borderBottomWidth: 0.5
  }
});

AppRegistry.registerComponent('SearchField', () => SearchField)
