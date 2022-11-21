import React from "react";

const Grade = ({ outputDetails, resultoutputDetails }) => {

    function grade(outputDetails,resultoutputDetails)
  {
    let stateid = outputDetails?.status?.id;
    if(stateid === 3){
      if(atob(outputDetails.stdout) !== null){
        const result = `${atob(outputDetails.stdout)}`;
        const answer = atob(resultoutputDetails.stdout);
        //const answer = '1';
        if(result === answer){
          return true;
        }
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
        Grades:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {grade(outputDetails,resultoutputDetails) ? "1" : "0"}
        </span>
      </p>
    </div>
  );
};

export default Grade;
