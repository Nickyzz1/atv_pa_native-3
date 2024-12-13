import React, { useEffect, useState } from "react"; // useState, useEffect são importados para gerenciar o estado
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function Order() {
    // estado para armazenar o usuário
    const [user, setUser] = useState<{ name: string, email: string, id: number, password : string} | null>(null);
    const [userName, setUserName] = useState('')
    const [product, setProduct] = useState('')
    const [amount, setAmount] = useState(0)
    const [details, setDetails] = useState('')

    // useEffect para pegar os dados do AsyncStorage assim que o componente for montado
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); 
                }
            } catch (error) {
                console.error('Erro ao carregar o usuário', error);
            }
        };

        loadUser(); // chama a função que carrega o usuário
    }, []); 

    // se o user não existir vai exibir carregando
    if (user === null) {
        return (

          <>
          <View style={styles.containerLoading} >
                <Text style={styles.loading}>Loading...</Text>
          </View>
          </>
        )
    }

    const sendOrder = async () => {

        const phoneNumber = '5541997744814'; 
        const message = `${userName} fez um pedido !\nProduto: ${product}\nQuantidade: ${amount}\nDetalhes: ${details}`;

        // Codifica a mensagem para ser usada na URL
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        try {
            // Tenta abrir o WhatsApp com a URL
            await Linking.openURL(url);
        } catch (error) {
            console.error('Erro ao tentar abrir o WhatsApp', error);
        }
      
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Link href={"/home"}>
                    <Image
                        source={require('@/assets/images/goBack.png')}
                        style={styles.goBack}
                    />
                </Link>
                <Text style={styles.title}>Orders</Text>
            </View>

            <View  style={styles.content}>
                <Text style={styles.detail}>Nos envie uma mesagem no whats 😊 </Text>
                <View style={styles.content} >
                    <Text style={styles.subtitle}>Produto</Text>
                    <TextInput
                  
                        style={styles.input}
                        onChange={(text) => (setProduct(text.nativeEvent.text))}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Quantidade</Text>
                     <TextInput
                    
                        style={styles.input}
                        keyboardType="numeric"
                        onChange={(e) => (setAmount(e.nativeEvent.target))}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Deatalhes</Text>
                     <TextInput
                        editable={true}
                        style={styles.inputTextArea}
                        onChange={(e) => (setDetails(e.nativeEvent.text))}
                        multiline={true}  
                    />
                </View>

                <TouchableOpacity onPress={() => sendOrder()} style={styles.btn}>
                        <Text style={styles.btnTitle}>Enviar</Text>
                        <Image source={require('@/assets/images/logoWhats.png')} width={20} height={20} alt="logo whats" style={styles.img} ></Image>
                </TouchableOpacity>

            </View>


        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.rosaClaro.background,
        alignItems: 'center',
        width: width,
        height: height
    },
    containerLoading : 
    {
        flex: 1,
        backgroundColor: Colors.rosaClaro.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 6,
        margin: 10,
        width: '100%',
    },
    goBack: {
        height: width / 20,
        width: width / 20,
        marginLeft: 10,
        minWidth: 50,
        minHeight: 50,
    },
    subtitle: {
        fontFamily: 'jua',
        fontSize: 25,
        color: Colors.rosaEscuro.background,
    },
    btnTitle: {
        fontFamily: 'jua',
        fontSize: 25,
        color: Colors.white.background,
        textAlign: 'center'
    },
    input : {
        backgroundColor: Colors.rosaRoxo.background,
        padding: 10,
        width: '80%',
        maxWidth: 600,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: Colors.rosaEscuro.background,
        borderWidth: 1,
    },
    inputTextArea : {
        backgroundColor: Colors.rosaRoxo.background,
        width: '80%',
        padding: 10,
        height: height / 5,
        maxWidth: 600,
        borderRadius: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        borderColor: Colors.rosaEscuro.background,
        borderWidth: 1.5,
    },
    btn : {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.font.background,
        width: 180,
        color: Colors.white.background,
        borderRadius: 5,
        padding: 5,
        fontFamily: 'jua',

    },
    content : {
        alignItems: 'center',
        alignSelf: 'center',
        gap: 3,
        width: '90%',
        marginTop: 20
    },
    title : {
        
        fontFamily: 'jua',
        fontSize: 35,
        color: Colors.rosaEscuro.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: - width / 9 }],
    },
    loading: {
        fontFamily: 'jua',
        fontSize: 35,
        color: Colors.rosaEscuro.background,
        textAlign: 'center',
        marginTop: 20
    },
    detail : {
        fontFamily: 'jua',
        fontSize: 15,
        color: Colors.font.background,
        textAlign: 'center',
    },
    img: {
      height: 40,
      width: 40
        
    }
});
