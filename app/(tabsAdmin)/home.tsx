import { FontDisplay } from "expo-font"
import React, { useEffect, useState } from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions, FlatList, Modal, TouchableOpacity} from 'react-native'
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
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);

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

    const toggleModal = (product: Product) => {
        setSelectedProduct(product);
        setName(product.name);
        setPrice(product.price);
        setAmount(product.amount);
        setModalVisible(!modalVisible);
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/product/${id}`);
            console.log('Resposta da requisição: ', response.data);
            fetchProducts();
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    const editProduct = async (id: number, updatedProductData: { name: string, price: number, amount: number }) => {
        try {
            if (isNaN(updatedProductData.price) || isNaN(updatedProductData.amount)) {
                alert('Por favor, insira valores válidos para preço e quantidade');
                return;
            }
            const response = await axios.put(`http://127.0.0.1:5000/product/${id}`, updatedProductData);
            console.log('Produto editado: ', response.data);
            fetchProducts();
            setModalVisible(false);
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    const handlePriceChange = (text: string) => {
        const parsedValue = parseFloat(text);
        if (!isNaN(parsedValue)) {
            setPrice(parsedValue);
        } else {
            setPrice(0);
        }
    };
    
    const handleAmountChange = (text: string) => {
        const parsedValue = parseInt(text, 10);
        if (!isNaN(parsedValue)) {
            setAmount(parsedValue);
        } else {
            setAmount(0); // Ou outro valor padrão
        }
    };

    const renderItems = ({item} : {item : Product}) => {
        return (
            <Card displayIcon={true} iconTwo={require('../../assets/images/editProduct.png')} icon={require('../../assets/images/deleteProduct.png')} functionButton={() => deleteProduct(item.id)} functionButtonTwo={() => toggleModal(item)} id={item.id} title={item.name} price={item.price} image={item.image} amount={item.amount}/>
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

                    <View style={styles.box}>
                        <View style={styles.boxTitle}>
                            <Text style={styles.subTitle}>Produtos</Text>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.text}>Novo produto</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList style={styles.flatList} data={products} keyExtractor={(item) => item.id.toString()} renderItem={renderItems}/>

                    </View>
                </View>

            {/* Modal para editar o produto */}
            <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Editar Produto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Preço"
                                keyboardType="numeric"
                                value={price.toString()}
                                onChangeText={handlePriceChange}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Quantidade"
                                keyboardType="numeric"
                                value={amount.toString()}
                                onChangeText={handleAmountChange}
                            />
                            <View style={styles.modalButtons}>
                                <Button
                                    title="Salvar"
                                    onPress={() => {
                                        if (selectedProduct) {
                                            editProduct(selectedProduct.id, { name, price, amount });
                                        }
                                    }}
                                />
                                <Button
                                    title="Cancelar"
                                    onPress={() => setModalVisible(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </>
    )
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.rosaClaro.background,
        overflowY: 'scroll',
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
    },
    subTitle: {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.font.background,
        marginTop: 10,
    },
    header: {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 6,
    },
    logo: {
        height: width / 10,
        width: width / 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    banner: {
        height: height / 4,
        width: width / 1.1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        margin: 10,
        maxWidth: width,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },

    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.font.background,
        padding: 5,
        borderRadius: 10,
        borderWidth: 0,
        textAlign:'center',
        width: 150,
        alignSelf: 'center',
        borderColor: Colors.rosaClaro.background,
        borderTopWidth: 1,
      },

    text: {
        color : Colors.white.background,
        fontFamily: 'jua',
        fontSize: 20,
    },

    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 4
    }
});