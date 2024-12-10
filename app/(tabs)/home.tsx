import { FontDisplay } from "expo-font"
import React from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import dataTests from '@/constants/dataTests.json'

export default function home() {
    
    const {width, height} = Dimensions.get('window')

       return (
        <>
            <View style={styles.container}>

                <View style={styles.header}>

                    <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo} >
                    </Image>
                    
                    <Text style={styles.title} >
                        Home
                    </Text>

                </View>

                <Image source={require('@/assets/images/doces-confeitaria.jpg')} style={styles.banner} ></Image>

                <View style={styles.box} >

                    <Text style={styles.subTitle} >
                        Destaques
                    </Text>

                    <FlatList
                        keyExtractor={item => item.id}
                        data={dataTests}
                        renderItem={({item}) =>{
                            return (
                                <Card title={item.nome} image={item.imagem} price={item.preco}/>
                        )}}
                    />

                    <Text style={styles.subTitle} >
                        Produtos
                    </Text>

                    {dataTests.map((product, index) => (
                        <Card title={product.nome} price={product.preco} image={product.imagem} key={index}/>
                    ))}

                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.rosaClaro.background,
        overflow:'scroll'
    },
    title: {
        fontFamily: 'jua',
        display: 'flex',
        fontSize: 30,
        color: Colors.font.background,
        alignSelf: 'center'
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    logo : {
        height: 40,
        width: 40,
        // alignSelf: 'flex-start',
        top: 0,
    },
    banner : {
        height: 170,
        width: 350,
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
        maxWidth: 700,
        flexWrap: 'wrap'
    },
   
})

