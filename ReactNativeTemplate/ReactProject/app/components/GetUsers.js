import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  AppRegistry,
  TouchableHighlight,
} from 'react-native';

export default class GetUsers extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds,
    };
  };

  render() {
    return (
      <ListView style={{padding: 20}} dataSource={this.state.userDataSource}
      renderRow={this.renderRow.bind(this)} enableEmptySections={true}>
      </ListView>
    );
  }

  renderRow(user, sectionId, rowId, highlightRow) {
    return(
      <TouchableHighlight onPress={() => {this.onPressItem(user)}} >
        <View style={styles.row}>
          <Text style={styles.rowText} >{user.username}</Text>

          <View style={{paddingRight: 12}}>
            <TouchableHighlight underlayColor='#ffffff' onPress={()=>
              this.onPressUpdate(user)
            } >
              <Image style={styles.iconImage} source={require('./../../resources/update.png')} />
            </TouchableHighlight>
          </View>

          <View style={{paddingRight: 12}}>
            <TouchableHighlight underlayColor='#ffffff' onPress={()=>
              this.onPressDelete(user)
            } >
              <Image style={styles.iconImage} source={require('./../../resources/trash.png')} />
            </TouchableHighlight>
          </View>

        </View>
      </TouchableHighlight>
  )}

  onPressItem(user){
    this.props.navigation.navigate('CreateEditUserPage', {isReadOnly: true, user: user});
  }

  onPressUpdate(user){
    this.props.navigation.navigate('CreateEditUserPage', {isUpdateUser: true, oldUser: user, getUsers: this});
  }

  onPressConfirm(user){
    this.deleteUser(user.username);
  }

  onPressDelete(user){
    console.log('delete pressed');
    Alert.alert(
      'Delete Confirmation',
      'Please confirm that you want to delete the user: '+ user.username,
      [
        {text: 'Cancel', },
        {text: 'OK', onPress:() => this.onPressConfirm(user)},
      ],
      { cancelable: false }
    )
  }

  componentDidMount() {
    this.fetchUsers();
  };

  fetchUsers(){
    fetch('http://172.16.131.200:8080/api/getUsers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        userDataSource: this.state.userDataSource.cloneWithRows(response.result)
      });
    });
  };

  searchUsers(username){
    fetch('http://172.16.131.200:8080/api/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      })
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        userDataSource: this.state.userDataSource.cloneWithRows(response.result)
      });
    });
  };

  deleteUser(username){
    fetch('http://172.16.131.200:8080/api/deleteUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      })
    })
    .then((response) => response.json())
    .then((response) => {
      //success
      this.fetchUsers();
      this.render();
    });
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 3,
  },
  rowText: {
    flex: 1
  },
  iconImage: {
    tintColor: '#54C7FC', width: 24, height: 24
  }
});

AppRegistry.registerComponent('GetUsers', () => GetUsers)
