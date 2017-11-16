import React, { Component } from 'react';
import {AppRegistry, View, ScrollView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CreateEditUser from './app/components/CreateEditUser';
import MainView from './app/components/MainView';
import RefreshButton from './app/components/custom/RefreshButton';

const HomeScreen = ({navigation}) => (
  <MainView navigation={navigation} ref={(compo) => navigation.mainView = compo} />
);

const CreateEditUserPage = ({navigation}) => (
  <CreateEditUser navigation={navigation} />
);

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
      headerTitle: (!navigation.state.params.isCreate) ? ((navigation.state.params.user === undefined) ? 'Update User' : 'User Detail') : 'Add User',
      headerTintColor: '#54C7FC'
    }),
  },
});

export default RootNavigator;

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('reactproject', () => App);
