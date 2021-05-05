import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  findNodeHandle,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";

type ImageType = {
  [id: string]: string;
  man: string;
  women: string;
  kids: string;
  skullcandy: string;
  help: string;
};

const images: ImageType = {
  man:
    "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids:
    "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};

type Data = {
  key: string;
  title: string;
  image: string;
  ref: React.RefObject<any>;
};

const data: Data[] = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef<View>(),
}));

type IndicatorProps = {
  measures: Measure[];
  scrollX: Animated.Value;
};

const Indicator = ({ measures, scrollX }: IndicatorProps) => {
  const inputRange = data.map((_, index) => {
    return index * width;
  });

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: indicatorWidth,
        left: 0,
        backgroundColor: "white",
        bottom: -10,
        transform: [{ translateX }],
      }}
    />
  );
};

type Props = { item: Data; onItemPress?: () => void };
type Ref = View;

const Tab = React.forwardRef<Ref, Props>(({ item }, ref) => {
  return (
    <View ref={ref}>
      <Text
        style={{
          color: "white",
          fontSize: 85 / data.length,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </Text>
    </View>
  );
});

type TabProps = {
  data: Data[];
  scrollX: Animated.Value;
  onItemPress: (index: number) => void;
};

type Measure = { x: number; y: number; width: number; height: number };

const Tabs = ({ data, scrollX, onItemPress }: TabProps) => {
  const containerRef = React.useRef<View | null>(null);
  const [measures, setMeasures] = React.useState<Measure[]>([]);

  React.useEffect(() => {
    const m: Measure[] = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, []);
  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: 1,
        }}
      >
        {data.map((item, index) => (
        <TouchableOpacity onPress={() => onItemPress(index)}> 
          <Tab
            key={item.title + Math.random()}
            item={item}
            ref={item.ref}
          />
          </TouchableOpacity>
        ))}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

export function AnimatedTabs() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<FlatList<Data> | null>(null);

  const onItemPress = React.useCallback((itemIndex) => {
    ref.current?.scrollToOffset({ offset: width * itemIndex });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.image }}
                style={{ flex: 1, resizeMode: "cover" }}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
