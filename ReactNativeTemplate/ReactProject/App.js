import React, { Component } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CreateEditUser from './app/components/CreateEditUser';
import MainView from './app/components/MainView';
import RefreshButton from './app/components/custom/RefreshButton';

//ref bind to navigation, so that those elements can accest the refs
const HomeScreen = ({navigation}) => (
  <MainView navigation={navigation} ref={(compo) => navigation.mainView = compo} />
);

const CreateEditUserPage = ({navigation}) => (
  <CreateEditUser navigation={navigation} ref={(compo) => navigation.createEditView = compo} />
);

//navigation.state.params.isCreate set in AddButton --> this.state.navigation.navigate('CreateEditUserPage',
//navigation.state.params.isUpdateUser | isReadOnly are set in GetUsers --> this.props.navigation.navigate('CreateEditUserPage',
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'React Demo',
      headerRight: <RefreshButton navigation={navigation} />,
      headerTintColor: '#54C7FC'
    }),
  },
  CreateEditUserPage: {
    screen: CreateEditUserPage,
    navigationOptions: ({navigation}) => ({
      headerTitle: (!navigation.state.params.isCreate) ? ((navigation.state.params.isUpdateUser) ? 'Update User' : ((navigation.state.params.isReadOnly) ? 'User Detail' : '')) : 'Add User',
      headerTintColor: '#54C7FC'
    }),
  },
});

export default RootNavigator;

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('reactproject', () => App);
