import React from "react"
import {StyleSheet, Image, View, Text, Button, TextInput, ImageSourcePropType, TouchableOpacity, Dimensions} from 'react-native'
import { Colors } from "@/constants/Colors"

type CardProps = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantidade?: number;
    functionButton: () => void;
  };

export default function Card({ id, title, price, image, quantidade, functionButton: handleFunction } : CardProps) {

    return (
        <>
            <View style={styles.box} >

                <View style={styles.textContainer}>
                    <Image source={require('@/assets/images/logo.png')} width={10} height={10} style={styles.img} />
                
                    <View style={styles.namePrice}>
                        <Text style={styles.text1} >{title}</Text>

                        {quantidade ? (
                            <Text style={styles.text2}>Quantidade {quantidade}</Text>
                        ) : null}
                            <Text style={styles.text2}>R$ {price}</Text>

                    </View>

                </View>

                {!quantidade ? (
                    <TouchableOpacity onPress={handleFunction}>
                        <Image source={require('@/assets/images/cart.png')} width={10} height={10} style={styles.cart} />
                    </TouchableOpacity>
                ) : null}

            </View>
        </>
    )
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },

    namePrice: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    },

    box : {
        maxWidth: width,
        width: '95%',
        height: 80,
        gap: 12,
        backgroundColor: Colors.azulPastel.background,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 15,
        margin: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    img: {
        width: 50,
        height: 50,
    },

    text1 : {
        fontFamily: 'jua',
        color: Colors.azul.background,
        fontSize: 18
    },

    text2 : {
        fontFamily: 'jua',
        color: Colors.azulEscuro.background,
        fontSize: 20
    },

    cart : {
        width: 40,
        height: 40,
    }
})