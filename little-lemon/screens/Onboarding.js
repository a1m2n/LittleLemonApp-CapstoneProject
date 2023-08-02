import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Button, StyleSheet, Image, Text, Pressable } from 'react-native';


const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateName = (name) => {
  const re = /^[A-Za-z]+$/;
  return re.test(name);
};

export default function Onboarding({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const isEmailValid = validateEmail(email);

  const isFormValid = isNameValid && isEmailValid && isLastNameValid;

  const onboardingCompleted = async () => {
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      await AsyncStorage.setItem('@first_name', firstName);
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@last_name', lastName);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error writing to AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image 
        style={styles.logo} 
        source={require('../assets/img/Logo.png')}
        resizeMode = 'contain' />
      </View>
      <Text style = {styles.description}>
        Let us get to know you
      </Text>
      <View style = {styles.inputSection}>
        <Text 
        style = {styles.inputText}>
            First Name
        </Text>
        <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
        />
      </View>
      <View>
        <Text
        style = {styles.inputText}>
            Last Name
        </Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        autoCapitalize="none"
      />
      </View>
      <View>
        <Text
        style = {styles.inputText}>
            Email
        </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      </View>
      <Pressable 
        style={[
            { backgroundColor: isFormValid ? '#F4CE14' : 'gray' },
            styles.button,
        ]}
        disabled={!isFormValid} 
        onPress={onboardingCompleted}> 
        <Text style={styles.buttonText}> 
            Next
        </Text> 
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    logo:{
        width: 300, 
        height: 200, 
        borderRadius: 10,
    },

    input: { 
        height: 40, 
        width: 350,
        margin: 20, 
        borderWidth: 1, 
        padding: 10, 
        fontSize: 16, 
        borderColor:  'EDEFEE', 
    }, 
    button: {
        padding: 5,
        marginTop: 100,
        marginLeft: 200,
        borderColor: '#EDEFEE',
        borderWidth: 2, 
        borderRadius: 12,
        width: 100,
    },
    buttonText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 24,
    },
    description: {
        fontSize: 30,
        alignSelf: 'center',
    },
    inputText:{
        fontSize: 25,
        alignSelf: 'center',
    },
    inputSection: {
        marginTop: 80,
    }
  
});
