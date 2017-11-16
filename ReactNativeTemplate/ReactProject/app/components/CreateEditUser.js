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
          <View style={{marginTop: 20}}>
            <Text> Username: </Text>
            <TextInput value={ this.state.newUsername }
            editable={this.state.user === null} style={styles.defaultInput}
            onChangeText={(value) => this.setState({newUsername: value})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text> Email: </Text>
            <TextInput value={ this.state.newEmail } style={styles.defaultInput}
            editable={this.state.user === null || this.props.navigation.state.params.oldUser !== undefined}
            onChangeText={(value) => this.setState({newEmail: value})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text> First Name: </Text>
            <TextInput value={ this.state.newFirst } style={styles.defaultInput}
            editable={this.state.user === null || this.props.navigation.state.params.oldUser !== undefined}
            onChangeText={(value) => this.setState({newFirst: value})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text> Last Name: </Text>
            <TextInput value={ this.state.newLast } style={styles.defaultInput}
            editable={this.state.user === null || this.props.navigation.state.params.oldUser !== undefined}
            onChangeText={(value) => this.setState({newLast: value})}
            />
          </View>
        </ScrollView>
        {submitBtn}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'stretch',
  },
  defaultInput: {
    height:40,
    borderBottomWidth: 0.5,
  }
});

AppRegistry.registerComponent('CreateEditUser', () => CreateEditUser);
