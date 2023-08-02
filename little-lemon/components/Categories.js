import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Categories({ categories, selectedCategories, onCategorySelect }) {
  const handleCategoryPress = (category) => {
    const lowerCaseCategory = category.toLowerCase();  
    
    if (selectedCategories.includes(lowerCaseCategory)) {
      onCategorySelect(selectedCategories.filter(c => c !== lowerCaseCategory));
    } else {
      onCategorySelect([...selectedCategories, lowerCaseCategory]);
    }
  };

  return (
    <View>
      <Text style={styles.header}>ORDER FOR DELIVERY!</Text>
      <ScrollView horizontal style={styles.categories}>
        {categories.map(category => (
          <TouchableOpacity key={category} onPress={() => handleCategoryPress(category)} style={[styles.category, selectedCategories.includes(category.toLowerCase()) && styles.selectedCategory]}>
            <Text style={styles.categoryText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 0.1,
  },
  header:{
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
  },
  category: {
    padding: 10,
    backgroundColor: '#d0d0d0',
    marginRight: 10,
    borderRadius: 50,
  },
  selectedCategory: {
    backgroundColor: '#a0a0a0',
  },
  categoryText: {
    color: '#495E57',
    fontWeight: 'bold',
  },
});
