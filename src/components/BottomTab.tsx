import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './bottom-tab-components/Home';
import Map from './bottom-tab-components/Map';
import FontAwsomeIcon from "react-native-vector-icons/FontAwesome"
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Tab = createBottomTabNavigator();
export class BottomTab extends Component {
  render() {
    return (
      <Tab.Navigator
      screenOptions={{
        headerShown:false,

      tabBarActiveTintColor:"#0C356A"
      }}
      >
        <Tab.Screen name="map" component={Map}
        options={{
          tabBarIcon:({color})=><FontAwsomeIcon name="map-marker" color={color} size={hp(4)}/>
      }}
        />
        <Tab.Screen name="payment" component={Home}
        options={{
            tabBarIcon:({color})=><FontAwsomeIcon name="paypal" color={color} size={hp(4)}/>
        }}
        />
        
      </Tab.Navigator>
    )
  }
}

export default BottomTab