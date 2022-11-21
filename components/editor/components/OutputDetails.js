import React from "react";

const OutputDetails = ({ outputDetails}) => {
  let answer ="hello world";


  answer = btoa(answer);
  const length = answer.length;

  function grade(outputDetails,answer, length)
  {
    let stateid = outputDetails?.status?.id;
    if(stateid === 3){
      if(atob(outputDetails?.stdout) !== null){

        const result = outputDetails?.stdout;
        let wrong = 0;
        const length2 = result.length;

        if(length2 >= length){
          if((length2 - length) >= 2){
            return false;
          } 
          else{
            length = length2;
          }
        }
        else{
          if((length - length2) >= 2){
            return false;
          } 
        }

        for (var i=0; i < length; i++) {
          if(answer[i] !== result[i]){
            wrong ++;
          }
      } 
        if(wrong <= 2){
          return true;
        }
        
        /*if(b64DecodeUnicode(outputDetails?.stdout) === answer){
          return true;
        }*/
      }
      return false;
      //return true;
    }
    else{
      return false;
    }
  }

  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.time}
        </span>
      </p>
      <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Grades:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {grade(outputDetails, answer,length) ? "1" : "0"}
        </span>
      </p>
    </div>

    </div>
  );
};

export default OutputDetails;
