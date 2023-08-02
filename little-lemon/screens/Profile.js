import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [orderStatus, setOrderStatus] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsLetter] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    DeviceEventEmitter.emit('updateImage', result.assets[0].uri);
  };

  // Load profile data from AsyncStorage when the component mounts.
  useEffect(() => {
    const loadProfileData = async () => {
      const firstName = await AsyncStorage.getItem('@first_name');
      const email = await AsyncStorage.getItem('@email');
      const lastName = await AsyncStorage.getItem('@last_name');
      const phoneNumber = await AsyncStorage.getItem('@phone_number');
      const image = await AsyncStorage.getItem('@image');
      const orderStatus = await AsyncStorage.getItem('@orderStatus');
      const passwordChanges = await AsyncStorage.getItem('@passwordChanges');
      const specialOffers = await AsyncStorage.getItem('@specialOffers');
      const newsletter = await AsyncStorage.getItem('@newsletter');

      setFirstName(firstName || '');
      setEmail(email || '');
      setLastName(lastName || '');
      setPhoneNumber(phoneNumber || '');
      setImage(image || null);
      setOrderStatus(orderStatus === 'true');
      setPasswordChanges(passwordChanges === 'true');
      setSpecialOffers(specialOffers === 'true');
      setNewsLetter(newsletter === 'true');
    };

    loadProfileData();
}, []);


  // Handle the logout button press.
  const handleLogout = async () => {
    // Clear all data from AsyncStorage.
    await AsyncStorage.multiRemove(
        ['@first_name', 
        '@email', 
        '@last_name',
        '@phone_number', 
        '@image',
        '@orderStatus',
        '@passwordChanges',
        '@specialOffers',
        '@newsletter',
         ]);
    
    // Navigate back to the Onboarding screen.
    navigation.navigate('Onboarding');
  };


  const handleSaveChanges = async () => {
    // Save all profile data to AsyncStorage.
    await AsyncStorage.multiSet([
      ['@first_name', firstName],
      ['@email', email],
      ['@last_name', lastName],
      ['@phone_number', phoneNumber],
      ['@image', image],  // <-- Missing comma here
      ['@orderStatus', orderStatus.toString()],
      ['@passwordChanges', passwordChanges.toString()],
      ['@specialOffers', specialOffers.toString()],
      ['@newsletter', newsletter.toString()],
    ]);
  };

  const verifyPhoneNumber = (value) => {
    let phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (phonePattern.test(value)) {
      setPhoneNumber(value);
    } else {
      console.log('Invalid phone number');
    }
  };

  const placeholder = firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase() || '??';
  
  return (
    <View style={styles.container}>
      
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style = {styles.backButton}>
            <Ionicons name="arrow-back" size={25} color="white" />
          </Pressable>

          <Image source={require('../assets/img/Logo.png')} style={styles.logo} resizeMode = 'contain'/>

          <View style={styles.profileImageButton}>
              {image ? 
              (<Image source={{ uri: image }}  style={styles.image}/>) 
              : (
                <Text style={styles.text} >{placeholder}</Text>
              )} 
          </View>
        </View>

        <View style = {styles.body}>
          <Text style = {styles.pageHeader} >Personal Information</Text>
          <View>
              <Text style = {styles.avatarText}>Avatar</Text>
              <View style = {styles.avatarImage}>
                  <View style={styles.circle}>
                    {image ? 
                    (<Image source={{ uri: image }}  style={styles.image}/>) 
                    : (
                    <Text style={styles.text} >{placeholder}</Text>
                    )} 
                  </View>
                  <TouchableOpacity
                      onPress={pickImage}
                      style = {styles.change}
                  > 
                      <Text
                        style = {styles.changesText}
                      >
                          Change
                      </Text> 
                  </TouchableOpacity>
                  <TouchableOpacity
                      style = {styles.remove}
                  > 
                      <Text>
                          Remove
                      </Text> 
                  </TouchableOpacity>
              </View>
          </View>
          <View style = {styles.dataField}>
              <Text>First Name</Text>
              <TextInput
                  style = {styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First Name"
              />
          </View>
          < View style = {styles.dataField}>
              <Text>Last Name</Text>
              <TextInput
                  style = {styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last Name"
              />
          </View>
          <View style = {styles.dataField}>
              <Text>Email</Text>
              <TextInput
                  style = {styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
              />
          </View>
          <View style = {styles.dataField}>
              <Text>Phone Number:</Text>
              <TextInput
                  style = {styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone Number"
                  keyboardType="number-pad"
              />
          </View>

          <Text style = {styles.notificationsHeader}>Email Notifications </Text>
          
          <View style = {styles.notifications}>
              <Checkbox
                  style={styles.checkbox}
                  value={orderStatus}
                  onValueChange={setOrderStatus}
                  color={orderStatus ? '#4630EB' : undefined}
              />
              <Text style = {styles.notificationsText}> 
                  Order statuses
              </Text> 
          </View>

          <View style = {styles.notifications}>
              <Checkbox
                  style={styles.checkbox}
                  value={passwordChanges}
                  onValueChange={setPasswordChanges}
                  color={passwordChanges ? '#4630EB' : undefined}
              />
              <Text style = {styles.notificationsText}> 
                  Password changes
              </Text> 
          </View>

          <View style = {styles.notifications}>
              <Checkbox
                  style={styles.checkbox}
                  value={specialOffers}
                  onValueChange={setSpecialOffers}
                  color={specialOffers ? '#4630EB' : undefined}
              />
              <Text style = {styles.notificationsText}> 
                  Special offers
              </Text> 
          </View>

          <View style = {styles.notifications}>
              <Checkbox
                  style={styles.checkbox}
                  value={newsletter}
                  onValueChange={setNewsLetter}
                  color={newsletter ? '#4630EB' : undefined}
              />
              <Text style = {styles.notificationsText}> 
                  Newsletter
              </Text> 
        </View>

          <Pressable 
              onPress={handleLogout}
              style = {styles.button}
              > 
              <Text style = {styles.buttonText}> 
                  Log out
              </Text> 
          </Pressable>

          <View style = {styles.changes}>
            <TouchableOpacity
                style = {styles.discardChanges}
                > 
                <Text> 
                    Discard Changes
                </Text> 
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleSaveChanges}
                style = {styles.saveChanges}
                > 
                <Text style = {styles.changesText}> 
                    Save Changes
                </Text> 
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    jflexDirection: 'column',
    justifyContent: 'flex-start',
  },
 
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',  
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  body:{
    flex: 0.9,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  backButton: {
    width: 40,  
    height: 40,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,  
    height: 80,  
  },

  profileImageButton: {
    width: 50,  
    height: 50, 
    borderRadius: 50,  
    backgroundColor: 'lightgreen', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50, 
  },

  pageHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  
  avatarImage:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: -50,
    marginTop: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  avatarText:{
    marginTop: 20,
    marginLeft: 20,
  },
  avatarButtons:{
    margin: 20,
  },
  dataField: {
    marginLeft: 20,
    marginTop: 10,
  },
  input: { 
    height: 35, 
    marginRight:12, 
    marginTop: 6, 
    borderWidth: 1, 
    padding: 10, 
    fontSize: 16, 
    borderColor:  'EDEFEE', 
    borderRadius: 6,
  }, 
  notificationsHeader: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  notifications:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  notificationsText: {
    marginLeft: 10,
    fontSize: 16,
  }, 
  button: {
    marginVertical:20,
    marginLeft: 20,
    marginRight: 20, 
    backgroundColor: '#F4CE14',
    borderColor: '#EDEFEE',
    borderWidth: 3,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changes:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  saveChanges:{
    backgroundColor: '#495E57',
    borderColor: '#EDEFEE',
    borderWidth: 3,
    height: 40,
    borderRadius: 10,
    width: 150,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  changesText:{
    color: 'white',
  },
  discardChanges:{
    backgroundColor: 'white',
    borderColor: '#495E57',
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    width: 150,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  remove:{
    backgroundColor: 'white',
    borderColor: '#495E57',
    borderWidth: 1,
    height: 40,
    width: 100,
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 20,
  },
  change:{
    backgroundColor: '#495E57',
    borderColor: '#EDEFEE',
    borderWidth: 3,
    height: 40,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 20,
  },
  circle: {
    width: 80,  
    height: 80, 
    borderRadius: 50,  
    backgroundColor: 'lightgreen', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50, 
  },
  text: {
    textAlign: 'center',
    fontSize: 20, 
  },
});


