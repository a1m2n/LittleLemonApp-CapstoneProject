import React, {useState, useEffect, useCallback} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({searchQuery, setSearchQuery}) {
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

    useEffect(() => {
        const loadImage = async () => {
        const uri = await AsyncStorage.getItem('@image');
        const firstName = await AsyncStorage.getItem('@first_name');
        const lastName = await AsyncStorage.getItem('@last_name');
        setImage(uri);
        };

        loadImage();
    }, []);

    const placeholder = firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase() || '??';

    const onChangeSearch = query => setSearchQuery(query);

    const toggleSearchBar = () => setIsSearchBarVisible(!isSearchBarVisible);

    return (
        <View style={styles.hero}>
            <Text style = {styles.header}>Little Lemon</Text>
            <Text style = {styles.subHeader}>Chicago</Text>
            <View style = {styles.infoSetion}>
                <Text style = {styles.description}>
                    We are a family owned Mediterranean restaurant,
                    focused on traditional recipes with a modern
                    twist
                </Text>
                <Image
                    source = {require('../assets/img/HeroImage.png')}
                    style = {styles.heroImage}
                />
            </View>
            <TouchableOpacity onPress={toggleSearchBar} style={styles.searchIcon}>
                <Icon name="search" size={15} color="#000" />
            </TouchableOpacity>

            {isSearchBarVisible && (
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
            )}
        </View>
    );
}



const styles = StyleSheet.create({
    hero: {
        flex: 0.3,
        padding: 20,
        backgroundColor: '#495E57',
    },
    header:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F4CE14',
    },
    subHeader:{
        fontSize: 30,
        color: '#EDEFEE',
        fontWeight: 'bold',
    },
    infoSetion:{
        flexDirection: 'row',
        width: 500,
        
    },
    heroImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    description:{
        paddingTop: 10,
        fontSize: 20,
        width: '50%',
        paddingRight: 20,
        color: '#EDEFEE',
        fontWeight: '500',
    },
    searchIcon: {
        position: 'absolute',
        left: 30,
        bottom: 15,
        backgroundColor: '#EDEFEE',
        borderRadius: 50,
        borderColor: '#EDEFEE',
        borderWidth: 8,
    },
    searchBar: {
        marginTop: 5,
        marginLeft: 40,
        width: 350,
        height: 50,

    },

    
});

