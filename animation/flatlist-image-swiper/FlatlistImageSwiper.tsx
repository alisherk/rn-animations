import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const image1 = require("../../images/bobcat.jpg");
const image2 = require("../../images/crane.jpg");
const image3 = require("../../images/mower.jpg");
const image4 = require("../../images/trimmer.jpg");

const { width, height } = Dimensions.get("window");

const IMAGE_SIZE = 80;
const SPACING = 10;

export const FlatlistImageSwiper = () => {
  const [images, setImages] = useState([image1, image2, image3, image4]);
  const [activeIndex, setActiveIndex] = useState<number>();
  const topRef = useRef<FlatList<any> | null>(null);
  const thumbRef = useRef<FlatList<any> | null>(null);

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({ offset: index * width, animated: true });

    //console.log(index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2)
    //Image_size / 2 is because if we are in the middle we need to deduct half of the thum to determine the middle
    // is the middle thumbmber greater then the width of the screen we need to scroll
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={(item, index) => (item + index).toString()}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          console.log("device width", width);
          console.log("x offset", e.nativeEvent.contentOffset.x);
          scrollToActiveIndex(
            Math.floor(e.nativeEvent.contentOffset.x / width)
          );
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image style={StyleSheet.absoluteFillObject} source={item} />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={(item, index) => item + index}
        horizontal
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? "gray" : "transparent",
                }}
                source={item}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
