
import { act, fireEvent, render } from "@testing-library/react-native";
import Home from "../src/components/bottom-tab-components/Home";


export const heightPercentageToDP = jest.fn(percentage => percentage);
export const widthPercentageToDP = jest.fn(percentage => percentage);


jest.mock("react-native-responsive-screen", () => ({
    heightPercentageToDP: jest.fn(),
    widthPercentageToDP: jest.fn()
  }))
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_dUxIXVpgH2KohY', 
    amount: 1000,
    name: 'foo',
    prefill: {
      email: 'void@razorpay.com',
      contact: "name",
      name: "name"
    },
    theme: {color: '#F37254'},
    order_id:""
  }
jest.mock("react-native-razorpay",()=>{
    const RazorpayCheckout = {
        open: jest.fn().mockImplementationOnce((...args) => Promise.resolve({}))
        .mockImplementationOnce((...args)=>Promise.reject("error"))
        ,
      };
      return RazorpayCheckout;
})
// open: (options: CheckoutOptions, successCallback?: ((data: SuccessResponse) => void) | undefined, errorCallback?: ((data: ErrorResponse) => void) | undefined) => Promise<SuccessResponse>
describe("Home.component",()=>{
    test("rendering component",()=>{
        const {getByTestId}=render(<Home/>);
        let input=getByTestId("input0");
        input.props.onChangeText("test")
        input=getByTestId("input1")
        input.props.onChangeText("test")
        input=getByTestId("input2")
        input.props.onChangeText("test")
    })
    test("payment button ",()=>{
        const {getByTestId}=render(<Home/>) 
        const button=getByTestId("paymentbtn")
        act(()=>{
            fireEvent.press(button)
        })
    })
    test("payment button with validatiuon",()=>{
  
        const {getByTestId}=render(<Home/>)
        const button=getByTestId("paymentbtn")
                let input=getByTestId("input1");
                input.props.onChangeText(12)
                input=getByTestId("input2")
                input.props.onChangeText("123")
                input=getByTestId("input0")
                input.props.onChangeText("name")
                act(()=>{
                    fireEvent.press(button)
                })
        
    })
})