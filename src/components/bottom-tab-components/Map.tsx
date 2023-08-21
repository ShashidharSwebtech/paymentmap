import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';

interface Iprops {}
interface Istate {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}
export class Map extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);

    this.state = {
      region: {
        latitude: 17.45085,
        longitude: 78.3916,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  // AIzaSyCvxT0Yhg5MUmxUGVkczz8ZZKFK_y4r2CU
  render() {
    return (
      <SafeAreaView>
        <MapView
        testID='mapview'
          initialRegion={this.state.region}
          region={this.state.region}
          style={{height: hp(100)}}
          onRegionChange={(val)=>{this.setState({region:val})}}
          // onPoiClick={(val)=>{console.log(val)}}
        >
         <Marker
         coordinate={this.state.region}
         />
        </MapView>
      </SafeAreaView>
    );
  }
}

export default Map;
