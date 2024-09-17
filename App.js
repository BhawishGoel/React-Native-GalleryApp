import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { PinchGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const imageUrls = [
  'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
  'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_640.jpg',
  'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
  'https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726531200&semt=ais_hybrid',
  'https://st5.depositphotos.com/81299366/68178/i/450/depositphotos_681787038-stock-photo-red-heart-surrounded-red-blue.jpg',
  'https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg',
];

const App = () => {
  // ye state no of col and image size ko manage krne ke liye h 
  const [numColumns, setNumColumns] = useState(2); // Default col 2 lgaye h 
  const [imageSize, setImageSize] = useState(width / 2 - 10); // Default image size lgaya h 

  // Handle pinch gesture
  const handlePinchEvent = (event) => {
    const scale = event.nativeEvent.scale;
    
    if (scale > 1 && numColumns > 1) {
      // Zoom out
      setNumColumns((prevColumns) => {
        const newColumns = Math.max(prevColumns - 1, 1); // col size 1 se less ni hona chaiye 
        setImageSize(width / newColumns - 10); // Adjust krega image size ko acc to new column count
        return newColumns;
      });
    } else if (scale < 1 && numColumns < 8) {
      // Zoom in
      setNumColumns((prevColumns) => {
        const newColumns = Math.min(prevColumns + 1, 8); // col size 8 se maximum ni hoga 
        setImageSize(width / newColumns - 10); // Adjust krega image size ko acc to new column count
        return newColumns;
      });
    }
  };

  // Reset the gesture once it's completed
  const handlePinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Optionally handle kr skte hai any actions after pinch ends, agr hume need h toh 
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <PinchGestureHandler
          onGestureEvent={handlePinchEvent}
          onHandlerStateChange={handlePinchStateChange}
        >
          <FlatList
            data={imageUrls}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image style={[styles.image, { width: imageSize, height: imageSize }]} source={{ uri: item }} />
            )}
            numColumns={numColumns} // Dynamically adjust krega the number of columns
            key={numColumns} // Use krega numColumns as a key to forcely  re-render krne ke liye 
          />
        </PinchGestureHandler>
        <Text>Pinch to zoom in/out and adjust images</Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 5, 
  },
});
