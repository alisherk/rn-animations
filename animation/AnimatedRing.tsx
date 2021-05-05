import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

export const AnimatedRing = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text>Animated Ring, kind of</Text> 
      <Animated.View
        style={[styles.ring, { transform: [{ scale }, { rotate }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 45,
    borderColor: "tomato",
    borderWidth: 5,
  },
});
