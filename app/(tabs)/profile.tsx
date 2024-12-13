import React, { useEffect, useState } from "react"; // useState, useEffect são importados para gerenciar o estado
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function Profile() {
    // estado para armazenar o usuário
    const [user, setUser] = useState<{ name: string, email: string, id: number, password : string} | null>(null);
    const [curPass, setCurPass] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')

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

        loadUser(); // c5hama a função que carrega o usuário
    }, []); 

    // se o user não existir vai exibir carregando
    if (user === null) {
        return (

          <>
          {/* <View style={styles.containerLoading} > */}
                <Text style={styles.loading}>Loading...</Text>
          {/* </View> */}
          </>
        )
    }

    const updateInfo = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id,
                    name: userName,
                    email: email,
                    password: curPass,
                    newPassword: newPassword
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            
            const jsonResponse = await response.json();
            console.log('Resposta da requisição: ', jsonResponse);
    
            if (response.status === 400) {
                alert("Senha incorreta");
            } else {
                alert("Atualizado com sucesso");
            }
    
        } catch (error) {
            console.error('Erro na requisição:', error);
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
                <Text style={styles.title}>Profile</Text>
            </View>

            <View  style={styles.content}>
                <View style={styles.content} >
                    <Text style={styles.subtitle}>Nome</Text>
                    <TextInput
                        value={user?.name ?? ''}
                        editable={true}
                        style={styles.input}
                        onChange={(e) => {setUserName(e.nativeEvent.text)}}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Email</Text>
                     <TextInput
                        value={user?.email ?? ''}
                        editable={true}
                        style={styles.input}
                    
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Nova senha</Text>
                     <TextInput
                        editable={true}
                        style={styles.input}
                        onChange={(e) => {setNewPassword(e.nativeEvent.text)}}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Confirmar senha</Text>
                     <TextInput
                        editable={true}
                        style={styles.input}
                        onChange={(e) => {setCurPass(e.nativeEvent.text)}}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity onPress={() => updateInfo()} style={styles.btn}>
                        <Text style={styles.btnTitle} >Finalizar</Text>
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
        width: width,
        height: height,
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
        color: Colors.font.background,
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
        width: '70%',
        maxWidth: 600,
        borderRadius: 10,
        marginBottom: 15
    },
    btn : {
        backgroundColor: Colors.font.background,
        width: 130,
        color: Colors.white.background,
        borderRadius: 5,
        padding: 5,
        fontFamily: 'jua',
        alignSelf: 'center',
    
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
        color: Colors.font.background,
        textAlign: 'center',
        position: 'absolute',
        left: '50%', 
        transform: [{ translateX: - width / 9 }],
    },
    loading: {
        fontFamily: 'jua',
        fontSize: 35,
        color: Colors.font.background,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 20
    }
});
