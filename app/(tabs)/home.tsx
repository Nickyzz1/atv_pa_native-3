import { FontDisplay } from "expo-font"
import React, { useEffect, useState } from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router"


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
    const [productsCart, setProductsCart] = useState<Product[]>([]);


    const [screen, setScreen] = useState(true);

    const removeProduct = async (id : number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/cart/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log('Erro ao apagar produto do carrinho', error)
        } finally {
            getProductsCart();
            router.push('/(tabs)/home');
        }
    }

    const getProductsCart = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/cart`);
            setProductsCart(response.data);
            console.log(response);
        } catch (error) {
            console.log('Erro ao buscar produtos: ', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductsCart();
    }, []);

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
        getProductsCart();
    }, []);

    const toggleScreen = () => {
        setScreen(!screen);
        getProductsCart();
    }

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

    
    const sellProductsCart = async () => {
        try {
            // Fazendo a requisição com o axios, e configurando para tratar a resposta como um blob
            const response = await axios.post('http://127.0.0.1:5000/sell', {}, {
                responseType: 'blob'  // Especifica que esperamos um arquivo binário (PDF)
            });
    
            // Criar um link para download do arquivo PDF
            const blob = response.data;  // Dados binários do PDF
            const link = document.createElement('a');  // Criar um link de download
            link.href = URL.createObjectURL(blob);  // Criar uma URL temporária para o PDF
            link.download = 'nota_fiscal.pdf';  // Definir o nome do arquivo a ser baixado
            link.click();  // Simular o clique para iniciar o download
    
            console.log('PDF gerado com sucesso');
            getProductsCart();
        } catch (error) {
            console.log('Erro ao gerar a nota fiscal: ', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItems = ({item} : {item : Product}) => {
        return (
            <Card displayIcon={true} icon={require('../../assets/images/cart.png')} functionButton={() => addInCart(item.id, item.name, item.price, item.amount)} id={item.id} title={item.name} price={item.price} image={item.image}/>
        )
    }

    const renderItemsCart = ({item} : {item : Product}) => {
        return (
            <Card displayIcon={true} icon={require('../../assets/images/menos.png')} functionButton={() => removeProduct(item.id)}  id={item.id} title={item.name} price={item.price} image={item.image}/>
        )
    }

    if (loading) {
        return (
            <View style={styles.containerLoading}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );
    }
    

    if (screen == true) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.title}>Home</Text>
                    <TouchableOpacity style={styles.boxIcon} onPress={toggleScreen} >
                        <Image source={require('@/assets/images/cartHeart.png')} style={styles.icon}></Image>
                    </TouchableOpacity>
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
        )
    } else if (screen == false) {
        return (
            <>
                <View style={styles.container} >
                    
                    <View style={styles.header2}>
                        <TouchableOpacity onPress={toggleScreen} >
                            <Image source={require('@/assets/images/goBack.png')} style={styles.goBack}></Image>
                        </TouchableOpacity>
                        <Text style={styles.title2}>Carrinho</Text>
                    </View>

                    <View style={styles.content} >
                        <TouchableOpacity style={styles.btn} onPress={sellProductsCart}>
                            finalizar
                        </TouchableOpacity>

                        <FlatList style={styles.flatList} data={productsCart} keyExtractor={(item) => item.id.toString()} renderItem={renderItemsCart}/>

                    </View>
                </View>
            </>
        )
    }
    
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
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
    flatList: {
        width: '100%',
    },

    goBack : {
        height: width / 10,
        width: width / 10,
        alignSelf: 'flex-start', 
        marginLeft: 10,
        minWidth: 50,
        minHeight: 50,
    },

    boxIcon: {
        backgroundColor: Colors.font.background,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '50%',
        aspectRatio: '1/1',
        padding: 8
    },
    icon: {
        height: 32,
        width: 32,
        alignSelf: 'center'
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
        color: Colors.rosaEscuro.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: -width / 15 }],
        // flex: 1,
    },

    title2: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.rosaEscuro.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: -width / 7 }],
    },

    subTitle: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.rosaEscuro.background,
        // marginLeft: 30,
        marginTop : 10,
    },

    header : {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        paddingRight: 18
    },

    header2: {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 6,
        paddingRight: 10
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
        maxWidth: width,
        flexWrap: 'wrap',
        justifyContent: 'center'
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

