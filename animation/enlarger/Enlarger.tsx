import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

interface Props {}

interface State {
  isScrollEnabled: boolean;
}

export class Enlarger extends Component<Props, State> {
  private panResponder: any;
  private scrollOffset: number = 0;
  private pan: Animated.ValueXY;
  constructor(props: Props) {
    super(props);
    this.state = {
      isScrollEnabled: false,
    };

    (this.pan = new Animated.ValueXY({ x: -208, y: HEIGHT - 150 })),
      (this.panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (e, gesture) => {
          if (
            (this.state.isScrollEnabled &&
              this.scrollOffset <= 0 &&
              gesture.dy > 0) ||
            (!this.state.isScrollEnabled && gesture.dy < 0)
          ) {
            return true;
          } else {
            return false;
          }
        },
        onPanResponderGrant: (e, gesture) => {
          this.pan.extractOffset();
        },
        onPanResponderMove: (e, gesture) => {
          this.pan.setValue({ x: 0, y: gesture.dy });
        },

        onPanResponderRelease: (e, gesture) => {
          console.log(gesture);
          if (gesture.moveY > 120) {
            Animated.spring(this.pan.y, {
              toValue: 0,
              tension: 1,
              useNativeDriver: false,
            }).start();
          } else if (gesture.moveY < 120) {
            Animated.spring(this.pan.y, {
              toValue: 0,
              tension: 1,
              useNativeDriver: false,
            }).start();
          } else if (gesture.dy < 0) {
            this.setState({ isScrollEnabled: true });
            Animated.spring(this.pan.y, {
              toValue: -HEIGHT + 120,
              tension: 1,
              useNativeDriver: false,
            }).start();
          } else if (gesture.dy > 0) {
            this.setState({ isScrollEnabled: false });
            Animated.spring(this.pan.y, {
              toValue: HEIGHT - 120,
              tension: 1,
              useNativeDriver: false,
            }).start();
          }
        },
      }));
  }

  render() {
    const animatedImageHeight = this.pan.y.interpolate({
      inputRange: [0, HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: "clamp",
    });

    const animatedSongTitleOpacity = this.pan.y.interpolate({
      inputRange: [0, HEIGHT - 500, HEIGHT - 90],
      outputRange: [0, 0.5, 1],
      extrapolate: "clamp",
    });

    const animatedImageMarginLeft = this.pan.y.interpolate({
      inputRange: [0, HEIGHT - 90],
      outputRange: [WIDTH / 2 - 100, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            { transform: this.pan.getTranslateTransform() },
            {
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: "orange",
              height: HEIGHT,
              width: WIDTH,
            },
          ]}
        >
          <Animated.View
            {...this.panResponder.panHandlers}
            style={{
              height: 80,
              borderTopWidth: 1,
              borderTopColor: "white",
              margin: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
            >
              <Animated.View
                style={{
                  height: animatedImageHeight,
                  width: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft,
                }}
              >
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  source={require("../../images/bobcat.jpg")}
                />
              </Animated.View>
              <Animated.Text
                style={{
                  opacity: animatedSongTitleOpacity,
                  fontSize: 18,
                  paddingLeft: 10,
                }}
              >
                Who let the dogs out
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                opacity: 1,
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Ionicons name="md-pause" size={32} />
              <Ionicons name="md-play" size={32} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}
