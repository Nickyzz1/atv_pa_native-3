import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput, TouchableOpacity  } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Link, router } from 'expo-router';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      console.log('Nome: ', name);
      console.log('Email: ', email);
      console.log('Password: ', password);
      const response = await fetch('http://127.0.0.1:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        alert('Erro na requisição!');
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const jsonResponse = await response.json();
      console.log('Resposta da requisição: ', jsonResponse);
      
      if (response.ok) {
        router.push("/");
      }
    } catch(error) {
      console.error('Erro na requisição:', error);
    }
  }

  return (
   <>
    <View style={styles.container} >
    <Image source={require('../assets/images/confeteParaCima.png')} style={styles.confete}></Image>


      <View style={styles.box} >
       
        <View style={styles.form} >

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName}/>

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail}/>

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword}/>

        <TouchableOpacity style={styles.btn} onPress={register}>
          <Text style={styles.text}>Cadastrar</Text>
        </TouchableOpacity>

        <Link href={'/'} style={styles.text2}>
          <Text>Já tem uma conta? Clique aqui!</Text>
        </Link>

        </View>

      <Image source={require('../assets/images/image.png')} style={styles.image} />

      </View>
      <Image source={require('../assets/images/confeteParabaixo.png')} style={styles.confeteBaixo}></Image>

    </View>
   </>
  );
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width * 1.8 ,
    height: height / 0.95 ,
    marginTop: 20,
    maxWidth: width,
    maxHeight: height - 30
  },
  label: {
    fontFamily: 'jua' ,
    fontSize: 33,
    marginBottom: 1,
    color: Colors.font.background
  },
  input: {
    height: 40,
    padding: 4,
    // borderColor: '#ddd',
    borderWidth: 1,
    width: '60%',
    maxWidth: 500,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    outlineColor: Colors.rosaClaro.background,
    backgroundColor: Colors.rosaRoxo.background,

    borderColor: Colors.marrom.background,
    borderTopWidth: 2,
    borderEndWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0
  
  },
  textOutput: {
    marginTop: 20,
    fontSize: 16,
  },
  form : {
    position:'absolute',
    zIndex: 10,
    width: width - 10,
    // height: height / 2.1,
    alignItems: 'center',
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
    borderTopWidth: 1
  },
  buttonHovered : {
    shadowColor: Colors.rosaClaro.background,  
    shadowOffset: { width: 2, height: 2 },  
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
    margin: 10,
    color: Colors.marrom.background,
    fontSize: 15
  },
  logo : {
    width: 100,
    height: 100
  },
});
