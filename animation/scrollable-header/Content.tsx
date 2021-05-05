import * as React from "react";
import {
  StyleSheet, View, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  Album, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT,
} from "./Model";
import Track from "./Track";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Header from "./Header";

interface ContentProps {
  album: Album;
  y: Animated.Value;
}


export default ({ album: { artist, tracks }, y }: ContentProps) => {

  const height = y.interpolate({
    inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
    outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
    extrapolate: 'clamp',
  });

  const opacity = y.interpolate({
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });
  
  return (
    <Animated.ScrollView
      onScroll={Animated.event([{nativeEvent: { contentOffset: { y: y }}}], { useNativeDriver: false})}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.cover}>
        <Animated.View
          style={[styles.gradient, { height }]}
        >
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, { opacity }]}>{artist}</Animated.Text>
        </View>
      </View>
      <View style={styles.header}>
        <Header {...{ y, artist }} />
        <ShufflePlay />
      </View>
      <View style={styles.tracks}>
        {
          tracks.map((track, key) => (
            <Track
              index={key + 1}
              {...{ track, key, artist }}
            />
          ))
        }
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  cover: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  artist: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  header: {
    marginTop: -BUTTON_HEIGHT,
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});