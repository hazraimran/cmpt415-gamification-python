import React, { useEffect, useState, Component, useRef } from "react";
import Problem from "./Problem";
import { doc } from "firebase/firestore"; 
import { getStudentById, Student } from "../../../data/Students";
import {db} from "../../../firebase";


import axios from "axios";
import { classnames } from "../utils/general";

import "react-toastify/dist/ReactToastify.css";

import Editor from "@monaco-editor/react";

export default class CodeProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``, //localStorage.getItem('input')||
      output: ``,
      language_id:localStorage.getItem('language_Id')|| 2,
      user_input: ``,
      isVisible: false,
      grade:``,
      output_code:``,
      answer:``,
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.editorRef = React.createRef();
  }

  toggleVisibility(){
    if (this.state.isVisible){
       this.setState({ isVisible: false });
    }
    else {
      this.setState({ isVisible: true });
    }
    var bruh = this.state.isVisible;
   //alert(JSON.stringify(bruh));
  }
  
  handleEditorDidMount = (editor, monaco) =>{
    this.editorRef.current = editor
}


  input = (event) => {
 
    event.preventDefault();
  
    this.setState({ input: event.target.value });
    localStorage.setItem('input', event.target.value)
 
  };
  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };
  language = (event) => {
   
    event.preventDefault();
   
    this.setState({ language_id: event.target.value });
    localStorage.setItem('language_Id',event.target.value)
   
  };

  submit = async (e) => {
    e.preventDefault();

    

    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const editorText = this.editorRef.current+ this.props.questionCode.replaceAll("\\n", "\n");


    //Saving submission:
    
    //const StudentID = Student.;
   

    // const submission = doc(db, "students", StudentID, "questionAttempts", this.props.questionID);
    // const docSnap = await getDoc(submission);

    //   if (docSnap.exists()) {
    //     //update if it exists
    //     await updateDoc(submission, {
    //       "code": editorText,
    //     });

        
    //   } else {
    //     //add if it doesn't exist
    //     await setDoc(doc(db, "students", StudentID, "questionAttempts", this.props.questionID), {
    //       "code": editorText,
    //     });

        
    //   }


    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "6654509f28mshaa982e17ac485aap168a9fjsn83428d85a1bd", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: editorText,
          stdin: this.state.user_input,
          language_id: 71,
        }),
      }
    );
    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "6654509f28mshaa982e17ac485aap168a9fjsn83428d85a1bd", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      this.setState({output_code: output})

      outputText.innerHTML = "";

      outputText.innerHTML += `${output}`;
      
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${error}`;
      this.setState({ grade: 0 });
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${compilation_error}`;
      this.setState({ grade: 0 });
    }
  };

  grade = async (e) => {

    e.preventDefault();

    let outputText = document.getElementById("answer");
    //outputText.innerHTML = "";
    //outputText.innerHTML += "Creating Submission ...\n";
    const editorText = this.props.questionAnswer.replaceAll("\\n", "\n") + this.props.questionCode.replaceAll("\\n", "\n");
    //editorText = this.props.questionAnswer.replaceAll("  ", "\g");
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "6654509f28mshaa982e17ac485aap168a9fjsn83428d85a1bd", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: editorText,
          stdin: this.state.user_input,
          language_id: 71,
        }),
      }
    );
    //outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      //outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "6654509f28mshaa982e17ac485aap168a9fjsn83428d85a1bd", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);


      //outputText.innerHTML = "";

      //outputText.innerHTML += `${output}`;
      if(output === this.state.output_code){
        this.setState({ grade: 100 });
      }
      else{
        this.setState({ grade: 0 });
      }
    } 
  };



  openQuestions = (uuid) => {
    getQuestionU(uuid).then(p => {
        setQuestion(p)
    }).catch(e => {
        console.log(e)
    })
  }

  render() {
 
    return (
      <>
       <div style={{
               position: 'relative', left: '12.5%', width: '70%', borderWidth: 10, 
        }}>
         
         <div style={{fontSize: 24}} onClick={this.toggleVisibility}>
            <center><h1>{this.props.questionTitle}   (Click to Expand)</h1></center>
          </div>

          {this.state.isVisible && 
          <div style={{ padding: "2%", maxHeight: '30vh',
          }}>
          <Problem questionString={this.props.questionString}/>
          </div>
          }
          {/*this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
           <CodeEditorWindow questionFiller={this.props.questionFiller} 
           change={this.onChange}
           value = {this.state.Input}/>
          </div>
        */}

          {this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
            <Editor
                height="40vh"
                defaultLanguage="python"
                defaultValue={this.props.questionFiller.replaceAll("\\n", "\n")}
                onChange={this.handleEditorDidMount}
                theme="vs-dark"
            />
          </div>
        }

          {/*this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
        <div className="row container-fluid">
            <textarea
              required
              name="solution"
              id="source"
              rows="10"
              onChange={this.input}
              className="source"
              value={this.state.input}
              
            ></textarea>
        </div>
        </div>
        */}

          {this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
           
          <textarea id="input"  
          rows="2"
          className={classnames(
            "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
          )}
           onChange={this.userInput}
           placeholder={`Custom input`}
           ></textarea>

           
           <button
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={this.submit}
            >
            <i className="fas fa-cog fa-fw "></i> Compile and Run
            </button>
            <button
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={this.grade}
            id="answer"
            >
            <i className="fas fa-cog fa-fw "></i> Grade
            </button>
            {/*<button
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={this.submit}
            >
            <i className="fas fa-cog fa-fw"></i> Grade
          </button>*/} 
          </div>
          }

          {this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
            <div>
              <textarea 
              id="output"
              rows="4"
          className={classnames(
            "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2")}
            placeholder={`Output Window`}
            ></textarea>
            {<p className="text-sm">
            Grade:{" "}
            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {this.state.grade}
            </span>
          </p>}
            </div>
          </div>
          }
           {/*this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
            <div>
              <textarea 
              id="answer"
              rows="4"
          className={classnames(
            "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[0px_0px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2")}
            placeholder={`Answer Window`}
            ></textarea>
            </div>
          </div>
          */}



        </div>
      </>
    );
  }
}



CodeProblem.defaultProps = {
  profilePictureSrc: 'https://example.com/no-profile-picture.jpg',
  questionTitle: "QuestionTitle",
  questionID: {},
  questionFiller: "#Example code",
};