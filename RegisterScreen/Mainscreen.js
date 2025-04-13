import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Main() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />


      <View style={styles.logoContainer}>
        <Text style={styles.logo}>How Much</Text>
      </View>

      <View style={styles.boxContainer}>
        <Text style={styles.title}>Giriş Yap</Text>

        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#666"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ObjectDetectorScreen")}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("register")}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={styles.kvkcontainer}>
        <Text style={styles.kvk}>
          By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000",
  },
  boxContainer: {
    width: 280,
    height: 400,
    backgroundColor: '#808080',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
    marginTop: 10,
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
  kvk: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  kvkcontainer: {
    position: 'absolute',
    bottom: 140,
    alignItems: 'center',
    width: 250,
    height: 55,
  },
});
