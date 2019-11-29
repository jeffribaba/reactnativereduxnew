import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {connect} from 'react-redux';
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import {addPlace,deletePlace,selectPlace,deselectPlace} from './src/store/action/index'

class App extends Component {

  placeAddedHandler = placeName => {
   this.props.onAddplace(placeName);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };
  
  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

const mappropsToProp = state => {
  return{
    places:state.places.places,
    selectedPlace:state.places.selectedPlace
  }
}

const mapDispatchToProps = dispatc => {
  return{
    onAddplace : (name) => dispatc(addPlace(name)),
    onDeletePlace : () => dispatc(deletePlace()),
    onSelectPlace : (key) => dispatc(selectPlace(key)),
    onDeselectPlace : () => dispatc(deletePlace())

  }
};
export default connect(mappropsToProp,mapDispatchToProps)(App)