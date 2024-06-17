import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getMovieById, getPosters, getVideo} from '../helpers/httpHelper';
import Colors from '../constants/Colors';
import {getLanguage, setHeight, setWidth} from '../helpers/helper';
import ItemSeparator from '../components/ItemSeparator';
import MovieCard from '../components/MovieCard';
import {APPEND_TO_RESPONSE} from '../constants/config';
import CastCard from '../components/CastCard';

const {VIDEOS, CREDITS, RECOMMENDATIONS, SIMILAR} = APPEND_TO_RESPONSE;

const MovieDetailsScreen = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {movieId} = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    getMovieById(
      movieId,
      `${VIDEOS},${CREDITS},${RECOMMENDATIONS},${SIMILAR}`,
    ).then(response => setMovie(response?.data));
  }, [movieId]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.moviePosterContainer}>
        <Image
          style={styles.moviePoster}
          resizeMode="cover"
          source={{uri: getPosters(movie?.backdrop_path)}}
        />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="chevron-left-circle"
            size={35}
            color={Colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Share.share({message: `${movie?.title}\n\n${movie?.homepage}`})
          }>
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}>
        <Ionicons name="play-circle-outline" size={70} color={Colors.white} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={Colors.heart} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map(genre => genre?.name)?.join(', ')} |{' '}
        {movie?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}>
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? Colors.black : Colors.lightGrey,
              }}>
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}>
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? Colors.lightGrey : Colors.black,
              }}>
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginVertical: 5}}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={item => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({item}) => (
            <CastCard
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
              image={item?.profile_path}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate('movie', {movieId: item.id})}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={movie?.similar?.results}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate('movie', {movieId: item.id})}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  moviePosterContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePoster: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Colors.white,
    fontWeight: 600,
  },
  playButton: {
    position: 'absolute',
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: Colors.black,
    fontWeight: 800,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: Colors.black,
    fontWeight: 800,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreText: {
    color: Colors.lightGrey,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontWeight: 600,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: Colors.extraLightGrey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: Colors.black,
    fontWeight: 600,
    fontSize: 18,
  },
  overviewText: {
    color: Colors.lightGrey,
    paddingVertical: 5,
    fontWeight: 600,
    fontSize: 13,
    textAlign: 'justify',
  },
  castTitle: {
    marginLeft: 20,
    color: Colors.black,
    fontWeight: 600,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: Colors.black,
    fontWeight: 600,
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: Colors.black,
    fontWeight: 600,
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MovieDetailsScreen;
