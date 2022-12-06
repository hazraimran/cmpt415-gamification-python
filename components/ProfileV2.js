import React from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCertificate, faAward, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import OpenModuleComponent from './OpenModuleComponent'
import conditionalStatementsJson from '../modules/conditional_statements.json'
import { query, collection, where, doc, setDoc, getDocs, serverTimestamp, orderBy } from 'firebase/firestore'
import {db} from '../firebase'
import { useContext, useEffect , useState} from 'react'
import Context from '../context/Context'

export default function profiles({ Leaderboard }) {
  return (
    <div>

{Item(Leaderboard)}
    </div>
        
  )
}


function Item(data){ 

    const [progess, setProgess] = useState(10);

    async function callsomeAPI(){
        const q = query(collection(db, "Module"))

        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        if (querySnapshot.empty) {
            return null
        }
        console.log(querySnapshot.docs[0].data())
        querySnapshot.docs.map(doc => doc.data()).map(async (data)=>{
            console.log(data)
            if(data.name == 'Conditional Statement'){
                var prog = 100*(data.cQuizCount + data.cLearningCount + data.cCodingCount)/(data.tQuizCount + data.tLearningCount + data.tCodingCount)
                await setProgess(prog.toFixed(2))
            }
        })
    }
    useEffect( ()=>{
        
        callsomeAPI()
        return () => {
            console.log("This will be logged on unmount");
          }
    },[])
    

    const { openedModule, setOpenedModule, editorState } = useContext(Context)
    const handleModuleStart = (e) => {
    const module = e.currentTarget.getAttribute('module')
    let content;

    // ToDo: Load all modules in modules folder

    if (module === 'conditional_statements') {
        content = conditionalStatementsJson
    } else {
        return
    }

    setOpenedModule({
        id: module,
        json: content
    })
}
/**
     * Returns the editor for the module.
     * Can be either an EasyEditorComponent or an EditorComponent.
     */
 const getEditor = () => {
    if (editorState === 1) {
           return (
               <div className="col-130 position-fixed b-re editor-back" style={{right: 0}}>
                   <Landing/>
               </div>
           )
       }
   }

if (openedModule) {
    return (
        <div className="container mx-auto">
            <div className="row">
                <div className={editorState === 0 ? "col-100" : "col-7"}>
                    <OpenModuleComponent file={openedModule} />
                </div>
                {getEditor()}
            </div>
        </div>
    // </div>
    )
} else{
    return (

        <div id="profile">
        <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9 col-lg-10">
          <div class="pt-5 mt-3">
            <div class="row pt-5 text-light row1 mx-0">
              <div class="col-12">
                <div class="gallery-wrapper">
                  <div class="col-lg-4 col-sm-6 col-12 grid-sizer"></div>
                  <div class=" col-lg-4 col-sm-6 col-12 p-1 grid-item">
                    <div class="content">
                      <a  href="#" module="conditional_statements" onClick={handleModuleStart}>
                        <div class="content-overlay"></div>
                        <img
                          class="content-image image-fluid"
                          src="https://th.bing.com/th/id/OIP.6VrI1fe7BXBT_dNPg3BBXQHaEo?w=250&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
                        />
                        <div class="topic-name fadeIn-bottom">
                          <p class="content-title">Conditional Statement</p>
                        </div>
                        <div class="content-details fadeIn-bottom">
                        <p class="content-title">Start</p>
                          <p class="content-text">
                            Progess: {progess}%
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class=" col-lg-4 col-sm-6 col-12 p-2 grid-item">
                    <div class="content">
                      <a href="topic.html">
                        <div class="content-overlay"></div>
                        <img
                          class="content-image image-fluid"
                          src="https://th.bing.com/th/id/OIP.6VrI1fe7BXBT_dNPg3BBXQHaEo?w=250&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
                        />
                        <div class="topic-name fadeIn-bottom">
                          <p class="content-title">Intro to Html</p>
                        </div>
                        <div class="content-details fadeIn-bottom">
                          <p class="content-title">Intro to Html</p>
                          <p class="content-text">
                            This is a short description
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class=" col-lg-4 col-sm-6 col-12 p-1 grid-item">
                    <div class="content">
                      <a href="topic.html">
                        <div class="content-overlay"></div>
                        <img
                          class="content-image
                              image-fluid"
                          src="https://th.bing.com/th/id/OIP.6VrI1fe7BXBT_dNPg3BBXQHaEo?w=250&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
                        />
                        <div class="topic-name fadeIn-bottom">
                          <p class="content-title">Drawing with Canvas</p>
                        </div>
                        <div class="content-details fadeIn-bottom">
                          <p class="content-title">Drawing with Canvas</p>
                          <p class="content-text">
                            This is a short description
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-lg-2 mt-5 pl-md-0 pr-md-1 px-2">
          <h2 class="subheader px-2">Sanyam Singh</h2>
          <div class="border-top-pink border-left border-right border-bottom">
            <h2 class="subheader py-2 text-center bg-light">Level 3</h2>
            <h3 class="subheader subheader-small pt-2 px-2">Points/Rankings</h3>
            <div class="px-2">
              <table
                class="subheader subheader-small font-weight-light border px-1 bg-light"
                width="100%"
              >
                <tr class="border-bottom-white">
                  <td width="70%" class="py-1 pl-1">Overall Points:</td>
                  <th width="30%" class="py-1 pl-1">120</th>
                </tr>
                <tr class="border-bottom-white">
                  <td width="70%" class="py-1 pl-1">Overall Rank:</td>
                  <th width="30%" class="py-1 pl-1">7</th>
                </tr>
                <tr>
                  <td width="70%" class="py-1 pl-1">Total Students:</td>
                  <th width="30%" class="py-1 pl-1">36</th>
                </tr>
              </table>
            </div>
            <div class="bg-light mt-4 pb-3">
              <h3 class="subheader subheader-small pt-3 px-2">Coins</h3>
              <div
                class="border mx-2 py-2 bg-none text-center d-flex align-items-center justify-content-center"
              >
                <i class="fas fa-coins fa-3x text-coin"></i>
                <span class="pl-3 subheader subheader-small">45</span>
              </div>
            </div>
            <h3 class="subheader subheader-small py-4 px-2">Achievements</h3>
            <div class="container-fluid my-2 text-center">
            <Tippy content="Attempting a question every day for a week"><div>
                        <center><FontAwesomeIcon icon={faMedal} size="3x" /></center>
                        <center><h5 >Active Badge</h5></center>
                        </div></Tippy>
          
            </div>
            <div class="container-fluid my-2 text-center">
            <Tippy content="Getting 5 consecutive question correct on the first try"><div>
                        <center><FontAwesomeIcon icon={faStar} size="3x"/></center>
                        <center><h5 >Streak Badge</h5></center>
                        </div></Tippy>
            </div>
            <div class="container-fluid my-2 text-center">
            <Tippy content="Reaching the Max Level (10000 pts)"><div>
                        <center><FontAwesomeIcon icon={faTrophy} size="3x"/></center>
                        <center><h5>Master Badge</h5></center>
                        </div></Tippy>
            </div>
            <div class="container-fluid my-2 text-center">
            <Tippy content="Reattempting 5 questions correctly after interactive feedback"><div>
                        <center><FontAwesomeIcon icon={faCertificate} size="3x"/></center>
                        <center><h5>Learner Badge</h5></center>
                        </div></Tippy>
            </div>
            <div>
            <Tippy content="Mastering a concept can get a badge (Conditional statement badge, Loop badge)"><div>
                        <center><FontAwesomeIcon icon={faAward} size="3x"/></center>
                        <center><h5>Concept Badge</h5></center>
                        </div></Tippy>
                        
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
        </div>
    )
}
}
