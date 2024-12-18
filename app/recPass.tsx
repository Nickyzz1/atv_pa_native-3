
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecPass() {
  const [sended, setSended] = useState(false);
  const [screen, setScreen] = useState(false);
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('');
  const [receivedCode, setReceivedCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState('')
  const [newPass, setNewPass] = useState('')

  // const sendSMS = async () => {
  //   try {
    
  //     const response = await fetch('http://localhost:3000/send-sms', {
  //       method: 'POST',
  //       body : phone,
  //     });
  //     if (response.ok) {
  //       setVerificationCode(await response.json()); // Armazena o código recebido para comparação
  //       setIsCodeSent(true);
  //       console.log('Código de verificação enviado!');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao enviar SMS:', error);
  //   }
  // };

  const updateInfo = async () => {
    const userJson = await AsyncStorage.getItem('user');

    if (!userJson) {
      console.log('Nenhum usuário encontrado no AsyncStorage');
      return;
  }

    const user = JSON.parse(userJson);

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ',user)
    try {
        const response = await fetch(`http://127.0.0.1:5000/user/recPass`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPassword: newPass,
                id: user.id
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
            router.push('/');
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
};


  const randomInt = (min : number, max : number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const sendCode = () => {
    setCode(randomInt(1000,9999).toString())
  }

  const verifyCode = () => {
    if (receivedCode === verificationCode) {
      console.log('Código verificado com sucesso!');
    } else {
      console.log('Código incorreto!');
    }
  };
  

  return (
    <>
      <View style={styles.container}>

        <Image source={require('../assets/images/confeteParaCima.png')} style={styles.confete}></Image>

        <View style={styles.box} >
        
          <View style={styles.form} >

            {!screen ? (
              <>
                {!sended ? (
                  <>
                    <View style={styles.inputBox}>
                      <Text style={styles.label}>Telefone</Text>
                      <TextInput style={styles.input} placeholder='Digite seu telefone...' value={phone} placeholderTextColor={Colors.rosaPlace.text} onChangeText={setPhone} />
                    </View>
    
                    <View style={styles.inputBox}>
                    <TouchableOpacity style={styles.btn} onPress={() => {setSended(!sended); sendCode() }}>
                      <Text style={styles.text}>Enviar Token</Text>
                    </TouchableOpacity>
    
                    <Link href={'/'} style={styles.text2}>
                      <Text>Lembrou a senha? Clique aqui!</Text>
                    </Link>
                    </View>
                  </>
                ): (
                  <>
                    <View style={styles.inputBox}>
                      <Text style={styles.label}>Token</Text>
                      <Text style={styles.text3}>Token enviado no seu SMS!</Text>
                      <TextInput value={code} style={styles.input} placeholder='Digite o token...' placeholderTextColor={Colors.rosaPlace.text}/>
                      <Text style={styles.text4}>Token preenchido automaticamente</Text>
                    </View>
    
                    <View style={styles.inputBox}>
                    <TouchableOpacity style={styles.btn} onPress={() => {setScreen(!screen);}}>
                      <Text style={styles.text}>Verificar</Text>
                    </TouchableOpacity>
    
                    <Link href={'/'} style={styles.text2}>
                      <Text>Lembrou a senha? Clique aqui!</Text>
                    </Link>
                  </View>
                  </>
                )}
              </>
            ): (
                <>
                  <View style={styles.inputBox}>
                    <Text style={styles.label}>Nova senha</Text>
                    <TextInput secureTextEntry={true} value={newPass} style={styles.input} placeholder='Digite sua nova senha...' placeholderTextColor={Colors.rosaPlace.text} onChangeText={setNewPass} />
                  </View>

                  <View style={styles.inputBox}>
                  <TouchableOpacity onPress={updateInfo} style={styles.btn} >
                    <Text style={styles.text}>Entrar</Text>
                  </TouchableOpacity>

                  <Link href={'/'} style={styles.text2}>
                    <Text>Lembrou a senha? Clique aqui!</Text>
                  </Link>
                </View>
              </>
            )}
          </View>

          <Image source={require('../assets/images/mancha2.png')} style={styles.image} />

        </View>

        <Image source={require('../assets/images/confeteParabaixo.png')} style={styles.confeteBaixo}></Image>

      </View>
    </>


  );
}


const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    width: width / 1.5,
    maxWidth: 500,
    gap: 10
  },

  confete: {
    position: 'absolute',
    opacity: 0.2,
    // zIndex: 2
  },

  confeteBaixo: {
    position: 'absolute',
    opacity: 0.2,
    bottom: 0,
    zIndex: -2
  },

  container : {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.rosaRoxo.background,
    overflow: 'hidden'
  },

  box: {
    display:'flex',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: width * 1.8 ,
    height: height / 0.95 ,
    marginTop: 20,
    maxWidth: width,
    maxHeight: height - 100,
  },

  label: {
    fontFamily: 'jua',
    fontSize: 30,
    // marginBottom: 1,
    color: Colors.rosaEscuro.background
  },

  input: {
    height: 40,
    // borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    maxWidth: 500,
    // marginBottom: 20,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    // outlineColor: Colors.rosaClaro.background,
    backgroundColor: Colors.rosaRoxo.background,
    alignSelf: 'center',

    borderColor: Colors.marrom.background,
    borderTopWidth: 2,
    borderEndWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0
  
  },

  textOutput: {
    // marginTop: 20,
    fontSize: 16,
  },

  form : {
    position:'absolute',
    zIndex: 10,
    width: width - 10,
    height: height / 3.4,
    alignItems: 'center',
    gap: 25,
    paddingTop: 25
  },

  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.font.background,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0,
    textAlign:'center',
    width: 200,
    alignSelf: 'center',
    borderColor: Colors.rosaClaro.background,
    borderTopWidth: 1,
  },

  buttonHovered : {
    shadowColor: Colors.rosaClaro.background,  
    shadowOffset: { width: 200, height: 200 },  
    shadowOpacity: 0.3,  
    shadowRadius: 4,     
    elevation: 3, 
  },

  text : {
    color : Colors.white.background,
    fontFamily: 'jua',
    fontSize: 20,
  },

  text2: {
    textAlign: 'center',
    // margin: 10,
    color: Colors.marrom.background,
    fontSize: 15,
    marginTop: 5
  },

  text3: {
    color: Colors.marrom.background,
    fontSize: 15,
    paddingLeft: 2
  },

  text4: {
    color: Colors.rosaEscuro.background,
    fontSize: 13.5,
    paddingLeft: 2
  },

  logo : {
    width: 100,
    height: 100
  },

});
