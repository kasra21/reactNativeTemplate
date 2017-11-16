import React, { Component } from 'react';
import {Text, Button, TextInput, AppRegistry, View, ScrollView, StyleSheet} from 'react-native';

export default class CreateEditUser extends Component {

  constructor(props) {
    super(props);
    this.user = (!props.navigation.state.params.isCreate) ?
      ((props.navigation.state.params.user !== undefined) ?
        props.navigation.state.params.user : props.navigation.state.params.oldUser) :
         null;
    this.state = {
      user: this.user,
      newUsername: (this.user == null) ? "" : this.user.username,
      newEmail: (this.user == null) ? "" : this.user.email,
      newFirst: (this.user == null) ? "" : this.user.first,
      newLast: (this.user == null) ? "" : this.user.last,
    };
  };

  onPressCreate() {
    this.createUser(this.state.newUsername, this.state.newEmail, this.state.newFirst, this.state.newLast);
    this.props.navigation.goBack();
  };

  onPressUpdate(user) {
    this.props.navigation.state.params.getUsers.updateUser(user.username, this.state.newEmail, this.state.newFirst, this.state.newLast);
    this.props.navigation.goBack();
  };

  createUser(username, email, first, last){
    fetch('http://172.16.131.200:8080/api/addUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        first: first,
        last: last,
      })
    })
    .then((response) => response.json())
    .then((response) => {
      this.props.navigation.state.params.getUsers.fetchUsers();
      this.props.navigation.state.params.getUsers.render();
    });
  };

  render() {
    var submitBtn = null;
    if((this.props.navigation.state.params !== undefined && this.props.navigation.state.params.user === undefined)
  || this.props.navigation.state.params.isCreate){
      submitBtn = <View style={styles.submitButton}>
                    <Button title={(this.props.navigation.state.params.isCreate) ? "Create New User" : "Update User"}
                    onPress={(this.props.navigation.state.params.isCreate) ? ()=>this.onPressCreate() : ()=>this.onPressUpdate(this.user) } />
                  </View>
                  ;
    }
    return (
      <View style={{padding: 20, flex: 1}}>
        <ScrollView>
          <Text> Username: </Text>
          <TextInput value={ this.state.newUsername }
          editable={this.state.user === null}
          onChangeText={(value) => this.setState({newUsername: value})}
          />

          <Text> Email: </Text>
          <TextInput value={ this.state.newEmail }
          editable={this.state.user === null || this.props.navigation.state.params.oldUser !== undefined}
          onChangeText={(value) => this.setState({newEmail: value})}
          />

          <Text> First Name: </Text>
          <TextInput value={ this.state.newFirst }
          editable={this.state.user === null || this.props.navigation.state.params.oldUser !== undefined}
          onChangeText={(value) => this.setState({newFirst: value})}
          />

          <Text> Last Name: </Text>
          <TextInput value={ this.state.newLast }
          editable={this.state.user === null || this.props.navigation.state.params.oldUser !== undefined}
          onChangeText={(value) => this.setState({newLast: value})}
          />
        </ScrollView>
        {submitBtn}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'stretch',
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('CreateEditUser', () => CreateEditUser);
