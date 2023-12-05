import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Button, Alert } from 'react-native';
import Task from '../components/Task';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [dataConver, setDataConver] = useState([]);
  
  const alertconfirm = (v) => {
    Alert.alert(
      "Title","option",
      [
        {
          text: 'Yes',
          onPress: () => {
            console.log("ok")
            deleteItem(v)
          }
        },
        {
          text: 'No',
          onPress: () => {
            console.log("ok")
            
          }
        }
      ]
    )
  }
  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity
      onPress={onClick}          
    >
      <View
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          height: 54,
          backgroundColor: 'red',
          borderRadius: 10
        }}>
       
          
          <Text style={{color: '#fff'}}>Xóa</Text>
    
          
        
      </View>
      </TouchableOpacity>
          
    );
  };
  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = dataConver;
    a.splice(index, 1);
    console.log(a);
    setDataConver([...a]);
  };
  const renderItem = ({ item, index }, onClick) => (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onClick)}
      rightOpenValue={-100}
    >
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{item.content}</Text>
          </View>
        <View style={styles.circular}></View>
        </View>
    </Swipeable>
   
  );
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/conversation',
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        }
      }
      );
      const result = await response.json();
      setDataConver(result[0].message)

    } catch(error) {
      console.error(error);
    }
  }
  const handleAddTask =  () => {
    Keyboard.dismiss();
    const response = fetch('http://127.0.0.1:8000/conversation',
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        },
        
      }
      ).then(function(response) {
        return response.json()
      }).then(function(result) {
        console.log(result[0]) 
      })

      console.log(response)
      setTask("ok")
      console.log(task)
      setTaskItems([...taskItems, task])
     
    
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Danh sách</Text>
        
        <FlatList
        style={{paddingLeft:10, paddingRight: 10}}
        data={dataConver}
        renderItem={(v) =>
          renderItem(v, () => {
            console.log('Pressed', v);
            alertconfirm(v)
    
          })
        }
        keyExtractor={item => item.id}
        >
        <View style={styles.items}>
         
        </View>
        </FlatList>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
   
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,

  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});