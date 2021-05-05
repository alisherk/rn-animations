import * as React from "react";
import {
  Image, StyleSheet, Animated
} from "react-native";

import { Album, MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

interface CoverProps {
  album: Album;
  y: Animated.Value;
}

export default ({ album: { cover }, y }: CoverProps) => {
  

    // y axis in react native works 
    //-300 -100 0 +200 +300  from up to down
   // header height is 340 
   // as y axis at -340, we get the scale value of 4 which increases the view and image inside it 
   // at the start the y axis is 0 so scale remains at 1 
   // as we scroll back, y axis gets positive values increases 
   // as we reach 0 the original position of y axis, our scale goes back to 1
   const scale = y.interpolate( {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: 'clamp'
  });


  //y axis gets positive values increasing so opacity goes to 0 to 340 pixels
  //in which cases it gets full opacity 
  //as we we go down it becomes 0 past -64
  const opacity = y.interpolate({
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  });
  
  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});