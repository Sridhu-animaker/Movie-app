import {View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const ItemSeparator = ({height = 0, width = 0}) => {
  return <View style={{height, width}} />;
};

ItemSeparator.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default ItemSeparator;
