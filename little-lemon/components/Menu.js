import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { setupDatabaseAsync, insertItems, getItems, getFilteredMenuItems, getFilteredMenuItemsByName } from '../db';
import Categories from '../components/Categories';


export default function Menu({searchQuery, setSearchQuery}) {
    const [fullMenu, setFullMenu] = useState([]);
    const [menu, setMenu] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    useEffect(() => {
      fetchAndStoreMenu();
    }, []);
  
    useEffect(() => {
      updateMenu();
    }, [selectedCategories, searchQuery]);
  
    const fetchAndStoreMenu = async () => {
      await setupDatabaseAsync();
      let dbMenu = await getItems();
    
      if (dbMenu.length === 0) {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        dbMenu = data.menu;
        await insertItems(dbMenu);
      }
  
      setFullMenu(dbMenu);
      setMenu(dbMenu);
    };
  
    const updateMenu = async () => {
        let updatedMenu = [...fullMenu];
        
        if (selectedCategories.length > 0) {
          updatedMenu = await getFilteredMenuItems(selectedCategories, updatedMenu);
        }
      
        if (searchQuery.length > 0) {
          updatedMenu = await getFilteredMenuItemsByName(searchQuery, selectedCategories);
        }
      
        setMenu(updatedMenu);
    };
      
  

  const renderMenuItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemSetion}>
        <View style={styles.itemWrapper}>
            <Text style={styles.itemDescription} numberOfLines={2} >{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <Image
            source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
            style={styles.itemImage}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Categories
        categories={['Starters', 'Mains','Desserts','Drinks', 'Specials','Greek', 'Italian', 'Mexican', 'Indian', 'Thai']}
        selectedCategories={selectedCategories}
        onCategorySelect={(categories) => setSelectedCategories(categories)}
      />
      <View style={styles.separator}/>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.name}
        renderItem={renderMenuItem}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
  },
  itemSetion:{
    flexDirection: 'row',
    width: 480,
    
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemWrapper:{
    width: '60%',
  },
  itemDescription: {
    fontSize: 18,
    marginVertical: 10,
    color: '#495E57',
  },
  itemPrice: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#495E57',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000", 
  },
});
