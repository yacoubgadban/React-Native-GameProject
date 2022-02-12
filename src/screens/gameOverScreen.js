import React from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity,Image} from 'react-native'


const GameOverScreen=(props)=>{
    console.log(questionsWrongAnswers)

    const i=props.i
    const score=props.score
    const questionsWrongAnswers=props.questionsWrongAnswers
    const prop =props.prop
    if(i>19 && score>=10){
    return( 
        <View >
                <View style={styles.successHeader}>
                    <Image style={styles.endGamelogo} source={require('../../assets/images/logo.png')}/>   
                </View>
                <View style={styles.endGame}>
                    <Text style={styles.successText}>GREAT JOB</Text>  
                    <Text style={styles.endGameMessage}>You answerd to {score} questions correctly </Text>
                    <Image style={styles.endGameImage} source={require('../../assets/images/success_character.png')}/>   
                </View>
                <View style={{margin:40 ,alignItems: 'center'}}>
                        <TouchableOpacity style={styles.btnAnswer} onPress={()=>{prop.navigation.navigate('wrongAnswers' ,{questions:questionsWrongAnswers})}}>
                                        <Text style={styles.btnTextAnswer}>Show wrong answerd</Text>
                        </TouchableOpacity>

                       
                    </View>
            </View>   
    )
    }else if(i>19 && score<10){
        return(
               
            <View >
                <View style={styles.failHeader}>
                    <Image style={styles.endGamelogo} source={require('../../assets/images/logo.png')}/>   
                </View>
                <View style={styles.endGame}>
                    <Text style={styles.failedText}>Failed</Text>  
                    <Text style={styles.endGameMessage}>You need to answer 10 correct answers</Text>
                    <Image style={styles.endGameImage} source={require('../../assets/images/failed_character.png')}/>   
                </View>
                {/*button to show the questions answerd wron with correct answer*/}
                <View style={{margin:40 ,alignItems: 'center'}}>
                    <TouchableOpacity style={styles.btnAnswer} onPress={()=>{prop.navigation.navigate('wrongAnswers' ,{questions:questionsWrongAnswers})}}>
                                    <Text style={styles.btnTextAnswer}>Show wrong answerd</Text>
                    </TouchableOpacity>                       
                </View>
            </View>  
           
        
        )
    }else{
        <View></View>
    }
}

//style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
      ,score:{fontSize:22 ,
          color:'#3CB371',
          fontWeight:'bold'},
     image:{
          width:60,
          height:60,
      },
      header:{
          flexDirection:'row',
          backgroundColor:'#87CEEB',
          paddingTop:50,
          justifyContent:'center',    
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
     
      level:{
          flexDirection:'row',
          fontSize:20
      },
      questionView:{
          padding:10,
      },
      question:{
          fontSize:20,
          marginTop:15,
          paddingRight:40,
      },
      timer:{
          flex:1,
          height:'100%',
  
      },
      timerText:{
          fontSize:35,
          fontWeight:'bold',
          color:'#87CEEB',
  
      },btnAnswer:{
          marginTop:20,
          borderRadius:12,
          backgroundColor:'#778899',
          shadowColor:'#000000',
          shadowOpacity:0.1,
          shadowOffset:{width:0, height:3},
          shadowRadius:2,elevation:5,
          
      },
      answers:{
          fontSize:20,
          },
          allanswers:{
              marginTop:50,
          },
          failHeader:{
              backgroundColor:'#B22222',
              paddingTop:50,
              
          },
     
          btnTextAnswer:{fontSize:18,
              padding:15,
              borderRadius:15,
              color:'#fff'},
  
          successHeader:{
              backgroundColor:'#3CB371',
              paddingTop:50,
              
          },
          endGame:{
              alignItems:'center',
              justifyContent:'center',
          },
          failedText:{
              marginTop:50,
              fontSize:60,
              color:'#B22222',
              fontWeight:'bold',
          },
          successText:{
              marginTop:50,
              fontSize:60,
              color:'#3CB371',
              fontWeight:'bold',
          },
          endGamelogo:{
              marginLeft:'100%',
              width:60,
              height:60,
              marginLeft:'75%'
          },
          endGameImage:{
              width: 265,
              height:320,
              },
              endGameMessage:{
                  fontSize:25,
                  color:'#000',
                  margin:20,
                  marginRight:70,
                  marginLeft:70,
              }
  });
  
export default GameOverScreen;