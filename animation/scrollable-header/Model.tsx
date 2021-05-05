import { Dimensions } from "react-native";
import Constants from "expo-constants";

const { height } = Dimensions.get("window");
const delta = (1 + Math.sqrt(5)) / 2;

export const MIN_HEADER_HEIGHT = 64 + Constants.statusBarHeight;
export const MAX_HEADER_HEIGHT = height * (1 - 1 / delta);
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

console.log('delta', delta)
console.log('max header height', MAX_HEADER_HEIGHT)
console.log('header delta', HEADER_DELTA)

export interface Track {
  name: string;
  artist?: string;
}

export interface Album {
  name: string;
  artist: string;
  release: number;
  cover: number;
  tracks: Track[];
}