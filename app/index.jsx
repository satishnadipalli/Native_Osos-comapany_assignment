import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router,Redirect } from 'expo-router';
import { useNavigation } from 'expo-router';


const App = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.safeView}>
      <SafeAreaView>
        <View style={styles.imageView}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            style={styles.cards}
          />
          <Text style={styles.quote}>Discover Endless possibilities with 
            <Text style={styles.orange}> Aura</Text>
          </Text>
          <Text style={styles.quotes}>We are here to make your visions come true.. Enjoy Or services to make Your lives Easier</Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={()=>router.push('/Home')}
          >
              <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>

          <View style={{height:20,width:"100%",backgroundColor:"#022D36",marginTop:40,padding:5}}></View>

        </View>
        <StatusBar style='light' backgroundColor='#161622'/>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: "#161622",
    height:"100%",
    paddingTop:20
  },
  logo: {
    width: 140,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    width: 360,
    height:250
  },
  quote: {
    fontWeight: 'bold',
    color: "white",
    padding:12,
    fontSize: 31,
    textAlign: "center",
  },
  quotes: {
    color: "white", 
    marginTop: 15, 
    fontSize:17,
    fontWeight:"bold",
    textAlign:"center",
    padding:10
  },
  orange:{
    color:"#FF9001"
  },
  gradient: {
    height:80,
    backgroundColor:"green"
  },
  button:{
    height:65,
    backgroundColor:"#FF8E01",
    justifyContent:"center",
    alignItems:"center",
    width:"80%",
    marginTop:30,
    borderRadius:10,

},
buttonText:{
    color:"#161622",
    fontWeight:"bold",
    fontSize:17,

}

});

export default App;
