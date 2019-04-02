import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Button,Platform } from 'react-native';
import { createAppContainer,createBottomTabNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import API from './api';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  containerMovie: {
    margin: 8,
    flex:1,
    flexDirection: 'row',
  },

  simpleText: {
    color: 'grey'
  },

  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  photoMovie: {
    flex: 1,
    marginRight: 20,
    height: 150,
    borderRadius:10,
    // borderWidth: 1,
    // borderColor: '#fff'

  },

  infoMovie:{
    flex:2,
    justifyContent: 'space-between',
  },

  filtersContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  
  filterText: {
    fontSize: 25,
    fontWeight: 'bold',    
  },

  imgTest:{
    width: 400,
    height:400
  },

  backdropPhotoMovie:{
    flex: 2,
    height: 250,

  },

  containerDetailMovie: {
    flex:1,
    justifyContent: 'flex-start',
  },

  containerTrailer: {
    flex:3,    
    // backgroundColor: 'red',
  },

  containerInfoDetail: {
    flex:1,
    paddingLeft:20,
    paddingRight:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerSypnosis: {    
    flex:2,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    // backgroundColor: 'red',
  },

  containerCast: {
    flex:2,
    padding:20,
  },

  mainCast:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  castPhoto:{
    width: 50,
    height: 50,
    borderRadius:50,
  },

  profileCast:{
    flex:1,
  },

  readMore:{
    color: 'red',
    textAlign: 'right',
  },

  containerTitleInDetails:{
      position: 'absolute',
      top: 0,
      left: 20,
      right: 0,
      bottom: 30,
      justifyContent: 'flex-end',
  },

  titleInDetails:{
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  containerStartsInDetails:{
    position: 'absolute',
    top: 0,
    left: 20,
    right: 0,
    bottom: 10,
    justifyContent: 'flex-end',

  },

  startsInDetails:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },

  containerIconYouTube:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 20,
    bottom: -15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
})

class Movie extends Component{
  render() {

    const IMG_URL = 'https://image.tmdb.org/t/p/w185';

    return(
      <View style={styles.containerMovie}>
      
        <Image style={styles.photoMovie} source={{uri: IMG_URL + this.props.imageUri}} /> 
        <View style={styles.infoMovie}>
          <View>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <Text style={styles.simpleText}>{this.props.year} | {this.props.language}</Text>
          <Text style={styles.simpleText}>{this.props.generes}</Text>
          </View>
          <View>
          <Text style={styles.simpleText}>{this.props.rate}</Text>
          <Text style={styles.simpleText}>{this.props.classification ? 'Adult' : 'Public'}</Text>
          </View>

        </View>
      </View>
    );
  }
}

class Filter extends Component{
  render(){
    return(
      <View style={styles.filtersContainer}>
          <Text style={styles.filterText}>Most popular</Text>
          <Image
        source={require('./assets/view.png')}
        style={{ width: 20, height: 20 }}
      />
        </View>
    );
  }
}

class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Movie details',
    headerRight: (
      <Image
        source={require('./assets/share.png')}
        style={{ width: 20, height: 20 }}
      />
    ),
  };
  render() {

    const { navigation } = this.props;
    const key = navigation.getParam('key', 'Nokey');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen {key}</Text>
      </View>
    );
  }  
}

class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Movie details',
      headerRight: (
      <Image
        source={require('./assets/share.png')}
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      ),
    };
  };

  state = {
    title: ''
  }

  async componentWillMount() {
    // this.props.navigation.setParams({ increaseCount: this._increaseCount });

    const detailMovieAPI = await API.getMovie(166428);
    const mainCastMovieAPI = await API.getMainCast(166428);

    this.setState({
      title: detailMovieAPI.title,
      runtime: detailMovieAPI.runtime,
      genres: detailMovieAPI.genres[0].name + ',' + detailMovieAPI.genres[1].name,
      language: detailMovieAPI.spoken_languages[0].name,
      overview: detailMovieAPI.overview,

      characterCast1: mainCastMovieAPI.cast[0].character,
      profilePhotoCast1: mainCastMovieAPI.cast[0].profile_path,
      nameCast1: mainCastMovieAPI.cast[0].name,

      characterCast2: mainCastMovieAPI.cast[1].character,
      profilePhotoCast2: mainCastMovieAPI.cast[1].profile_path,
      nameCast2: mainCastMovieAPI.cast[1].name,

      characterCast3: mainCastMovieAPI.cast[2].character,
      profilePhotoCast3: mainCastMovieAPI.cast[2].profile_path,
      nameCast3: mainCastMovieAPI.cast[2].name,
    })
  }

  render() {

    const IMG_URL = 'https://image.tmdb.org/t/p/w780';
    const PROFIL_IMG_URL = 'https://image.tmdb.org/t/p/w45';

    const idMovie = 166428;

    return(
      <View style={styles.containerDetailMovie}>

        <View style={styles.containerTrailer}>
          <Image style={styles.backdropPhotoMovie} 
           source={{uri: IMG_URL + '/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg'}}          
        /> 

        <View style={styles.containerTitleInDetails}>
         <Text style={styles.titleInDetails} >{this.state.title}</Text>
        </View>

        <View style={styles.containerStartsInDetails}>
         <Text style={styles.startsInDetails}>XXX</Text>
        </View>

        <View style={styles.containerIconYouTube}>
          
           <Image
             source={require('./assets/youtube.png')}
             style={{ width: 50, height: 50 }}
           />
        </View>
      </View>

        <View style={styles.containerInfoDetail}>
          <View> 
            <Text style={styles.titleText}>Duration</Text>
            <Text style={styles.simpleText}>{this.state.runtime}</Text>
          </View>
          <View> 
            <Text style={styles.titleText}>Genre</Text>
            <Text style={styles.simpleText}>{this.state.genres}</Text>
           </View>

           <View> 
            <Text style={styles.titleText}>Language</Text>
            <Text style={styles.simpleText}>{this.state.language}</Text>
           </View>           
        </View>

        <View style={styles.containerSypnosis}>
          <View> 
            <Text style={styles.titleText}>Sypnosis</Text>
            {/* <Text style={styles.simpleText}>As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury0 away...</Text> */}
            <Text style={styles.simpleText}>{this.state.overview}</Text>
            <Text style={styles.readMore}>Read more</Text>

          </View>
        </View>


        <View style={styles.containerCast}>
            <Text style={styles.titleText}>Main cast</Text>
            <View style={styles.mainCast}>

              <View style={styles.profileCast}>
                <Text style={styles.simpleText}>{this.state.characterCast1}</Text>
                
                <Image style={styles.castPhoto} 
                    source={{uri: PROFIL_IMG_URL + this.state.profilePhotoCast1 }}/>
                    
                <Text style={styles.simpleText}>{this.state.nameCast1}</Text>
              </View>

              <View style={styles.profileCast}>
                <Text style={styles.simpleText}>{this.state.characterCast2}</Text>
                
                <Image style={styles.castPhoto} 
                    source={{uri: PROFIL_IMG_URL + this.state.profilePhotoCast2 }}/>
                    
                <Text style={styles.simpleText}>{this.state.nameCast2}</Text>
              </View>

              <View style={styles.profileCast}>
                <Text style={styles.simpleText}>{this.state.characterCast3}</Text>
                
                <Image style={styles.castPhoto} 
                    source={{uri: PROFIL_IMG_URL + this.state.profilePhotoCast3 }}/>
                    
                <Text style={styles.simpleText}>{this.state.nameCast3}</Text>
              </View>

            </View>
        </View>
      </View>
    );

  } 
}

class MoreScreen extends Component {
  static navigationOptions = {
    title: 'Menu',
    headerRight: (
      <Image
        source={require('./assets/share.png')}
        style={{ width: 20, height: 20 }}
      />
    ),
  };
  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Menu Screen</Text>
      </View>
    );
  }  
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerRight: (
      <Image
        source={require('./assets/filter.png')}
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      ),
    };
  };

  state = {
    popularMovies: [],
  }

 async componentWillMount() {
    // this.props.navigation.setParams({ increaseCount: this._increaseCount });

    const popularMoviesAPI = await API.getPopularMovies();

    this.setState({
      popularMovies: [
        popularMoviesAPI
      ],
    })
  }

  render() {
    return (
      <View style={styles.container}>       

        <Filter />

        <FlatList          
          data={this.state.popularMovies[0]}
          renderItem={({item}) =>

          <Movie title={item.title} year={item.release_date} language={item.original_language}  generes='falta hacer'  rate={item.vote_average} classification={item.adult} imageUri={item.poster_path} />
                   
          }

          keyExtractor={(item, index) => item.id.toString()}
        />
        
      </View>
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;

  if (routeName === 'Home') {
    return (
      <Image
        source={require('./assets/home.png')}
        style={{width: 20, height: 20}}
      />
    );
        
  } else if (routeName === 'Search') {
    return (
      <Image
        source={require('./assets/search.png')}
        style={{width: 20, height: 20}}
      />
    );
  } else if (routeName === 'More') {
    return (
      <Image
        source={require('./assets/menu.png')}
        style={{width: 20, height: 20}}
      />
    );
  }

  return (
    <Image
      source={require('./assets/home.png')}
      style={{width: 20, height: 20}}
    />
  );
};

const Home = createStackNavigator({ HomeScreen });
const Search = createStackNavigator({ SearchScreen });
const More = createStackNavigator({ MoreScreen });
const Details = createStackNavigator({ DetailsScreen });

export default createAppContainer(createBottomTabNavigator({
  Search,
  Home,
  
  More,
  // Details
  },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
));

AppRegistry.registerComponent('MovieApp', () => AppContainer);