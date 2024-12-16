import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput, TouchableOpacity  } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logar = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        alert('Email ou senha errados!');
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      
      const jsonResponse = await response.json()
      .then(async (data) => {
        const user = data.user;
        if (response.ok) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
          if (user.isAdmin == true) {
            router.push("/(tabsAdmin)/home");
          }
          else {
            router.push("/(tabs)/home");
          }
        }
      });
      console.log('Resposta da requisição: ', jsonResponse);

    } catch(error) {
      console.error('Erro na requisição:', error);
    }
  }
  return (
   <>

    <View style={styles.container}>

      <Image source={require('../assets/images/confeteParaCima.png')} style={styles.confete}></Image>

      <View style={styles.box} >
       
        <View style={styles.form} >

          <View style={styles.inputBox}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
          </View>
        
          <View style={styles.inputBox}>
            <Text style={styles.label}>Senha</Text>
            <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={setPassword}/>
    
              <Link href={'/recPass'} >
                <Text>Esqueceu sua senha?</Text>
              </Link>
          
          </View>


          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.btn} onPress={logar}>
              <Text style={styles.text}>Entrar</Text>
            </TouchableOpacity>

            <Link href={'/register'} style={styles.text2}>
              <Text>Não tem uma conta? Clique aqui!</Text>
            </Link>
          </View>

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
    maxWidth: 500
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
    fontSize: 33,
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
    gap: 20
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
    fontSize: 23,
  },

  text2: {
    textAlign: 'center',
    // margin: 10,
    color: Colors.marrom.background,
    fontSize: 15,
    marginTop: 5
  },

  logo : {
    width: 100,
    height: 100
  },

});
