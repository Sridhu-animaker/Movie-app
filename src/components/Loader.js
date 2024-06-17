import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {setHeight, setWidth} from '../helpers/helper';

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: setHeight(100),
    width: setWidth(100),
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;
