import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Text } from 'react-native';
import { spec } from './theme';
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

const { ITEM_WIDTH, SPACING } = spec;

export function TravelListDetail({ navigation, route }) {

  const { item } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name='arrowleft'
        size={24}
        color='#fff'
        style={styles.backButton}
        onPress={navigation.goBack}
      />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View style={[StyleSheet.absoluteFillObject]}>
          <Image
            source={{ uri: item.image }}
            style={[StyleSheet.absoluteFillObject]}
          />
        </View>
      </SharedElement>
      <SharedElement id={`item.${item.key}.location`}>
      <Text style={[styles.location]}> {item.location} </Text>
      </SharedElement>
    </SafeAreaView>
  );
}

/* TravelListDetail.sharedElements = (route) => {
    const { item } = route.params;
    return [
      { id: `item.${item.key}.photo`},
      { id: `item.${item.key}.location` },
    ];
  } */

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 100,
    left: SPACING * 2,
  },
  backButton: {
    paddingHorizontal: SPACING,
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 2,
  },
});
