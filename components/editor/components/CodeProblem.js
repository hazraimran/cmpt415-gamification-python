import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import Problem from "./Problem";




class CodeProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
    this.toggleVisibility = this.toggleVisibility.bind(this);
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

  
  
  





  //Style question title
  render() {

    return (
        <div style={{
               position: 'relative', left: '12.5%', width: '75%', borderWidth: 10, 
        }}>
          
          <div style={{fontSize: 24}} onClick={this.toggleVisibility}>
            <center><h1>{this.props.questionTitle}   (Click to Expand)</h1></center>
          </div>

          {this.state.isVisible && 
          <div style={{ padding: "2%"
          }}>
          <Problem/>
          </div>
          }

          {this.state.isVisible &&
          <div style={{
              borderWidth: 10
          }}>
            <CodeEditorWindow/>
          </div>
          }


        </div>
    )
  }

   
}

CodeProblem.defaultProps = {
        profilePictureSrc: 'https://example.com/no-profile-picture.jpg',
        questionTitle: "QuestionTitle",
        questionID: {},
        questionFiller: "//Example code",
        
};



export default CodeProblem;