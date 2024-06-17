import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import {getPosters} from '../helpers/httpHelper';
import {getLanguage} from '../helpers/helper';

const MovieCard = ({
  title,
  language,
  voteAvg,
  voteCount,
  poster,
  size = 1,
  showHeart = true,
  onPress,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [voteCountVal, setVoteCountVal] = useState(voteCount);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{...styles.container, width: 230 * size, height: 340 * size}}
        imageStyle={styles.poster}
        source={{uri: getPosters(poster)}}>
        <View style={{...styles.imdb, paddingVertical: 3 * size}}>
          <Image
            source={require('../assets/images/imdb.png')}
            resizeMethod="cover"
            style={{height: 20 * size, width: 50 * size}}
          />
          <Text
            style={{
              ...styles.rating,
              marginRight: 5 * size,
              fontSize: 12 * size,
            }}>
            {voteAvg ? voteAvg.toFixed(1) : null}
          </Text>
        </View>
        {showHeart && (
          <TouchableNativeFeedback
            onPress={() => {
              setIsLiked(!isLiked);
              setVoteCountVal(isLiked ? voteCountVal - 1 : voteCountVal + 1);
            }}>
            <Icon
              name={`heart${isLiked ? '' : '-o'}`}
              size={18 * size}
              color={isLiked ? Colors.heart : Colors.white}
              style={styles.likeIcon}
            />
          </TouchableNativeFeedback>
        )}
      </ImageBackground>
      <Text style={{...styles.title, width: 230 * size}} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.subContainer}>
        <Text>{getLanguage(language).english_name}</Text>
        <View style={styles.iconWrapper}>
          <Icon
            name="heart"
            size={18 * size}
            color={Colors.heart}
            style={{marginRight: 5}}
          />
          <Text>{voteCountVal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.active,
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  poster: {
    borderRadius: 12,
  },
  imdb: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.yellow,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  rating: {
    color: Colors.heart,
    fontSize: 12,
    marginRight: 5,
    fontWeight: 800,
  },
  title: {
    fontFamily: 'poppins',
    fontWeight: 600,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '600',
    color: Colors.lightGrey,
  },
  likeIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

MovieCard.propTypes = {
  title: PropTypes.string,
  language: PropTypes.string,
  voteAvg: PropTypes.number,
  voteCount: PropTypes.number,
  poster: PropTypes.string,
  size: PropTypes.number,
  showHeart: PropTypes.bool,
  onPress: PropTypes.func,
};

export default MovieCard;
