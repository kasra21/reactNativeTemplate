import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

export default class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: props.searchValue,
    };
  };

  render() {
    return (
      <View style={{padding: 20}}>
        <Text> Search: </Text>
        <TextInput value={this.state.searchValue} underlineColorAndroid={'transparent'} style={styles.defaultInput}
         onChangeText={(value) => this.onChangeText(value)} >
        </TextInput>
      </View>
    );
  }

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
}

const styles = StyleSheet.create({
  defaultInput: {
    height:40,
    borderBottomWidth: 0.5
  }
});

AppRegistry.registerComponent('SearchField', () => SearchField)
