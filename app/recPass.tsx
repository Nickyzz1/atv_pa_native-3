
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Buffer } from 'buffer';

export default function RecPass() {
  const [sended, setSended] = useState(false);
  const [screen, setScreen] = useState(false);
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('');
  const [receivedCode, setReceivedCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const sendSMS = async () => {
    try {
    
      const response = await fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        body : phone,
      });
      if (response.ok) {
        setVerificationCode(await response.json()); // Armazena o código recebido para comparação
        setIsCodeSent(true);
        console.log('Código de verificação enviado!');
      }
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
    }
  };

  const verifyCode = () => {
    if (receivedCode === verificationCode) {
      console.log('Código verificado com sucesso!');
    } else {
      console.log('Código incorreto!');
    }
  };
  
  const changePass = async () => {
    
  }

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
                    <TouchableOpacity style={styles.btn} onPress={() => {setSended(!sended); sendSMS(); }}>
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
                      <TextInput secureTextEntry={true} style={styles.input} placeholder='Digite o token...' placeholderTextColor={Colors.rosaPlace.text}/>
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
                    <TextInput secureTextEntry={true} style={styles.input} placeholder='Digite sua nova senha...' placeholderTextColor={Colors.rosaPlace.text}/>
                  </View>

                  <View style={styles.inputBox}>
                  <TouchableOpacity style={styles.btn} >
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

    // <View style={styles.container}>
    //   {!sended ? (
    //     <>
    //       <TextInput
    //         style={styles.input}
    //         placeholder="Seu e-mail"
    //         value={userEmail}
    //         onChangeText={setUserEmail}
    //       />

    //       <TouchableOpacity style={styles.button} onPress={sendEmailWithSendGrid}>
    //         <Text style={styles.buttonText}>Enviar E-mail</Text>
    //       </TouchableOpacity>
    //     </>
    //   ) : (
    //     <>
    //       <TextInput
    //         style={styles.input}
    //         placeholder="Código"
    //         value={code}
    //         onChangeText={setCode}
    //       />

    //       <TouchableOpacity style={styles.button} onPress={verifyCode}>
    //         <Text style={styles.buttonText}>Validar Código</Text>
    //       </TouchableOpacity>
    //     </>
    //   )}
    // </View>
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

  logo : {
    width: 100,
    height: 100
  },

});
