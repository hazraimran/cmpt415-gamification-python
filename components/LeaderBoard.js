import React, { useEffect, useState } from 'react'
import Profiles from './Profile';
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import {app, db, auth} from '../firebase'

export default function Board() {

    const [period, setPeriod] = useState(0);
    const [LeaderBoard, setLeaderBoard] = useState([]);

    async function callsomeAPI(){
        const q = query(collection(db, "leadership"))

        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        if (querySnapshot.empty) {
            return null
        }
        console.log(querySnapshot.docs[0].data())
        
        var leader = []
        querySnapshot.docs.map(doc => doc.data()).map(async (data)=>{
            console.log(data)
            leader.push({
                dt:data.dt,
                img:data.img,
                location:data.location,
                score:data.score,
                name:data.name
            })
            await setLeaderBoard(leader)
        })
       console.log(LeaderBoard)
    }
    useEffect( ()=>{
        
        callsomeAPI()
        return () => {
            console.log("This will be logged on unmount");
          }
    },[])
    
    const handleClick = (e) => {
        setPeriod(e.target.dataset.id)
    }

    return (
        <div className="board">
            <h1 className='leaderboard'>Leaderboard</h1>
            <div className="duration">
                <button onClick={handleClick} data-id='7'>7 Days</button>
                <button onClick={handleClick} data-id='30'>30 Days</button>
                <button onClick={handleClick} data-id='0'>All-Time</button>
            </div>
            <Profiles Leaderboard={between(LeaderBoard, period)}></Profiles>

        </div>
    )
}



function between(data, between){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data?.filter(val => {
        let userDate = new Date(val.dt);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter?.sort((a, b) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })

}
