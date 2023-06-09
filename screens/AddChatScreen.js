import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { collection, addDoc,database } from '../firebase-cometchat/firebase'

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState('')

  const createChat = async () => {
    await addDoc(collection(database, 'chats'), {
      chatName: chat,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    })
  }, [navigation])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chat}
        onChangeText={(text) => setChat(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" size={18} type="antdesign" color="black" />
        }
      />
      <Button disabled={!chat} onPress={createChat} title="Create New Chat" />
    </KeyboardAvoidingView>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
})