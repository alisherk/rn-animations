import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import data, { detailList } from './data';
import { Transition, Transitioning } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;

const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};

type Style = {
  style?: Object;
};

const Item = ({
  children,
  style,
}: React.PropsWithChildren<Style>): JSX.Element => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export const Icon = ({ type }: { type: string }) => {
  return <View></View>;
};

const Description = ({ index, text, color }: any) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={[styles.text, color]}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({ index, text, color }: any) => {
  return (
    <Item style={styles.item}>
      <Text key={`title-${index}`} style={[styles.title, color]}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({ color, index }: any) => {
  return (
    <View style={styles.detail}>
      {detailList.map((key) => {
        return (
          <View key={key} style={styles.main}>
            <Item style={{ flex: 1, height: 26, justifyContext: 'center' }}>
              <Text
                key={`${key}-${index}`}
                style={{ fontSize: 16, color, fontWeight: '700' }}
              >
                {data[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out type='slide-bottom' durationMs={DURATION} interpolation='easeIn'>
      <Transition.Change />
      <Transition.In type='slide-bottom' durationMs={DURATION} interpolation='easeOut'  />
    </Transition.Out>
  </Transition.Together>
);

export const SpinTransition = () => {
  const [index, setIndex] = useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkBg;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkBg;

  const activeIndex = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION * 0.7,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const setActiveIndex = (newIndex: number) => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition()
    setIndex(newIndex);
  };

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const ref = useRef<any>();

  return (
    <FlingGestureHandler
      key='up'
      direction={Directions.UP}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) return;
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='down'
        direction={Directions.DOWN}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) return;
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { height: height, transform: [{ translateY }] },
            ]}
          >
            {data.map((_, i) => {
              return (
                <View
                  key={i}
                  style={{
                    height,
                    backgroundColor:
                      i % 2 === 0 ? colors.lightBg : colors.darkBg,
                  }}
                />
              );
            })}
          </Animated.View>
          <View style={[styles.imageContainer, { borderColor: color }]}>
            <Animated.Image
              source={{ uri: data[index].image }}
              style={[{
                height: 300,
                width: 300,
                left: 10,
                top: 10,
                borderRadius: 300,
              }, { transform: [ { rotate }]} ]}
            />
          </View>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{ padding: 20, flex: 1, justifyContent: 'space-evenly' }}
          >
            <Title
              color={headingColor}
              index={index}
              text={data[index].title}
            />
            <Details color={color} index={index} />
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    height: 330,
    width: 330,
    borderRadius: 300,
    overflow: 'hidden',
    position: 'absolute',
    top: 350,
    left: 200,
    borderLeftWidth: 2,
    borderRightColor: 'transparent',
    borderRightWidth: 0,
  },
  text: {
    fontSize: 16,
  },
  item: {
    height: TITLE_SIZE * 3,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: TITLE_SIZE,
    fontWeight: '900',
  },
  detail: {
    marginVertical: SPACING,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
});
