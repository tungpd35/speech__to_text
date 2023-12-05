import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginPhoneScreen from './screens/LoginPhoneScreen';
import Conversation from './screens/Conversation';
import Setting from './screens/SettingScreen';
import ListConversation from './screens/ListConversationScreen'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="LoginPhone"
          component={LoginPhoneScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Converstaion"
          component={Conversation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="ListConversation"
          component={ListConversation}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}