import React from "react"
import {StyleSheet, Image, View, Text, Button, TextInput, ImageSourcePropType} from 'react-native'
import { Colors } from "@/constants/Colors"

export default function Card({title, price, image} : {title: string, price : string, image: string }) {

    return (
        <>
        <View style={styles.box} >
            <Image source={require('@/assets/images/logo.png')} width={10} height={10} style={styles.img} />
            <View>
                <Text style={styles.text1} >{title}</Text>
                <Text style={styles.text2}>R$ {price}</Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    box : {
        width: 350,
        height: 80,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        backgroundColor: Colors.azulPastel.background,
        borderRadius: 10,
        padding: 10,
        margin: 4,
        alignItems: 'flex-start'
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