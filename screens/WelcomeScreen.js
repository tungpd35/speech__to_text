import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
} from "react-native";
import { Svg ,Path,G} from "react-native-svg";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
    webClientId: '905786327990-r9vj7d7gnb3v7n7de74jsip0ef1vj7q3.apps.googleusercontent.com', // Lấy từ Google Cloud Console
    
    offlineAccess: true, // Cho phép truy cập offline
  });

function WelcomeScreen({ navigation }) {
    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo);
         navigation.navigate("MainScreen")
          // Xử lý thông tin đăng nhập ở đây
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // Người dùng hủy đăng nhập
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // Đã có một quá trình đăng nhập khác đang được thực hiện
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // Google Play Services không khả dụng hoặc cần được cập nhật
          } else {
            console.error(error);
          }
        }
    };
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setIsVisible(prevState => !prevState);
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View 
            style={
                styles.container
            }>
            <View style={{
                height: 40,
                backgroundColor: '#ffffff'
            }}/>
           
                <View
                    style={{
                        marginTop: 120,
                    }}>
                    <Image
                    source={require('../assets/icons8-robot-60.png')}
                    style={{
                        alignSelf: 'center',
                        height: 50, 
                        width: 50,
                        
                    }}/>
                    
                </View>
                
                <Text style={styles.nameapp}>
                    SPEECH2TEXT
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 25,
                    marginBottom: 100                }}>
                <Image
                    source={require('../assets/icons8-audio-wave-50.png')}
                    style={{
                        alignSelf: 'center',
                        height: 60, 
                        width: 60,
                        
                    }}/>
                    <Image
                    source={require('../assets/icons8-arrow-48.png')}
                    style={{
                        alignSelf: 'center',
                        height: 60, 
                        width: 60,
                        transform: [{ rotate: '270deg' }],
                        marginLeft: 25
                    }}/>
                     <Image
                    source={require('../assets/icons8-chat-message-50.png')}
                    style={{
                        alignSelf: 'center',
                        height: 60, 
                        width: 60,
                        marginLeft: 25
                    }}/>
                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate('LoginPhone')}
                
            > 
                <View style={styles.loginbutton}>
                    <Image 
                         source={require('../assets/mobile-phone-svgrepo-com.png')}
                         style={{
                            height: 20, 
                            width: 20,
                            marginLeft: 13
                        }}
                    />
                    
                    <Text style={{fontSize: 16, marginLeft: 18, color: '#fff'}}>
                        Đăng nhập bằng số điện thoại
                    </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={signIn}
                >
                <View style={styles.loginbutton}>
                    <Image 
                         source={require('../assets/google-icon-2048x2048-czn3g8x8.png')}
                         style={{
                            height: 20, 
                            width: 20,
                            marginLeft: 13
                        }}
                    />
                    
                    <Text style={{fontSize: 16, marginLeft: 34, color: '#fff'}}>
                        Đăng nhập bằng Google
                    </Text>
                </View>
                </TouchableOpacity>
                <View style={styles.loginbutton}>
                    <Image 
                         source={require('../assets/2023_Facebook_icon.svg.webp')}
                         style={{
                            height: 20, 
                            width: 20,
                            marginLeft: 13
                        }}
                    />
                    
                    <Text style={{fontSize: 16, marginLeft: 26, color: '#fff'}}>
                        Đăng nhập bằng Facebook
                    </Text>
                </View>
            
            
        </View>

    );
}
export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000'
    },
    button: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
    },
    loginbutton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        alignSelf: 'center',
        width: 300,
        height: 50,
        borderRadius: 30,
        marginTop: 20
    },
    nameapp: {  
        marginTop: 30,
        alignSelf: 'center',
        fontSize: 35,
        color: '#fff'
    },
    text: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#A084DC',
        fontWeight: 600,
        marginTop: 10,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#A084DC',
        marginTop: 50,
    },
    visibleText: {
        color: 'transparent',
    },
});