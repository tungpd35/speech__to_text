
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import React from 'react';

function Setting({navigation}) {
    return(
    <View style={style.caidat}>
   <View>
   
    <View style={style.item}>
    <TouchableOpacity
    onPress={() => navigation.navigate('ListConversation')}
    >
    <Text>Cuộc trò chuyện đã lưu</Text>
    </TouchableOpacity>
    </View>
    <TouchableOpacity
        onPress={() => navigation.navigate('AccountSetting')}
    >
        <View style={style.item}>
      <Text>Tài khoản người dùng</Text>
    </View>
    </TouchableOpacity>
    
    <View style={style.item}>
      <Text>Tốc độ dịch</Text>
    </View>
    <View style={style.item}>
      <Text>Thoát</Text>
    </View>
   </View>
    </View>
)};

export default Setting

const style = StyleSheet.create({
    caidat: {
      flex:1,
      backgroundColor:'#fff',
      justifyContent: 'center',
  
    }, 
    item: {
      paddingVertical:30,
        borderRadius:30,
        backgroundColor:'#FFCF87',
        marginBottom:30,
        alignItems:'center',
        marginLeft: 20,
        marginRight: 20
    }
  })
  