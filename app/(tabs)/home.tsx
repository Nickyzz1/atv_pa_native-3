import { FontDisplay } from "expo-font"
import React, { useEffect, useState } from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


interface Product {
    id: number,
    name: string,
    price: number,
    amount: number,
    image: string
}

export default function home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/product`);
            setProducts(response.data);
            console.log(response);
        } catch (error) {
            console.log('Erro ao buscar produtos: ', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const addInCart = async (id: number, name: string, price: number, amount: number) => {

        try {
            const response = await axios.post('http://127.0.0.1:5000/cart', {
                id: id,
                name: name,
                price: price,
                amount: amount
            });
            console.log('Resposta da requisição: ', response.data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    const renderItems = ({item} : {item : Product}) => {
        return (
            <Card displayIcon={true} icon={require('../../assets/images/cart.png')} functionButton={() => addInCart(item.id, item.name, item.price, item.amount)} id={item.id} title={item.name} price={item.price} image={item.image}/>
        )
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        );
    }
    
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.title}>Home</Text>
                </View>

                <View>
                    <Image source={require('@/assets/images/doces-confeitaria.jpg')} style={styles.banner} ></Image>

                    <View style={styles.box} >
                        <Text style={styles.subTitle}>Destaques</Text>

                        <FlatList style={styles.flatList} data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItems}/>

                        <Text style={styles.subTitle}>Produtos</Text>

                        <FlatList style={styles.flatList} data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItems}/>

                    </View>
                </View>


            </View>
        </>
    )
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    },

    container : {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.rosaClaro.background,
        overflow: 'scroll',
        height: height,
        width: width,
        alignItems: 'center',
        padding: 10,
        overflowX: 'hidden'
    },

    title: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.font.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: -width / 15 }],
        // flex: 1,
    },

    subTitle: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.font.background,
        marginLeft: 30,
        marginTop : 10,
    },

    header : {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 6,
    },

    logo : {
        height: width / 10,
        width: width / 10,
        alignSelf: 'flex-start', 
        marginLeft: 10,
        minWidth: 50,
        minHeight: 50,
    },

    banner : {
        height: height / 4,
        width: width / 1.1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    },

    box : {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        margin: 10,
        maxWidth: width / 1.1,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
   
})

