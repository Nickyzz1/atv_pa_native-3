import { FontDisplay } from "expo-font"
import React from "react"
import {View, Text, Button, TextInput, StyleSheet, Image, Dimensions,TouchableOpacity, FlatList} from 'react-native'
import { Colors } from "@/constants/Colors"
import Card from '@/components/card'
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
                <TouchableOpacity style={styles.btn}>
                    finalizar
                </TouchableOpacity>
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
        height: width / 10,
        width: width / 10,
        alignSelf: 'flex-start', 
        marginLeft: 10,
        minWidth: 50,
        minHeight: 50,
    },
    title : {
        
        fontFamily: 'jua',
        fontSize: 35,
        color: Colors.font.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: - width / 12 }],
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
        alignItems: 'center',
        alignSelf: 'center',
        gap: 3,
        width: '90%'
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

})