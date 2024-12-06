import React from "react"
import {StyleSheet, Image, View, Text, Button, TextInput, ImageSourcePropType} from 'react-native'
import { Colors } from "@/constants/Colors"

export default function Card({title, price, image} : {title: string, price : string, image: string }) {

    return (
        <>
        <View style={styles.box} >
            <Text style={styles.text1} >{title}</Text>
            <Text style={styles.text2}>R$ {price}</Text>
            <Image source={require('@/assets/images/logo.png')} width={50} height={50}/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    box : {
        width: 350,
        height: 70,
        flexWrap: 'wrap',
        backgroundColor: Colors.azulPastel.background,
        borderRadius: 10,
        padding: 10
    },
    img: {
        width: 50,
        height: 50,
    },
    text1 : {
        fontFamily: 'jua',
        color: Colors.azul.background,
        fontSize: 15
    },
    text2 : {
        fontFamily: 'jua',
        color: Colors.azulEscuro.background,
        fontSize: 20
    }
})