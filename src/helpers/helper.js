import {Dimensions} from 'react-native';
import Languages from '../constants/Languages';

const {height, width} = Dimensions.get('screen');
/**
 * Calculates the width based on a given percentage of the total width.
 * @param {number} percentage
 * @returns {number} - The calculated width.
 */
export const setWidth = percentage => (width / 100) * percentage;

/**
 * Calculates the height based on a given percentage of the total height.
 * @param {number} percentage
 * @returns {number} - The calculated height.
 */
export const setHeight = percentage => (height / 100) * percentage;

/**
 * Compares the language code and returns the language object.
 * @param {string} code
 * @returns language object
 */
export const getLanguage = code =>
  Languages.find(lan => lan.iso_639_1 === code);
