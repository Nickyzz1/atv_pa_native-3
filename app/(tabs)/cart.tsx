import { FontDisplay } from "expo-font"
import React from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions,TouchableOpacity, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import dataTests from '@/constants/dataTests.json'
import sales from '@/constants/sends.json'


const {width, height} = Dimensions.get('window')

export default function cart () {

    const funcaoFofa = () => {

    }
    
    return(
        <>
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={require('@/assets/images/goBack.png')} style={styles.goBack}></Image>
                <Text style={styles.title}>Cart</Text>
            </View>
            <View style={styles.content} >
                <TouchableOpacity style={styles.btn}>finalizar</TouchableOpacity>
                {sales.map((sale, index)=> {
                    return(
                        <>
                        <Card functionButton={funcaoFofa} id={send.id} quantidade={send.amount} price={send.price} title={send.name} image={require('@/assets/images/logo.png')} />
                        </>
                    )
                })}
        </View>
        </View>

        </>
    )
}

const styles = StyleSheet.create({
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
        width: 40,
        height: 40,
    },
    title : {
        fontFamily: 'jua',
        fontSize: 30,
        color: Colors.font.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: -width / 15 }],
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 300,
        alignSelf: 'center',
        gap: 3,
    },
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        gap: 3,
        overflow: 'scroll',
        backgroundColor: Colors.rosaClaro.background
    },

})