import { FontDisplay } from "expo-font"
import React from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
import dataTests from '@/constants/dataTests.json'

export default function cart () {
    return(
        <>
        <View style={styles.header} >
            <Image source={require('@/assets/images/goBack.png')} ></Image>
            <Text>Carrinho</Text>
        </View>

        <Button title="finalizar"></Button>

        <Card quantidade={20} price={'250'} title="lua de mel" image={require('@/assets/images/logo.png')} />

        </>
    )
}

const styles = StyleSheet.create({
    header : {
        display: 'flex'
    }
})