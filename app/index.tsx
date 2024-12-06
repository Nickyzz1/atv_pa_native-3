import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput, TouchableOpacity  } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function HomeScreen() {

  const [text, setText] = useState('');

  return (
   <>
    <View style={styles.container} >

      <View style={styles.box} >
       
        <View style={styles.form} >
        <Text style={styles.label}>Email</Text>
        <TextInput
        style={styles.input2} 
        value={text} 
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
        style={styles.input} 
        value={text} 
        />

        <button style={styles.btn} >
          <Text style={styles.text} >
          Entrar
          </Text>
        </button>

        <Link href={'/register'} style={styles.text2}> Não tem uma conta?</Link>

      </View>

      <Image
            source={require('../assets/images/image.png')}  
            style={styles.image} />

      </View>
    </View>
   </>
  );
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
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
    maxHeight: height - 100
  },
  label: {
    fontFamily: 'jua' ,
    fontSize: 33,
    marginBottom: 1,
    color: Colors.font.background
  },
  input: {
    height: 40,
    // borderColor: '#ddd',
    borderWidth: 1,
    width: '40%',
    maxWidth: 500,
    marginBottom: 20,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    outlineColor: Colors.rosaClaro.background,
    backgroundColor: Colors.rosaRoxo.background,
    alignSelf: 'center',

    borderColor: Colors.marrom.background,
    borderTopWidth: 2,
    borderEndWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0
  
  },
  input2: {
    padding: 5,
    height: 40,
    maxWidth: 600,
    // borderColor: '#ddd',
    borderWidth: 1,
    width: '60%',
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
    // backgroundColor: Colors.azul.background,
    width: width - 10,
    height: height / 3.4,
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
    margin: 10,
    color: Colors.marrom.background
  },
  logo : {
    width: 100,
    height: 100
  },
});
