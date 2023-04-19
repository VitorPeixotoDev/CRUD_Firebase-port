import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { database } from '../config/fb'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons'


const Products = ({
    id,
    emoji,
    name,
    price,
    isSold
}) => {

    const onDelete = () => {
        const docRef = doc(database, 'products', id)
        deleteDoc(docRef)
    }

    const onEdit = () => {
        const docRef = doc(database, 'products', id)
        updateDoc(docRef, {
            isSold: true
        })
    }

    return(
        <View style={styles.productContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.emoji}>{emoji}</Text>
                <AntDesign 
                    onPress={onDelete} 
                    name='delete' 
                    size={24} 
                    color='black'   
                />
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            {isSold ? (
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'gray'}]}
                >
                    <Text style={styles.buttonText}>vendido</Text>
                </TouchableOpacity>
            ) :
            (
                <TouchableOpacity
                    style={styles.button}
                    onPress={onEdit}
            >
                    <Text style={styles.buttonText}>comprar</Text>
                </TouchableOpacity>
            )}
            
        </View>
    )
}



const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
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
    },
});

export default Products
