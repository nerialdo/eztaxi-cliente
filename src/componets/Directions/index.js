import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform} from 'react-native';
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
      lineCap="square"
      lineDashPattern={[0]}
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyA5E67B45xsd69Z2SKIhWuVbVlb736lWvk"
      strokeWidth={3}
      strokeColor="#222"
    />
);

export default Directions