import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { COLORS } from '../components/ProfileBody';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { auth, database } from '../firebase-cometchat/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import colors from '../components/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';

export default function MessagesScreen({route}) {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState('')
  const {nameP}=route.params;

  const createChat = async () => {
    await addDoc(collection(database, 'chats'), {
      chatName: nameP,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message))
  }
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 10
          }}
          onPress={createChat}
        >
          <Text>{route.params.nameP}</Text>
          
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={()=>{}}
        >
          <Text>{route.params.nameP}</Text>
          
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  useLayoutEffect(() => {

    const collectionRef = collection(database, `chats/${route.params.id}`,'messages');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
    return unsubscribe;
  }, [route]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, `chats/${route.params.id}`,'messages'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);
  return (
    
    <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          placeholder={'Escribe un mensaje...'}
          


          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          
          user={{
            _id: auth?.currentUser?.email,
            displayName:auth.currentUser.displayName,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
  );
}