import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

interface ProgressProps {
  steps: number;
  step: number;
  height: number;
}

const Progress = ({ steps, step, height }: ProgressProps) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [reactive]);

  useEffect(() => {
    reactive.setValue((width * step) / steps + -width);
  }, [step, width]);

  return (
    <>
      <Text style={{ fontSize: 12, fontWeight: '900', marginBottom: 5 }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          borderRadius: height,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            height,
            borderRadius: height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transform: [{ translateX: animatedValue }],
          }}
        />
      </View>
    </>
  );
};

export const AnimatedProgressBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Progress step={index} steps={10} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});
