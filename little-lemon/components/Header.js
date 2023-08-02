import React, {useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';

export default Header = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const loadImage = async () => {
        let imageFromStorage = await AsyncStorage.getItem('@image');
        let firstNameFromStorage = await AsyncStorage.getItem('@first_name');
        let lastNameFromStorage = await AsyncStorage.getItem('@last_name');
   
        setImage(imageFromStorage);
        setFirstName(firstNameFromStorage);
        setLastName(lastNameFromStorage);
        };

        loadImage();

               

    }, []);

    const placeholder = firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase() || '??';

    return (
        <View style={styles.header}>
            <Image 
                source={require('../assets/img/Logo.png')} 
                style={styles.logo}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}  style={styles.avatar}>
              {image ? 
              (<Image source={{ uri: image }}  style={styles.Image}/>) 
              : (
                <Text style={styles.text} >{placeholder}</Text>
              )} 
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        flexDirection: 'row', 
        alignItems: 'center',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 70,
        resizeMode: 'contain',
        marginLeft:'auto',
    },
    avatar: {
        width: 50,  
        height: 50, 
        borderRadius: 50,  
        backgroundColor: 'lightgreen', 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 'auto'
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 50, 
    },
    text: {
        textAlign: 'center',
        fontSize: 20, 
    },
});
