import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Button,Platform } from 'react-native';
import { createAppContainer,createBottomTabNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

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
})

class Movie extends Component{
  render() {
    return(
      <View style={styles.containerMovie}>
        <Image style={styles.photoMovie} source={{uri: this.props.imageUri}} />
        <View style={styles.infoMovie}>
          <View>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <Text style={styles.simpleText}>{this.props.year} | {this.props.language}</Text>
          <Text style={styles.simpleText}>{this.props.generes}</Text>
          </View>
          <View>
          <Text style={styles.simpleText}>{this.props.rate}</Text>
          <Text style={styles.simpleText}>{this.props.classification}</Text>
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

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={styles.container}>
      <Text>Count: {this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details',
          {
            key:'1'
          }
          )
        }
        />

        <Filter />
        <FlatList
          data={[
            {key:'1',title: 'Pelicula 1',year:'2018',language:'En',generes:'Action,Adventure',rate:'6.6',classification:'Public',imageUri:'https://image.tmdb.org/t/p/w185_and_h278_bestv2/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg'},
            {key:'2',title: 'Pelicula 2',year:'2018',language:'En',generes:'Action,Adventure',rate:'6.6',classification:'Public',imageUri:'https://image.tmdb.org/t/p/w185_and_h278_bestv2/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg'},
            {key:'3',title: 'Pelicula 3',year:'2018',language:'En',generes:'Action,Adventure',rate:'6.6',classification:'Public',imageUri:'https://image.tmdb.org/t/p/w185_and_h278_bestv2/f03YksE4NggUjG75toz4H1YAGRf.jpg'},
          ]}
          renderItem={({item}) =>

          <Movie title={item.title} year={item.year} language={item.language}  generes={item.generes}  rate={item.rate} classification={item.classification} imageUri={item.imageUri} />
          
          }
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

// const TabNavigator = createBottomTabNavigator(
//   {
//     HomeStack,
//   SearchStack,
//   MoreStack
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) =>
//         getTabBarIcon(navigation, focused, tintColor),
//     }),
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//   }
// );

const HomeStack = createStackNavigator({ HomeScreen });
const SearchStack = createStackNavigator({ SearchScreen });
const MoreStack = createStackNavigator({ MoreScreen });

export default createAppContainer(createBottomTabNavigator({
  HomeStack,
  SearchStack,
  MoreStack
}));

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailsScreen,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

//  const AppContainer = createAppContainer(TabNavigator);
// const AppContainer = createStackNavigator({ TabNavigator }, { headerMode: "none" });

// export default class App extends Component {
//   render() {
//     return <AppContainer />;
//   }
// }

AppRegistry.registerComponent('MovieApp', () => AppContainer);