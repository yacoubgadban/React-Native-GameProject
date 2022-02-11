import React,{useState,useEffect} from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity,Image} from 'react-native'

const GameScreen=(props)=>{
 
  const [questions, setQuestions] = useState([]);
  //question index
  const [i, setI] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const [intervalId, setIntervalId] = useState();
  const [score, setScore] = useState(0);
  ///// wrong answers page
  const [questionsWrongAnswers, setQuestionsWrongAnswers] = useState([]);

  //format wrong answers page
  const wrong={
      question:'',
      answer:''
  }

    let  newQuestionsTemp=[]; 
  //get data from api  
     useEffect(async () => {
      const url='https://opentdb.com/api.php?amount=20&category=18'
      const response = await fetch(url,{method: 'GET'});
      const json = await response.json();
      let questionId=0;

      //new json format
      json.results.forEach(question =>{
          let answers=[]
          //correct answers
          const correct_answer={title:question.correct_answer ,isCorrect:true}
          answers.push(correct_answer);
          
          //wrong answers
           question.incorrect_answers.forEach(item=>{
            const incorrect_answer={title:item ,isCorrect:false}
            answers.push(incorrect_answer);
          })
          const newQuestionFormat ={
              id:questionId++,
              title:question.question,
              type:question.type,
              category:question.category,
              difficulty:question.difficulty,
              answer:shuffle(answers)
          }
          newQuestionsTemp.push(newQuestionFormat)
      })
      setQuestions(newQuestionsTemp);
      
        //timer
        if(isRunning){
            const id=setInterval(() => {
                    setTimer(timer=>timer-1)
        }, 1000); 
        setIntervalId(id)
        }else{
            clearInterval(intervalId)
        }     
 

},[isRunning]);

  //shuffle the answers
  const shuffle = (arr)=> {
    let currentIndex =arr.length, randomIndex;
    while(currentIndex!= 0){
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]]=[arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }
  
  //change level color 
  const changeColor=(difficulty)=>{
    switch (difficulty) {
      case 'medium':
        
      return '#FFD700';  
      
      case 'easy':
        return '#008000';

        case 'hard':
          return '#B22222';
      default:
      }
  }

  //change timer color to red (attention) 5 sec and lower
  const timerColor=(timer)=>{
    if(timer>5){
        return '#87CEEB'
    }else{
        return '#FF0000'
    }
  }

// result after answer to all questions
  const EndGame=()=>{
       //screen if win the game
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
                        <TouchableOpacity style={styles.btnAnswer} onPress={()=>{props.navigation.navigate('wrongAnswers' ,{questions:questionsWrongAnswers})}}>
                                        <Text style={styles.btnTextAnswer}>Show wrong answerd</Text>
                        </TouchableOpacity>

                       
                    </View>
            </View>   
            )
        }
         //screen if lost the game
        else if(i>19 && score<10){
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
                        <TouchableOpacity style={styles.btnAnswer} onPress={()=>{props.navigation.navigate('wrongAnswers' ,{questions:questionsWrongAnswers})}}>
                                        <Text style={styles.btnTextAnswer}>Show wrong answerd</Text>
                        </TouchableOpacity>                       
                    </View>
                </View>  
               
            
            )
        }
    }

    // game screen func
    const gameScreen=()=>{
        if (questions[i] && i<20){    
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
                       <Text style={{color:changeColor(questions[i].difficulty) ,fontSize:20,fontWeight:'bold'}}>{questions[i].difficulty}</Text>
                   </View>
                   {/*/////////////////////////////////  Question  /////////////////////////////////*/}
                    <Text style={styles.question}>{questions[i].title}</Text>
         
                    {/*/////////////////////////////////  Answers  /////////////////////////////////*/}
                   {
                       questions[i].answer.map((item)=>(
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
              {/*/////////////////////////////   loading  //////////////////////////////*/}
             }else if(!questions[i] && i<20){
                 return(
                    <View >
                    <View style={styles.header}>
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
              else{
                   return(
                <View >
                    
               </View>
                   )
                   }
                
    }
   
    
    // set default time
    const defaultTimer =()=>{
        //first 10 questions
        if(i<9){
            setTimer(30);
            //questions 11-12-13-14-15
        }else if(i>8 && i<14){
            setTimer(15);
        //questions 16-17-18-19-20
        }else{
            setTimer(10);
        }
    }     
    
    // player answer
    const answerClicked=(playerAnswer)=>{
         //next question
        setI(i=>i+1)
        //check answer if correct
        if(playerAnswer==true){   
            setScore(score=>score+1)
        }else{  
            wrong.question=questions[i].title  
            questions[i].answer.forEach(thisanswer=>{
                if(thisanswer.isCorrect==true){
                    wrong.answer=thisanswer.title
                }
               
            })
             //add wrong answer to list 
            questionsWrongAnswers.push(wrong)
                         
        }
        //reset timer
        setIsRunning(false);
        defaultTimer();
        setIsRunning(true);
      }



      //reset timer
      const ifTimeOut=()=>{
        if(timer==0){
            setIsRunning(false);
            defaultTimer();
            setIsRunning(true);
            //next question
            setI(i+1);
         }
    } 
    ifTimeOut();
      
     

     
    return( 
        <View > 
            <View >
             {gameScreen()}
             {EndGame()}
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