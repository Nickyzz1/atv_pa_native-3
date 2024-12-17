import React, { useEffect, useState } from "react"; // useState, useEffect são importados para gerenciar o estado
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";

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

    const updateInfo = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id, 
                    name: user.name,
                    email: user.email,
                    password: curPass,
                    newPassword: newPassword
                }),
            });

            console.log("a requisição é ", `http://127.0.0.1:5000/user/${user.id}`)
            console.log(JSON.stringify({
                id: user.id, 
                name: userName,
                email: email,
                password: curPass,
                newPassword: newPassword
            }))
    
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

    const exit = () => {
        router.push('/');
    }
    

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
                <TouchableOpacity style={styles.boxIcon} onPress={exit} >
                        <Image source={require('@/assets/images/sair.png')} style={styles.icon}></Image>
                </TouchableOpacity>
            </View>

            <View  style={styles.content}>
                <View style={styles.content} >
                    <Text style={styles.subtitle}>Nome</Text>
                    <TextInput
                        value={user?.name ?? ''}
                        editable={false}
                        style={styles.input}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Email</Text>
                     <TextInput
                        value={user?.email ?? ''}
                        editable={false}
                        style={styles.input}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Nova senha</Text>
                     <TextInput
                        editable={true}
                        style={styles.input}
                        placeholderTextColor={Colors.rosaPlace.text}
                        placeholder="Digite sua nova senha..."
                        onChange={(e) => {setNewPassword(e.nativeEvent.text)}}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Confirmar senha atual</Text>
                     <TextInput
                        editable={true}
                        style={styles.input}
                        placeholderTextColor={Colors.rosaPlace.text}
                        placeholder="Confirme sua senha ATUAL..."
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
    boxIcon: {
        backgroundColor: Colors.font.background,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '50%',
        aspectRatio: '1/1',
        padding: 8
    },
    icon: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        margin: 10,
        width: '100%',
        paddingHorizontal: 16
    },
    goBack: {
        height: width / 20,
        width: width / 20,
        // marginLeft: 10,
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
    // input : {
    //     backgroundColor: Colors.rosaClaro.background,
    //     padding: 10,
    //     width: '70%',
    //     maxWidth: 600,
    //     borderRadius: 10,
    //     marginBottom: 15,
    //     borderColor: Colors.rosaRoxo.background,
    //     borderWidth: 2,
    // },
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
        marginTop: 15,
        // backgroundColor: Colors.white.background,
        // borderRadius: 5,
        padding: 5,
        paddingBottom: 10
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
        alignSelf: 'center',
        marginTop: 20
    }
});
