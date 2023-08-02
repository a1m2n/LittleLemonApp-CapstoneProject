import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Hero from '../components/Hero'
import Menu from '../components/Menu'




export default Home = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <View style = {styles.container}>
            <Header navigation={navigation} />
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <Menu searchQuery={searchQuery}/>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }

});

