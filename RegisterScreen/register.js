import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  // State'ler: Kullanıcıdan alınacak veriler
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Kayıt işlemi (şu anda sadece bir console log yazdırıyor)
 
  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("✅ Kayıt başarılı!");
        navigation.navigate('Mainscreen'); // ya da giriş ekranının ismi neyse
      } else {
        alert("❌ " + data.message);
      }
  
    } catch (error) {
      alert("❌ Sunucu hatası: " + error.message);
    }
    

  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Kullanıcı Adı Input */}
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        placeholderTextColor="#666"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Şifre Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}  // Şifreyi gizlemek için
      />

      {/* Kayıt Ol Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister} >
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#000",
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
