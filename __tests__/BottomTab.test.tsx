import { render } from "@testing-library/react-native";
import BottomTab from "../src/components/BottomTab";
const {View:MockView}=require("react-native")
jest.mock("react-native-vector-icons/FontAwesome", () => () => <></>)

jest.mock("@react-navigation/bottom-tabs", () => {
  
    return {
        createBottomTabNavigator: () => ({
            Navigator: (props:any) => {
                props.screenOptions.headerShown=false
                props.screenOptions.tabBarActiveTintColor="#0C356A"
                return <MockView {...props} />

            },
            Screen: (props: any) => {
                props.options.tabBarIcon({ color:"#aaa"})
                return <MockView {...props} />
            }
        })
    };
  })
  jest.mock("react-native-razorpay",()=>{
    return {default:{
        RazorpayCheckout:{
            open:jest.fn()
        }
    }}
})
export const heightPercentageToDP = jest.fn(percentage => percentage);
export const widthPercentageToDP = jest.fn(percentage => percentage);
jest.mock("react-native-responsive-screen", () => ({
    heightPercentageToDP: jest.fn(),
    widthPercentageToDP: jest.fn()
  }))

jest.mock('react-native-maps',()=>({
    default:()=>()=><></>,
    Marker:()=>()=><></>
}))

describe("Bottom Tab Component",()=>{
    test("rendering the component",()=>{
        render(<BottomTab/>);
   
    })
})