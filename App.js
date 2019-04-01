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
        style={{ width: 20, height: 20 }}
      />
      ),
    };
  };

  
  state = {
    detailMovie: [],
    title: ''
  }

  async componentWillMount() {
    // this.props.navigation.setParams({ increaseCount: this._increaseCount });

    const detailMovieAPI = await API.getMovie(166428);
    console.log(detailMovieAPI.spoken_languages[0].name);

    this.setState({
      runtime: detailMovieAPI.runtime,
      genres: detailMovieAPI.genres[0].name + ',' + detailMovieAPI.genres[1].name,
      language: detailMovieAPI.spoken_languages[0].name,
      overview: detailMovieAPI.overview,
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
                <Text style={styles.simpleText}>Freddie...</Text>
                
                <Image style={styles.castPhoto} 
                    source={{uri: PROFIL_IMG_URL + '/7EX0od3FwdaoEegJlY1q0kZgEqt.jpg' }}/>
                    
                <Text style={styles.simpleText}>Rami Malek</Text>
              </View>

              <View style={styles.profileCast}>
                <Text style={styles.simpleText}>Freddie...</Text>
                
                <Image style={styles.castPhoto} 
                    source={{uri: PROFIL_IMG_URL + '/9xuc962JhsW51bCFURtel7RBrMM.jpg' }}/>
                    
                <Text style={styles.simpleText}>Rami Malek</Text>
              </View>

              <View style={styles.profileCast}>
                <Text style={styles.simpleText}>Freddie...</Text>
                
                <Image style={styles.castPhoto} 
                    source={{uri: PROFIL_IMG_URL + '/nRbIHvVpz5jfQbKlnBAJN10qaLo.jpg' }}/>
                    
                <Text style={styles.simpleText}>Rami Malek</Text>
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
        style={{ width: 20, height: 20 }}
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