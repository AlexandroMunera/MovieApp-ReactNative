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
    margin: 20,
    flex:1,
    flexDirection: 'row',
  },

  simpleText: {
    color: 'grey'
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  photoMovie: {
    flex: 1,
    marginRight: 20,
    height: 200,
    borderRadius:10,
    // borderWidth: 1,
    // borderColor: '#fff'

  },

  infoMovie:{
    flex:1,
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
})

class Movie extends Component{
  render() {

    var IMG_URL = 'https://image.tmdb.org/t/p/w300';

    return(
      <View style={styles.containerMovie}>
        {/* <Image style={styles.photoMovie} source={{uri: IMG_URL + this.props.imageUri}} /> */}
        <Image style={styles.photoMovie} source={{uri: 'http://image.tmdb.org/t/p/w500/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg'}} />
        <View style={styles.infoMovie}>
          <View>
          <Text style={styles.titleText}>{this.props.id} | {this.props.title}</Text>
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
  static navigationOptions = {
    title: 'Search',
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
        <Text> Search Screen</Text>
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
      // headerRight: (
      //   <Button
      //     onPress={navigation.getParam('increaseCount')}
      //     title="+1"
      //     color={Platform.OS === 'ios' ? '#fff' : null}
      //   />
      // ),
    };
  };

  state = {
    popularMovies: [],
  }

 async componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });

    const popularMoviesAPI = await API.getPopularMovies();
    // console.log(popularMoviesAPI);

    this.setState({
      // popularMovies: [
      //   {key:'1',title:'Pelicula1'},
      //   {key:'2',title:'Pelicula2'},
      // ],

      popularMovies: [
        popularMoviesAPI
      ],
    })
  } 

  // _increaseCount = () => {
  //   this.setState({ count: this.state.count + 1 });
  // };

  render() {
    return (
      <View style={styles.container}>
      {/* <Text>Count: {this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details',
          {
            key:'1'
          }
          )
        }
        /> */}
        
      <Image style={styles.imgTest} source={{uri:
          'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
         }} />

        {/* <FlatList
          
          data={this.state.popularMovies[0]}
          // ListEmptyComponent={this.renderEmtpy}
          // ItemSeparatorComponent={this.itemSeparator}
          renderItem={({item}) =>

          <Movie title={item.title} year={item.release_date} language={item.original_language}  generes='falta hacer'  rate={item.vote_average} classification={item.adult} imageUri={item.poster_path} />
          // <Movie id={item.id} title={item.title}  />
          
          }
          keyExtractor={(item, index) => item.id.toString()}
        /> */}
        
        {/* <FlatList
          data={this.state.popularMovies}
          renderItem={({item}) =>

          // <Movie title={item.title} year={item.year} language={item.language}  generes={item.generes}  rate={item.rate} classification={item.classification} imageUri={item.imageUri} />
          <Movie title={item.title} />
          
          }
        /> */}
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
  Home,
  Search,
  More
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