import { FontDisplay } from "expo-font"
import React from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import dataTests from '@/constants/dataTests.json'
import { router } from "expo-router"

export default function home() {

    const addInCart = async (id: number, name: string, price: number, amount: number) => {
        console.log('Id', id);

        try {
            const response = await fetch('http://127.0.0.1:5000/cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
                name: name,
                price: price,
                amount: amount
              }),
            });
      
            if (!response.ok) {
              alert('Erro na requisição!');
              throw new Error(`Erro na requisição: ${response.statusText}`);
            }
      
            const jsonResponse = await response.json();
            console.log('Resposta da requisição: ', jsonResponse);
            
          } catch(error) {
            console.error('Erro na requisição:', error);
          }
    }
    
       return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.title}>Home</Text>
                </View>

                <View style={styles.caixaFofa}>
                    <Image source={require('@/assets/images/doces-confeitaria.jpg')} style={styles.banner} ></Image>

                    <View style={styles.box} >
                        <Text style={styles.subTitle}>Destaques</Text>
                        {/* <FlatList
                            data={dataTests}
                            renderItem={({ item }) => {
                                return (
                                    <Card id={item.id} title={item.nome} image={item.imagem} price={item.preco} />
                                );
                            }}
                        /> */}
                        {dataTests.map((product, index) => (
                            <Card functionButton={() => addInCart(product.id, product.name, product.price, product.amount)} id={product.id} title={product.name} price={product.price} image={product.image} key={index}/>
                        ))}

                        <Text style={styles.subTitle}>Produtos</Text>

                        {dataTests.map((product, index) => (
                            <Card functionButton={() => addInCart(product.id, product.name, product.price, product.amount)} id={product.id} title={product.name} price={product.price} image={product.image} key={index}/>
                        ))}

                    </View>
                </View>


            </View>
        </>
    )
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    caixaFofa: {

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

