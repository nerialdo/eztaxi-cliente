import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text, Dimensions, Platform} from 'react-native';
import {
  IconButton,
  Icon
} from "native-base";
import {AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons"

const Search = ({ onLocationSelected, yourLocation }) => {

    const [searchFocused, setSearchFocused] = useState(false)

    const GOOGLE_PLACES_API_KEY = 'AIzaSyA5E67B45xsd69Z2SKIhWuVbVlb736lWvk';

    // const onLocationSelected = (data, details) => {
    //     console.log('onLocationSelected', data, details)
    // }
    return (
      <View style={styles.container}>
        <View style={styles.location}>
          <Icon as={Ionicons} size={21} name="location" />
          <Text numberOfLines={1}>{yourLocation}</Text>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Para onde?"
          placeholderTextColor="#333"
          onPress={onLocationSelected}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "pt"
          }}
          textInputProps={{
            onFocus: () => {
              setSearchFocused(true);
            },
            onBlur: () => {
              setSearchFocused(false)
            },
            autoCapitalize: "none",
            autoCorrect: false
          }}
          listViewDisplayed
          fetchDetails
          enablePoweredByContainer={false}
          styles={{
            // 
            textInputContainer: {
              flex: 1,
              backgroundColor: "transparent",
              height: 54,
              marginHorizontal: 20,
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              height: 54,
              margin: 0,
              borderRadius: 0,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { x: 0, y: 0 },
              // shadowRadius: 15,
              borderWidth: 1,
              borderColor: "#DDD",
              fontSize: 18
            },
            listView: {
              borderWidth: 1,
              borderColor: "#DDD",
              backgroundColor: "#FFF",
              marginHorizontal: 20,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { x: 0, y: 0 },
              // shadowRadius: 15,
              marginTop: 10
            },
            description: {
              fontSize: 16
            },
            row: {
              padding: 20,
              height: 58
            }
          }}
        />
      </View>
    )
}
export default Search

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.select({ ios: 100, android: 80 }),
    width: "100%"
  },
  location:{
    marginHorizontal: 20,
    paddingBottom: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  }
})