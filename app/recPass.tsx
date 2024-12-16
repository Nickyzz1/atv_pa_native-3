import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RecPass() {
  const [userEmail, setUserEmail] = useState('');
  const [sended, setSended] = useState(false);
  const [code, setCode] = useState('');
  const [correctCode, setCorrectCode] = useState('');

  const sendEmailWithSendGrid = async () => {
    if (!userEmail) {
      alert('Por favor, forneça um e-mail válido');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSended(true);
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Erro ao enviar e-mail');
    }
  };
  

  const verifyCode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          correct_code: correctCode,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Erro na verificação do código');
    }
  };

  return (
    <View style={styles.container}>
      {!sended ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            value={userEmail}
            onChangeText={setUserEmail}
          />

          <TouchableOpacity style={styles.button} onPress={sendEmailWithSendGrid}>
            <Text style={styles.buttonText}>Enviar E-mail</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={code}
            onChangeText={setCode}
          />

          <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Validar Código</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
