import { StyleSheet, Text, View, Image,TouchableOpacity,ProgressBarAndroid } from 'react-native';
import React, { useState, useRef,useEffect, Vibration } from "react";
import Voice from '@react-native-community/voice';
import { TextInput } from 'react-native-gesture-handler';
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import RNFS from 'react-native-fs';
function MainScreen({navigation}) {
  const [recordIcon, setRecordIcon] = useState(require('../assets/recordingIcon.png'));
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const fileUrl = 'file:////data/user/0/com.voice_2_text/cache/sound.mp4';
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [progress, setProgress] = useState(0);
  const downloadFile = async () => {
    const localFilePath = 'file:///data/user/0/com.voice_2_text/cache/sound.mp4';

    try {
      const destinationPath = RNFS.DownloadDirectoryPath + '/downloaded_sound.mp4';

      await RNFS.copyFile(fileUrl,destinationPath)
        
      console.log('File downloaded successfully:', destinationPath);

      // Do something with the downloaded file, for example, open it
      // Mở file hoặc xử lý nó theo nhu cầu của bạn
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  function inputchange(text) {
    setResult(text)
  }
 
  const startRecord = async () => {
    const resul = await audioRecorderPlayer.startRecorder();
    setIsRecording(true);
    console.log(resul);
  };
  const stopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    console.log(result);
  };
  const vibrateDevice = () => {
    // Kích hoạt rung thiết bị trong 1000ms (1 giây)
    Vibration.vibrate(1000);
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
    setResult(text);
  };
  const startRecording = async () => {
    try {
      await Voice.start('vi-VN')
    
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
  const recording = () => {
    if(recordIcon == require('../assets/recordingIcon.png')) {
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
    return (
        <View style={styles.talk}> 
            
        <View style={{
          alignItems:'center',
          flex:7,
          backgroundColor:'#F5F5F5',
          borderRadius:30,
        }}>
          
        <TextInput 
          value={result}  
          onChangeText={inputchange}
          style={{
          paddingTop:30,
          color:'black',
          fontSize:40,
          fontWeight:'bold',
        }}>
        
        </TextInput>
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
          flexDirection:'row',
        }}>
        <View style={{
          flex:1,
          alignItems:'center',
        }}>
        <TouchableOpacity
         onPress={() => navigation.navigate('Converstaion')}
        >
        <Image style={{
            height:70,
            width:70,
            backgroundColor:'#96E6FF',
             borderRadius:30,
          }}
          
          source={require('../assets/icons8-community-50.png')}
          />
        </TouchableOpacity>
          <Text style={{
            color:'#FDA6FF'
          }}>
            Cuộc trò chuyện
          </Text>
        </View>
          <View style={{
            flex:1,
            alignItems:'center',
          }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
            >
            <Image style={{
             height:70,
             width:70,
             backgroundColor:'#D9D9D9',
             borderRadius:30,
          }}
          source={require('../assets/icons8-setting-50.png')}
          />
            </TouchableOpacity>
          
          <Text style={{
            color:'#FDA6FF'
          }}>
            Cài đặt
          </Text>
        </View>
        </View>
        </View>
    
    );
}

export default MainScreen

const styles = StyleSheet.create({
   talk: {
    flex:1,
    backgroundColor:'#FFFF',
   }
});