import * as React from "react";
import { StyleSheet, Animated } from "react-native";
import Constants from "expo-constants";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

interface HeaderProps {
  artist: string;
  y: Animated.Value;
}

export default ({ artist, y }: HeaderProps) => {

  const opacity = y.interpolate({
    inputRange: [0, 200, 210, 225],
    outputRange: [0, 0, 0.5, 1],
  
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Text style={[styles.title]}>{artist}</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});