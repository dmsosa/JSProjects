import { useEffect, useState } from "react";
import Options from "./Options";
import Timer from "./Timer";
import QuestionButtons from "./QuestionButtons";

function QuestionCard({ question, index, sumToScore, pointsPerQuestion, allQuestions, setQuestions }) {

    const [ currentOption, setCurrentOption ] = useState(null);
    const [ selectedOptions, setSelectedOptions ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState("");
    
    const handleCurrentOption = (optionIndex) => {
        setCurrentOption(optionIndex);
    }

    const setQuestionAsAnswered = () => {
        setQuestions( allQuestions.map((q) => {
            if (q.id === question.id) {
                q.answered = true;
            }
            return q;
        })) 
    }

    const handleWatchedQuestion = (nextQuestionId) => {
        setQuestions( allQuestions.map((q) => {
            if (q.id === nextQuestionId) {
                q.watched = true;
            }
            return q;
        })) 
    }
    const checkCorrect = (selectedOption) => {
        const option = document.querySelector(`#question${question.id}  .option${selectedOption}`);
        if (question.correctOptions.includes(selectedOption)) {
            option.classList.add("correct");
            option.classList.remove("noanswer");
            return true;
        } else {
            option.classList.add("wrong");
            option.classList.remove("noanswer");
            return false;
        }
    }

    useEffect(() => {


        if (question.answered) {
            return;
        }

        if (currentOption == null || selectedOptions.includes(currentOption)) { return };

        selectedOptions.push(currentOption);
        setSelectedOptions(selectedOptions);
        const isCorrect = checkCorrect(currentOption);

        if (isCorrect) {
            if (question.correctOptions.length === 1) {
                sumToScore(pointsPerQuestion);
            } else {
                sumToScore(pointsPerQuestion/question.correctOptions.length);
            }
        } else {
            setErrorMessage("ups!");
            setQuestionAsAnswered();
        }

        if (question.correctOptions.length === selectedOptions.length) {
            setQuestionAsAnswered();
        };
    }, [currentOption])


    return (
            <div id={`question${question.id}`} className={`question-card-container ${question.answered ? "answered":"noanswer"}`}>
                <div className="question-card-header">
                    <h1>Question no. {index+1}</h1>
                    <p>{question.text}</p>
                    {question.watched && !question.answered && <Timer callback={setQuestionAsAnswered}/>}
                </div>
                <div className={`advise ${question.answered && "show"}`}><p>{question.advise}</p></div>
                { errorMessage.length > 1 && <div className="error-message"><p>{errorMessage}</p></div> }
                <div className="options">
                    <Options options={question.options} 
                    selectedOptions={selectedOptions}
                    handleSelectOption={handleCurrentOption} 
                    />
                </div>
                <QuestionButtons 
                questionsSize={allQuestions.length} 
                questionId={question.id}
                handleWatchedQuestion={handleWatchedQuestion}/>
            </div>        
    )
};

export default QuestionCard;