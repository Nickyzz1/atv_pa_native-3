import { FontDisplay } from "expo-font"
import React, { useEffect, useState } from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions,TouchableOpacity, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import sales from '@/constants/sales.json'
import { Link, router } from "expo-router"
import axios from "axios"

const {width, height} = Dimensions.get('window')

interface Product {
    id: number,
    name: string,
    price: number,
    amount: number,
    image: string
}

export default function cart () {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const removeProduct = async (id : number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/cart/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log('Erro ao apagar produto do carrinho', error)
        } finally {
            getProducts();
            router.push('/(tabs)/cart');
        }
    }

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/cart`);
            setProducts(response.data);
            console.log(response);
        } catch (error) {
            console.log('Erro ao buscar produtos: ', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);


    const renderItems = ({item} : {item : Product}) => {
        return (
            <Card displayIcon={true} icon={require('../../assets/images/menos.png')} functionButton={() => removeProduct(item.id)}  id={item.id} title={item.name} price={item.price} image={item.image}/>
        )
    }

    const sellProducts = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/sell`);
            setProducts(response.data);
            console.log(response);
        } catch (error) {
            console.log('Erro ao buscar produtos: ', error)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.containerLoading}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );
    }
    
    return(
        <>
        <View style={styles.container} >
            
            <View style={styles.header}>
                <Link href={"/home"} >
                    <Image
                    source={require('@/assets/images/goBack.png')}
                    style={styles.goBack}>
                    </Image>
                </Link>
                <Text style={styles.title}>Carrinho</Text>
            </View>

            <View style={styles.content} >
                <TouchableOpacity style={styles.btn} onPress={sellProducts}>
                    finalizar
                </TouchableOpacity>

                <FlatList style={styles.flatList} data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItems}/>

            </View>
        </View>

        </>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    },

    header : {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 6,
        margin: 10,
    },
    goBack : {
        height: width / 10,
        width: width / 10,
        alignSelf: 'flex-start', 
        marginLeft: 10,
        minWidth: 50,
        minHeight: 50,
    },
    title : {
        
        fontFamily: 'jua',
        fontSize: 35,
        color: Colors.rosaEscuro.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: - width / 6.5 }],
    },
    btn : {
        backgroundColor: Colors.font.background,
        width: 100,
        textAlign: 'center',
        color: Colors.white.background,
        borderRadius: 5,
        padding: 5,
        fontFamily: 'jua',
        alignSelf: 'flex-end',
        marginBottom: 4
    },
    content : {
        alignItems: 'center',
        alignSelf: 'center',
        gap: 3,
        width: '90%'
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
    loading: {
        fontFamily: 'jua',
        fontSize: 35,
        color: Colors.rosaEscuro.background,
        textAlign: 'center',
        marginTop: 20
    },
    containerLoading : 
    {
        flex: 1,
        backgroundColor: Colors.rosaClaro.background,
   
    },

})