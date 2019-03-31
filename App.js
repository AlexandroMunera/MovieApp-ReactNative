import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
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
          <Text>IconFilter</Text>
        </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
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


AppRegistry.registerComponent('MovieApp', () => App);