import { render } from "@testing-library/react-native";
import App from "../App";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

const { View:MockView } =require("react-native");


jest.mock("@react-navigation/native", () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const { View: MockView } = require("react-native")
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />
  }
});
jest.mock("@react-navigation/stack",()=>({
  createStackNavigator:()=>({
    Navigator: () => <MockView />,
    Screen: () => (props: any) => <></>
  })
}))
jest.mock("react-native/Libraries/Utilities/Platform",()=>({
  OS:'ios'
}))
jest.mock("react-native-razorpay",()=>({
  RazorpayCheckout:{
    open:jest.fn()
  }
}))
jest.mock("react-native-responsive-screen", () => ({
  heightPercentageToDP: jest.fn(),
  widthPercentageToDP: jest.fn()
}))
// jest.spyOn(require,"resolve").mockResolvedValueOnce()

jest.mock("react-native-vector-icons/FontAwesome", () => () => <></>)

jest.mock("@react-navigation/bottom-tabs", () => {
  
  return {
      createBottomTabNavigator: () => ({
          Navigator: () => <MockView />,
          Screen: () => (props: any) => <></>
      })
  };
})
//----------
jest.mock("react-native-maps",()=>({
  MapView:(props:any)=><MockView {...props}></MockView>,
  Marker:(props:any)=><MockView {...props}></MockView>
}))

// jest.spyOn("react-native-permissions","request").mockImplementation

jest.mock("react-native-permissions", () => ({
  PERMISSIONS: {
    IOS: {
    LOCATION_WHEN_IN_USE:""
  }, ANDROID: { 
    ACCESS_FINE_LOCATION:""
  }
},
  request:jest.fn()
  .mockImplementation((...args)=>Promise.resolve("granted"))
  .mockImplementationOnce((...args)=>Promise.resolve("denied"))
  .mockImplementationOnce((...args)=>Promise.resolve("blocked"))
}))

jest.mock("react-native-maps",()=>({
  MapView:(props:any)=><MockView {...props}></MockView>,
  Marker:(props:any)=><MockView {...props}></MockView>
}))

jest.mock("react-native/Libraries/Utilities/Platform",()=>({
  OS:"ios"
}))

describe("App component",()=>{
  it("renderng",()=>{
      Platform.OS="android"
    render(<App/>)
  })

  it("renderng",()=>{
   
    Platform.OS="ios"
  render(<App/>)
})


  it("renderng with android",()=>{
    Platform.OS="ios"
        render(<App/>)
  })
})


