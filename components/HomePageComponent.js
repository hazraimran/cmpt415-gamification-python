import Editor from "@monaco-editor/react"
import { useRef, useState, useContext, useEffect } from 'react'
import Context from '../context/Context'
import axios from 'axios'
import styles from './Button.module.css'

import CircularProgress from '@material-ui/core/CircularProgress';
  
export default function HomePageComponent(props) {

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
      }
    
      const fillerStyles = {
        height: '100%',
        width: `67%`,
        backgroundColor: 'red',
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }
    
    
    return (
        
        <div className = {styles.box}>
            
        <h2>Introduction to programming<br></br><br></br>
            <div>
        </div>
        
        </h2>
        <ul>
            <li>Conditonal Statement  <CircularProgress  variant="static" value={90} size={15} /> </li>
            <li>Topic Two</li>
            <li>Topic Three</li>
            <li>Topic Four</li>
            <li>Topic Five</li>
            <li>Topic Six</li>
        </ul>
    </div>
    )
}