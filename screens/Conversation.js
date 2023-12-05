import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import Voice from '@react-native-community/voice';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
function Conversation({navigation}) {
  const [recordIcon, setRecordIcon] = useState(require('../assets/recordingIcon.png'));
  const [messages, setMessages] = useState(["Bắt đầu"]);
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/conversation',
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        },
        
      }
      );
      const result = await response.json();
      console.log(result)
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    setMessages(prevMessages => [text,...prevMessages]);
  };
  const startRecording = async () => {
    try {
      await Voice.start('vi-VN');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();

    } catch (error) {
      console.log('error', error);
    }
  };
  function recording() {
    if(recordIcon == require('../assets/recordingIcon.png')) {
      console.log("ok")
      setRecordIcon(require('../assets/voiceLoading.gif'))
      
      startRecording()
    } else {
      setRecordIcon(require('../assets/recordingIcon.png'))
      stopRecording()
    }
  }
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
    return(
        <View style={style.cuoctrochuyen}>
         
          <View style={style.topbar}>
            
            <View style={{flex: 10/3, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
             onPress={() => navigation.goBack()}
            >
              <Image style={{
            height:30,
            width:30,
            
            }}
            
            source={require('../assets/arrow-ios-back-svgrepo-com.png')}
            />
            <Text style={{color: 'black'}}>
              Trang chủ
            </Text>
            </TouchableOpacity>
            </View>
           
            
            <View style={{flex: 10/3, flexDirection: 'row', justifyContent:'center'}}>
            <Text style={{color: 'black'}}>Cuộc trò chuyện</Text>
            </View>
            <View style={{flex: 10/3, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity

             onPress={() => navigation.navigate("Setting")}
            >
            <Text style={{color: 'black', marginRight:10}}>Cài đặt</Text>
            </TouchableOpacity>
            </View>
            
          

        </View>
        <View style={style.content}>
          <ScrollView
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}
          >
            <View style={style.contentmess}>
            {messages.map((message, index) => (
          <Text key={index} style={style.mess}>{message}</Text>
        ))}
            </View>
           
          </ScrollView>
        </View>
      <TouchableOpacity
          onPress={recording}
        >
        <View style={{
         
          alignItems:'center',
        
        }}>
          
          <Image style={{
            height:90,
            width:90,
            
          }}
          source={recordIcon}
          />
        </View>
        </TouchableOpacity>
         <View style={{
           flex:2,
           width: '100%',
           flexDirection:'row',
           justifyContent: 'space-between'
         }}>
          <View style={{
             flex:1,
             alignItems:'center',
           }}>
          <TouchableOpacity
          
          onPress={() =>
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Thành công',
                textBody: 'Lưu thành công',
                button: 'Đóng',
              })
          }
        >
        <View style={{
             flex:1,
             alignItems:'center',
           }}>
           <Image style={{
                height:70,
                width:70,
                backgroundColor:'#FFF500',
                borderRadius:50,
           }}
           source={require('../assets/icons8-add-bookmark-50.png')}
           />
           <Text style={style.color}
           >
            Lưu
           </Text>
           </View>

         </TouchableOpacity>

          </View>
           
          
           <View style={{
             flex:1,
             alignItems:'center',
           }}>
           <Image style={{
                height:70,
                width:70,
                backgroundColor:'#FF0000',
                borderRadius:50,
           }}
           source={require('../assets/icons8-remove-bookmark-50.png')}
           />
           <Text style={style.color}
           >
             Bỏ lưu
           </Text>
           </View>
         </View>
         
  <View>
    
    
  
  </View>
  <AlertNotificationRoot >
            </AlertNotificationRoot>
</View>

    );
}
export default Conversation
const style = StyleSheet.create({
  topbar: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems:'center'
  },
  cuoctrochuyen: {
    flex:1,
    backgroundColor:'#ffff',
    
  }, 
  content: {
    height: '70%',
    borderRadius:0,
    backgroundColor:'#F5F5F5',
  },
  contentmess: {
    flex: 1,
    borderRadius:0,
    backgroundColor:'#F5F5F5',
    alignItems: 'flex-end',
    flexDirection: 'column-reverse'
  },
  mess: {
    backgroundColor: '#0084ff',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    maxWidth: '70%',
    marginRight: 10
  },
  color: {
    color:'black',
  },
  Image: {
    height:70,
    width:70,
    backgroundColor:'#FFF500',
    borderRadius:50,
  }
}) 