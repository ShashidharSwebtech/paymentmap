/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/components/BottomTab';
import {check, PERMISSIONS, request} from 'react-native-permissions';

const Stack = createStackNavigator();
class App extends Component {
  async componentDidMount() {
    if (Platform.OS == 'ios') {
      try {
        const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        switch (res) {
          case 'granted':
          case 'limited':
            Alert.alert('Permission are granted..!');
            break;
          default:
            Linking.openSettings();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        switch (res) {
          case 'granted':
          case 'limited':
            Alert.alert('Permission are granted..!');
            break;
          case 'denied':
          default:
            Linking.openSettings();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="bottomtap" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
