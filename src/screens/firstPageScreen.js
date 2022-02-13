import React from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity,Image} from 'react-native'
 {/*// first page //*/} 
const FirstPageScreen=(props)=>{
    return( 
        <View style={styles.container}>
             <View >
                     <Image style={styles.image} source={require('../../assets/images/splash_logo.png')}/> 
                </View>
            <TouchableOpacity style={styles.btn} onPress={()=>{props.navigation.navigate('game')}}>
                <Text style={styles.btntext}>Let's Play</Text>   
            </TouchableOpacity>    
        </View>    
    )
}

//style
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#87CEEB',
    },
    image:{
        width: 220,
        height:350,     
  },
  btn:{
      marginTop:20,
      borderWidth:1,
      borderRadius:15,
      borderColor:'#A9A9A9',
      backgroundColor:'#fff',
      padding:20,
      paddingRight:50,
      paddingLeft:50,
      borderRadius:12,
      shadowColor:'#000000',
      shadowOpacity:0.1,
      shadowOffset:{width:0, height:3},
      shadowRadius:2,elevation:5,

  },
  btntext:{
    fontSize:35,
    color:'#A9A9A9',

  }
  });
  
export default FirstPageScreen;