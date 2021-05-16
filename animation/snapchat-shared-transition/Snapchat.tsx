import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Story } from "./Model";
import StoryThumbnail from "./StoryThumbnail";

export const stories: Story[] = [
  {
    id: "2",
    source: require("../../assets/2.jpg"),
    user: "derek.russel",
    avatar: 1,
  },
  {
    id: "3",
    source: require("../../assets/3.jpg"),
    user: "alexandergarcia",
    avatar: 2,
  },
  {
    id: "1",
    source: require("../../assets/1.jpg"),
    user: "andrea.schmidt",
    avatar: 3,
  },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

const Snapchat = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {stories.map((story) => (
          <StoryThumbnail key={story.id} story={story} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Snapchat;