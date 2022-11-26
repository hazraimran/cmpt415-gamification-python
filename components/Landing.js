import React, { useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

import CodeProblem from "./editor/components/CodeProblem";
import {getQuestionCList, getQuestionU} from "../data/questions.js"
import Context from '../context/Context'
import axios from 'axios'

const Landing = () => {

  const [questionLists, setquestionLists] = useState([])

  const questionObject = {
    questionID: 10023,
    questionTitle: "Discount Problem",
    questionString:"A shop will give discount of 10% if the cost of purchased quantity is more than 1000. Ask user for quantity.Suppose, one unit will cost 100. Judge and print total cost for user.",
    questionFiller: "//Code your function below: "
  }

  const loadQuestion = () => {
    getQuestionCList().then(d => {
        setquestionLists(d)
    }).catch(e => {
        console.log(e)
    })
}

    useEffect(() => {
        // calls the function on the load of the page
        loadQuestion();
        

    }, []);
    const { setEditorState } = useContext(Context)

    const Q1 = questionLists.find(obj =>{
      return obj.questionID=== '10023'
    })

    const Q2 = questionLists.find(obj =>{
      return obj.questionID=== '1001'
    })

    const closeCodingChallenge = () => {
      setEditorState(0)
  }

  return (
    <>
      {/*<div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
     
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
              </div>*/}
  <CodeProblem {...Q1}/>
  <CodeProblem {...Q2}/>
  <CodeProblem />  
  <div class="btn-group btn-group-editor-run" role="group">
        <button type="button" className="btn btn-light" href="#" role="button" onClick={closeCodingChallenge}>Close Coding Challenge</button>
  </div> 
    </>
  );
};
export default Landing;