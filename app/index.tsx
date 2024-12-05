import { Image, StyleSheet, Text, View, Platform, Dimensions, TextInput, TouchableOpacity  } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export default function HomeScreen() {

  const [text, setText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleChangeText = (inputText : any) => {
    setText(inputText); 
  };

  return (
   <>
    <View style={styles.container} >

      <View style={styles.box} >
       
        <View style={styles.form} >
        <Text style={styles.label}>Email</Text>
        <TextInput
        style={styles.input} 
        value={text} 
        onChangeText={handleChangeText}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
        style={styles.input} 
        value={text} 
        onChangeText={handleChangeText}
        />


        <button style={styles.btn} >
          <Text style={styles.text} >
          Entrar
          </Text>
        </button>

        <Text style={styles.text2} >Não tem uma conta?</Text>

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width * 1.8 ,
    height: 680,
    marginTop: 20,
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
    width: 250,
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
    zIndex: 10
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
    color: Colors.marrom.background
  },
  logo : {
    width: 100,
    height: 100
  },
});
