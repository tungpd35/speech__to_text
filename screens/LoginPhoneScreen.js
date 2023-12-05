import React, { useState, useRef } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

function LoginPhoneScreen({ navigation }) {
    const [inputValue, setInputValue] = useState(' ');
    const [invalid,setInvalid] = useState(false)
    const [message, setMessage] = useState('Chúng tôi sẽ gửi cho bạn mã qua SMS để xác nhận số điện thoại.')
    const continuebutton = useRef(null)
    const styleMess = {
        color: invalid ? 'red' : '#fff'      
    }
    function continuePage() {
        if(inputValue.length < 10) {
            setMessage("Số điện thoại không hợp lệ!")
            setInvalid(true)
        }
    }
    function inputchange(text) {
        setInputValue(text)
        setMessage('Chúng tôi sẽ gửi cho bạn mã qua SMS để xác nhận số điện thoại.')
        setInvalid(false)
        if(text.length == 0) {
            continuebutton.current.setNativeProps({style:{backgroundColor: '#C0C0C0'}})
            console.log(continuebutton)
        }
        else {
            continuebutton.current.setNativeProps({ style: { backgroundColor: '#fff' } });
        }
    }
        return (
            
            <View style={styles.container}>
                <Text style={{color: '#fff', fontSize: 24, marginTop: 20, marginLeft: 20}}>
                    Nhập số điện thoại
                </Text>
                <View style={styles.formInput}>
                    <Text style={{color: '#C0C0C0', fontSize: 18, marginLeft: 14, color:'#fff'}}>+84</Text>
                    <TextInput style={styles.input}
                        placeholder="Số điện thoại"
                        value={inputValue}
                        placeholderTextColor= '#ffff'
                        onChangeText={inputchange}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{marginLeft: 20, marginTop: 10}}>
                    <Text style={styleMess}>
                    {message}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={continuePage}
                >
                <View ref={continuebutton} style={styles.continuebtn}>
                    <Text style={{color: 'black'}}>Tiếp</Text>
                </View>
                </TouchableOpacity>
                
            </View>
            
    );
}
export default LoginPhoneScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000'
    },
    formInput: {
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#C0C0C0',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 2
    },
    input: {
    marginLeft: 20,
    backgroundColor: '#C0C0C0',
    borderLeftWidth: 0.5,
    borderColor: '#ffff',
    padding: 10,
    color: '#FFF'
   },
   continuebtn: {
    alignSelf: 'center',
    justifyContent:'center',
    alignItems: 'center',
    width: 75, 
    height: 35, 
    backgroundColor: '#C0C0C0',
    borderRadius: 30
   },
});