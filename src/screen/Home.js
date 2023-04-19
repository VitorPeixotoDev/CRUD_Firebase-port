import { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../config/fb";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Products from "../components/Products";


const Home = () => {
    const { navigate, setOptions } = useNavigation()
    const [ products, setProducts ] = useState([])

    useLayoutEffect(() => {
        setOptions({
            headerRight: () => <Button 
                                title='Add'
                                onPress={() => navigate('Add')}
                               />
        })
    })

    useEffect(() => {
        const collectionRef = collection(database, 'products')
        const qry = query(collectionRef, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(qry, querySnapshot => {
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name,
                    price : doc.data().price,
                    isSold: doc.data().isSold,
                    createdAt: doc.data().createdAt
                }))
            )
        })

        return unsubscribe
    }, [])
    

    return(
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
            {products.map(product => 
                <Products 
                    key={product.id}
                    {...product}
                />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F9',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
    }
})

export default Home