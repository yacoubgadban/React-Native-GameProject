import React from 'react';
import {View , Text ,StyleSheet,FlatList ,Image} from 'react-native'
 

const WrongAnswersScreen=(props)=>{
    const questions=props.route.params.questions 

    return( 
        <View style={styles.container}>
                <View style={styles.imgDiv}>
                     <Image style={styles.image} source={require('../../assets/images/splash_logo.png')}/> 
                </View>       
            <View > 
              
            <FlatList
            data={questions}
            keyExtractor={item=>item.question}
            renderItem={ ({item}) =>( 
                        <View style={styles.header} key={item.question}>
                            <Text style={styles.questionText}>Question : {item.question} </Text> 
                            <Text style={styles.answerText}>Correct Answer : {item.answer} </Text>     
                        </View> 
            )}
            
            />  
                     
                
            </View>  
        </View>    
    )
}

//style
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image:{
        width: 160,
        height:250,
        
  },
  imgDiv:{
        marginTop:30,
        alignItems: 'center',
  },
  header:{
    margin:15,

  },
  questionText:{
    fontSize:15,

  },
  answerText:{
    fontSize:17,
    color: '#1E90FF',
    fontWeight: 'bold'

  }
  });
  
export default WrongAnswersScreen;