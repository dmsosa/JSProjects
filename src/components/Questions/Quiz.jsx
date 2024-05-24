import { useState } from "react";
import { getAllQuestions } from "../../services/questions";
import QuestionCard from "./QuestionCard";
import Score from "./Score";
import ProgressBar from "./ProgressBar";

function Quiz() {
    const [ questions, setQuestions ] = useState(getAllQuestions());
    const [ showScore, setShowScore ] = useState(true);
    const [ finalScore, setFinalScore ] = useState(0);
    const [ attemps, setAttemps ] = useState(0);    
    const [ errorMessage, setErrorMessage ] = useState(null);
    const pointsPerQuestion = 10000 / questions.length;

    const sumToScore = (points) => {
        if (finalScore + points > 10000) {
            setFinalScore(10000);
            return;
        }
        setFinalScore(finalScore + points);
    }


    const handleTryAgain = () => {
        // all questions without answer
        setQuestions(questions.map((q) => { 
            q.answered = false 
            return q;
        })); 
        setShowScore(false);
        setFinalScore(0);
        setAttemps(attemps+1);
    }

    const handleFinish = () => {
        //check if all questions have been answered
        for (let i = 0; i < questions.length ; i ++) {
            if (!questions[i].answered) {
                setErrorMessage("You need to answer all the questions first!");
                return;
            }
        }
        setErrorMessage(null);
        setShowScore(true);
    }

    return (
        showScore ? 
            <>
                <Score 
                firstTime={attemps < 1} 
                score={finalScore} 
                setShowScore={setShowScore} 
                handleTryAgain={handleTryAgain} /> 
                <ProgressBar finalScore={finalScore}/>
            </>
            :
            <>
                { errorMessage && <div className="error-message"><p>{errorMessage}</p></div>}
                <ProgressBar finalScore={finalScore}/>
                <div className="quiz-wrapper">
                    <div className="quiz-container">
                        {questions.map((question, index) => 
                            <QuestionCard 
                            key={index}
                            question={question} 
                            index={index} 
                            sumToScore={sumToScore} 
                            pointsPerQuestion={pointsPerQuestion}
                            setQuestions={setQuestions} 
                            allQuestions={questions}/>
                        )}
                    </div>
                    <div className="quiz-nav">
                        {questions.map((question) => 
                            <a key={question.id} href={`#question${question.id}`}></a>
                        )}
                    </div>
                    <div className="quiz-finish">
                        <button className="btn btn-primary" onClick={handleFinish}>Finish</button>
                    </div>
                </div>

            </>)    
    
}

export default Quiz;