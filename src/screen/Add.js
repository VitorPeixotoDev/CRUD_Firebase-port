import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

import EmojiPicker from 'rn-emoji-keyboard'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Add = () => {
    const { goBack } = useNavigation()
    const [isOpen, setIsOpen] = useState(false)
    const [newItem, setNewItem] = useState({
        emoji: '🙂',
        name: '',
        price: 0,
        isSold: false,
        createdAt: new Date()
    })

    const regex = /^(R\$)?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/


    const onSend = async () => {
        await addDoc(collection(database, 'products'), newItem)
        goBack()
    }

    const handlePick = emojiObj => {
        setNewItem({
            ...newItem,
            emoji: emojiObj.emoji
        })
    }

    return(
        <View style={styles.contaienr}>
            <Text style={styles.title}>Anuncie um novo emoji</Text>
            <Text
                style={styles.emoji}
                onPress={() => setIsOpen(true)}
            >{newItem.emoji}</Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <TextInput
                style={styles.inputContainer}
                placeholder='nome do emoji'
                onChangeText={(text) => setNewItem({
                    ...newItem, name: text
                })}
            />

            <TextInput
                style={styles.inputContainer}
                keyboardType='number-pad'
                placeholder='preço do emoji'
                onChangeText={(text) => setNewItem({
                    ...newItem, price: text 
                })}
            />

            <TouchableOpacity
                onPress={onSend}
                style={styles.button}
            >
                <Text style={styles.buttonText}>publicar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contaienr: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: '700'
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginVertical: 6
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    }
})

export default Add