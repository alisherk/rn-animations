import * as React from 'react';
import { Image, View, Animated, Dimensions, StyleSheet } from 'react-native';

const images = [
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
  title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
  description: [
    'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: '29.99£',
};

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR = DOT_SIZE + DOT_SPACING;

export const VerticalCarousel = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        snapToInterval={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
        decelerationRate='fast'
        data={images}
        renderItem={({ item }) => {
          return (
            <View>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          );
        }}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => {
          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
              key={index}
            />
          );
        })}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate(
                    {
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR],
                    }
                  ),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    top: 100,
    left: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: '#333',
    marginBottom: DOT_SPACING,
    opacity: 0.5,
  },
  indicator: {
    width: DOT_INDICATOR,
    height: DOT_INDICATOR,
    borderRadius: DOT_INDICATOR,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});
