import { FontDisplay } from "expo-font"
import React from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions} from 'react-native'
import { Colors } from "@/constants/Colors"

export default function home() {
    const {width, height} = Dimensions.get('window')

       return (
        <>
        <View style={styles.container} >
            <View style={styles.header} >

                <Image source={require('@/assets/images/logo.png')} style={styles.logo} >
                </Image>

                <Text style={styles.title} >
                    Home
                </Text>

            </View>

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.rosaClaro.background
    },
    title: {
        fontFamily: 'jua',
        display: 'flex',
        fontSize: 30,
        color: Colors.font.background,
        alignSelf: 'center'
    },
    header : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    logo : {
        height: 40,
        width: 40,
        alignSelf: 'flex-start',
        position: 'fixed',
        top: 9,
        left: 9
    }
})