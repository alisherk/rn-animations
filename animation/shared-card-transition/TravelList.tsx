import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import data from './locations';
import { spec, width } from './theme';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = spec;

export function TravelList({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={FULL_SIZE}
        decelerationRate='fast'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.push('Detail', { item })}
            >
              <SharedElement
                id={`item.${item.key}.photo`}
                style={[StyleSheet.absoluteFillObject]}
              >
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { overflow: 'hidden', borderRadius: RADIUS },
                  ]}
                >
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        resizeMode: 'cover',
                        transform: [{ scale }],
                      },
                    ]}
                  />
                </View>
              </SharedElement>
              <SharedElement id={`item.${item.key}.location`}>
                <Animated.Text
                  style={[styles.location, { transform: [{ translateX }] }]}
                >
                  {item.location}
                </Animated.Text>
              </SharedElement>
              <View style={styles.days}>
                <Text style={styles.daysValue}> {item.numberOfDays} </Text>
                <Text style={styles.daysLabel}> days </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysValue: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 18,
  },
  daysLabel: {
    color: '#fff',
    fontSize: 10,
  },
});
