import {
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';
import React, {Component} from 'react';


import RazorpayCheckout from 'react-native-razorpay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface IState {
  LabelType: {
    id: number;
    label: string;
    type: KeyboardTypeOptions;
    placeholder: string;
  }[];
  inputDetails: {
    name: string;
    amount: number;
    number: string;
  };
}
interface Iprops {}
export class Home extends Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props);

    this.state = {
      LabelType: [
        {
          id: 1,
          label: 'Name',
          type: 'name-phone-pad',
          placeholder: 'shashi',
        },
        {
          id: 2,
          label: 'Amount',
          type: 'number-pad',
          placeholder: '55',
        },
        {
          id: 3,
          label: 'Number',
          type: 'number-pad',
          placeholder: '+970.......',
        },
      ],
      inputDetails: {
        name: '',
        amount: 0,
        number: "",
      },
    };
  }
    paymeny=()=>{
      const {inputDetails}=this.state;
      console.log(inputDetails)
      if(inputDetails.amount==0||inputDetails.name==""||inputDetails.number==""){
        Alert.alert("data should be required");
        return;
      }else{
        try{
          var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_test_dUxIXVpgH2KohY', 
              amount: inputDetails.amount*100,
              name: 'foo',
              prefill: {
                email: 'void@razorpay.com',
                contact: inputDetails.number,
                name: inputDetails.name
              },
              theme: {color: '#F37254'},
              order_id:""
            }
            RazorpayCheckout.open(options).then((data) => {
              Alert.alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
              Alert.alert(`Error: ${error.code} | ${error.description}`);
            });
  
        }catch(error){
         console.log(error)
        }

      }
        }
  onInput = (text: string, id: number) => {
    let {inputDetails} = this.state;
    switch (id) {
      case 1:
        this.setState({inputDetails: {...inputDetails, name: text}});
        break;
      case 2:
        this.setState({inputDetails: {...inputDetails, amount: Number(text)}});
        break;
      case 3:
        this.setState({inputDetails: {...inputDetails, number: text}});
        break;
    }
  };
  render() {
    const {LabelType,inputDetails} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.innerContaner}>
            <Image source={require("../../assets/razorpay.png")}
            style={styles.img}
            />
          <Text style={styles.paymentText}>PAYMENT</Text>
          <View style={{height:hp(20)}}>
              
          <FlatList
            data={this.state.LabelType}
            renderItem={({item,index}) => {
              return (
                <View >
                  <Text style={styles.label}>{item.label}</Text>
                  <TextInput
                  testID={'input'+index}
                    keyboardType={item.type}
                    placeholder={item.label}
                    placeholderTextColor={'#aaa'}
                    onChangeText={text => {
                      this.onInput(text, item.id)
                    }}
                   
                    style={styles.input}
                  />
                  
                </View>
              );
            }}
          />
            </View>
          <TouchableOpacity onPress={this.paymeny}
          style={styles.paybtn}
          testID='paymentbtn'
          >
                    <Text style={styles.paytext}>Pay</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;

const styles=StyleSheet.create({
  input:{
backgroundColor:"#aaaaaa44",
width:wp(85),
height:hp(4),
borderRadius:hp(1),
alignSelf:"center",
padding:wp(2)
  },
  container:{
    backgroundColor:"#4682A9",
    height:hp(100),
    justifyContent:"flex-end"
  },
  label:{
    fontWeight:"600",
    // color:"#"3
  },
  innerContaner:{
    height:hp(80),
    backgroundColor:"#fff",
    borderRadius:hp(2),
    padding:hp(2),
    alignItems:"flex-start"
   
  },
  paybtn:{
    width:wp(80),
    alignSelf:"center",
    alignItems:"center",
    backgroundColor:"#4682A9",
    borderRadius:hp(1),
    elevation:10,
    height:hp(4),
    justifyContent:"center"
  },
  paytext:{
    fontSize:hp(2.5),
    color:"#fff",
    fontWeight:"600"
  },
  paymentText:{
    marginVertical:hp(3),
    fontSize:hp(2),
    fontWeight:"800",
    marginTop:hp(4)
  },
  img:{
    width:wp(60),
    height:hp(12),
    borderRadius:hp(5),
    position:"absolute",
    left:wp(20),
    top:-hp(6.5)
  }
})
