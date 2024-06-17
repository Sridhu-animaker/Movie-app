import {Image, StyleSheet, Text, View} from 'react-native';
import {getPosters} from '../helpers/httpHelper';
import Colors from '../constants/Colors';

const CastCard = ({originalName, image, characterName}) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? {uri: getPosters(image)} : '../assets/images/no-image.png'}
        resizeMode={image ? 'cover' : 'contain'}
        style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>
        {originalName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  originalName: {
    width: 80,
    color: Colors.black,
    fontWeight: 600,
    fontSize: 12,
  },
  characterName: {
    width: 80,
    color: Colors.lightGrey,
    fontWeight: 600,
    fontSize: 10,
  },
});

export default CastCard;
