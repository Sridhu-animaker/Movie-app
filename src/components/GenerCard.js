import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {setWidth} from '../helpers/helper';

const GenerCard = ({generName, isActive, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        backgroundColor: isActive ? Colors.active : Colors.white,
      }}
      activeOpacity={0.5}
      onPress={() => onPress(generName)}>
      <Text style={{color: isActive ? Colors.white : Colors.black}}>
        {generName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.white,
    elevation: 3,
    marginVertical: 2,
    paddingVertical: 8,
    width: setWidth(25),
    height: 35
  },
});
GenerCard.propTypes = {
  generName: PropTypes.string,
};

export default GenerCard;
