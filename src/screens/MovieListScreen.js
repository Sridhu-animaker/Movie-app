import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../constants/Colors';
import GenerCard from '../components/GenerCard';
import ItemSeparator from '../components/ItemSeparator';
import MovieCard from '../components/MovieCard';
import {
  getGenres,
  getPlayingMovies,
  getUpcomingMovies,
} from '../helpers/httpHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  setGeners,
  setLoading,
  setNowPlaying,
  setUpcoming,
} from '../redux/actions/action';
import Loader from '../components/Loader';

function MovieListScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const appReducer = useSelector(state => state.app);
  const nowPlaying = appReducer.nowPlayingMovies;
  const upcoming = appReducer.upComingMovies;
  const isLoading = appReducer.isLoading;
  const genres = appReducer.genres;

  const [activeGener, setActiveGener] = useState('All');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getPlayingMovies()
      .then(async res => {
        await dispatch(setNowPlaying(res.data));
        getUpcomingMovies()
          .then(async upComingMovieRes => {
            await dispatch(setUpcoming(upComingMovieRes.data));
          })
          .catch(err => {
            console.log(err);
          });
        getGenres()
          .then(genresRes => {
            dispatch(setGeners([...genres, ...genresRes.data.genres]));
          })
          .catch(err => {
            console.log(err);
          });
        dispatch(setLoading(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoading(false));
      });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.container}>
            <Text style={styles.title}>Now Playing</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={genres}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <GenerCard
                  generName={item.name}
                  isActive={activeGener === item.name}
                  onPress={generName => setActiveGener(generName)}
                />
              )}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
              ListHeaderComponent={() => <ItemSeparator width={20} />}
            />
          </View>
          <View>
            <FlatList
              data={nowPlaying.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              ListHeaderComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              renderItem={({item}) => (
                <MovieCard
                  title={item.title}
                  language={item.original_language}
                  voteAvg={item.vote_average}
                  voteCount={item.vote_count}
                  poster={item.poster_path}
                  onPress={() =>
                    navigation.navigate('Movie Details', {movieId: item.id})
                  }
                />
              )}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Coming Soon</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View>
            <FlatList
              data={upcoming.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              ListHeaderComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              renderItem={({item}) => (
                <MovieCard
                  title={item.title}
                  language={item.original_language}
                  voteAvg={item.vote_average}
                  voteCount={item.vote_count}
                  poster={item.poster_path}
                  size={0.5}
                  showHeart={false}
                  onPress={() =>
                    navigation.navigate('Movie Details', {movieId: item.id})
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
  },
  viewAll: {
    fontSize: 13,
    color: colors.active,
  },
  listContainer: {
    paddingVertical: 10,
  },
});

MovieListScreen.prototype = {
  navigation: PropTypes.object,
};

export default MovieListScreen;
