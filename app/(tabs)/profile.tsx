import React, { useEffect, useState } from "react"; // useState, useEffect são importados para gerenciar o estado
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function Profile() {
    // estado para armazenar o usuário
    const [user, setUser] = useState<{ name: string, email: string} | null>(null);

    // useEffect para pegar os dados do AsyncStorage assim que o componente for montado
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); // Atualiza o estado com os dados do usuário
                }
            } catch (error) {
                console.error('Erro ao carregar o usuário do AsyncStorage:', error);
            }
        };

        loadUser(); // c5hama a função que carrega o usuário
    }, []); 

    // se o user não existir vai exibir carregando
    if (user === null) {
        return <Text>Carregando...</Text>;
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
            </View>

            <View  style={styles.content}>
                <View style={styles.content} >
                    <Text style={styles.subtitle}>Nome</Text>
                    <TextInput
                        value={user?.name ?? ''}
                        editable={true}
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
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Confirmar senha</Text>
                     <TextInput
                        editable={true}
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.btn}>
                        Finalizar
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
        width: 100,
        textAlign: 'center',
        color: Colors.white.background,
        borderRadius: 5,
        padding: 5,
        fontFamily: 'jua',
        alignSelf: 'center',
        marginBottom: 4
    
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
});
