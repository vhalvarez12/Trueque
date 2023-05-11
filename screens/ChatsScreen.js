import { StatusBar } from 'expo-status-bar'
import { SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import {
  getAuth,
  signOut,
  collection,
  getFirestore,
  onSnapshot,auth,database} from '../firebase-cometchat/firebase'
import { useNavigation } from '@react-navigation/native'
import { darkGreen } from '../components/Constants'


const ChatsScreen=({navigation, route})=>{
  const [chats, setChats] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(database, 'chats'), (snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }),
    []
  )
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Mensajes',
      headerStyle: { backgroundColor: darkGreen },
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            width: 120,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white'
          }}
        >
          {/* <TouchableOpacity activeOpacity={0.5} onPress={()=>alert(auth.currentUser.displayName)}>
            <SimpleLineIcons name="camera" size={18} color="black" />
          </TouchableOpacity> */}
  
          

          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name="pencil" size={18} color="black" />
          </TouchableOpacity>
 */}
          {/* <TouchableOpacity activeOpacity={0.5} onPress={()=>{}}>
            <SimpleLineIcons name="logout" size={18} color="black" />
          </TouchableOpacity> */}
        </View>
      ),
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('MessagesScreen', {
      id,
      chatName,
    })
  }
  return (
    <SafeAreaView>
    <StatusBar style='dark' />
    <ScrollView style={styles.container}>
      {chats.map(({ id, chatName }) => (
        <CustomListItem
          key={id}
          id={id}
          chatName={chatName}
          enterChat={enterChat}
        />
      ))}
    </ScrollView>
  </SafeAreaView>
    
  )
  

}

export default ChatsScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})