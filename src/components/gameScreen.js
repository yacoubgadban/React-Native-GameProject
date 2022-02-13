import React from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity,Image} from 'react-native'
 
{/*// main page //*/} 
const GameScreen=(props)=>{
    const i=props.i
    const score=props.score
    const currentQuestion=props.questions[i]
    const timer=props.timer
    const changeColor=props.changeColor
    const answerClicked = props.answerClicked
    const timerColor=props.timerColor
    return( 
        <View > 
        {/*//////////////////////navbar (header) /////////////////////////////////*/}        
        <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerText}>Question {i+1}/20</Text>
                    </View>
                    <View>
                        <Image style={styles.image} source={require('../../assets/images/logo.png')}/>   
                    </View>
            </View> 
            {/*/////////////////////////////////  level and score  /////////////////////////////////*/ }
           <View style={{height:500}}>
               <View style={styles.questionView}>
                   <View style={{alignItems: 'center'}}>
                   <Text style={styles.score}>Score {score}</Text>
                   </View>
                   <View style={styles.level}> 
                       <Text style={{ fontSize:20,fontWeight:'bold'}}>Level </Text>
                       <Text style={{color:changeColor(currentQuestion.difficulty) ,fontSize:20,fontWeight:'bold'}}>{currentQuestion.difficulty}</Text>
                   </View>
                   {/*/////////////////////////////////  Question  /////////////////////////////////*/}
                    <Text style={styles.question}>{currentQuestion.title}</Text>
         
                    {/*/////////////////////////////////  Answers  /////////////////////////////////*/}
                   {
                      currentQuestion.answer.map((item)=>(
                    <TouchableOpacity key={item.title} style={styles.btnAnswer} onPress={() => {answerClicked(item.isCorrect)}}>     
                       <Text style={styles.btnTextAnswer}>{item.title}</Text>
                    </TouchableOpacity>
                       ))
                   }
                
                   </View>
                  </View>
                  
                  {/*/////////////////////////////////    Timer  /////////////////////////////////*/}
                  <View style={{alignItems: 'center'}}>
                    <View style={{borderColor:timerColor(timer),alignItems:'center',justifyContent:'center',height:120, width:120,borderRadius:180, borderWidth:5,}}>
                        {timer>9?
                         <Text style={styles.timerText}>{"00:"+timer}</Text>
                         :
                        <Text style={{color:timerColor(timer),fontSize:35,fontWeight:'bold'}}>{"00:0"+timer}</Text>
                        }
                    </View>
                   </View>
                    </View>
    )
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
  
export default GameScreen;