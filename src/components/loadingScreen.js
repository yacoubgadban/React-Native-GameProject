import React from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity,Image} from 'react-native'
 

// loading screen
const LoadingScreen=(props)=>{

    const i = props.i
    return( 
        <View >
        <View style={styles.container}>
     <View style={styles.headerContent}>
         <Text style={styles.headerText}>Question {i+1}/20</Text>
     </View>
     <View>
         <Image style={styles.image} source={require('../../assets/images/logo.png')}/>   
     </View>
</View>  

<View style={styles.loadingView}>  
<Image style={styles.image} source={{uri:'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif'}}/>   

</View>
</View>
    )
}

//style
const styles = StyleSheet.create({
    
    container:{
        flexDirection:'row',
        backgroundColor:'#87CEEB',
        paddingTop:50,
        justifyContent:'center',    
    },
    image:{
        width:60,
        height:60,
    },
    headerContent:{
        justifyContent:'center',
    },
    headerText:{
        color:'#fff',
        fontSize:20,
        marginRight:100,
        fontWeight:'bold',
    },
    loadingView:{
        
        alignItems:'center',
        justifyContent:'center',
        marginTop:100,
        
    },
    loading:{
        width:200,
        height:120,
    },
   
  });
  
export default LoadingScreen;