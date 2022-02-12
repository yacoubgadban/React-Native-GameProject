import React,{useState,useEffect} from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity,Image} from 'react-native'
import GameScreen from '../screens/gameScreen'
import GameOverScreen from '../screens/gameOverScreen'
import LoadingScreen from '../screens/loadingScreen'

const Game=(props)=>{
 
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
      
     

     


    // game screen function
    const gameScreen=()=>{
            
        {/*/////////////////////////////   start game  //////////////////////////////*/}
        if (questions[i] && i<20){    
            return(           
            <GameScreen  questions={questions} i={i} timer={timer} score={score} changeColor={changeColor} 
                        answerClicked={answerClicked} timerColor={timerColor} />
             )
              {/*/////////////////////////////   loading  //////////////////////////////*/}
             }else if(!questions[i] && i<20){
                 return(
                   <LoadingScreen i={i}/>
                 )
            {/*/////////////////////////////   Game over  //////////////////////////////*/}

             }if(i>19){        
                return(
                     <GameOverScreen  prop={props}  questionsWrongAnswers={questionsWrongAnswers} score={score} i={i} />
                        )
                }
              


    }
    return( 
        <View > 
            <View >
             {gameScreen()}
            </View>      
        </View>
    
    )

}



  
export default Game;