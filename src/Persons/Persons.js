import React from 'react'
import './Persons.css'
import Radium from 'radium';

const person=(props)=>{
    const buttonStyle={
        backgroundColor:'green',
        color:'white',
        font:'inherit',
        border:'1px solid blue',
        padding:'8px',
        cursor:'pointer',
         ':hover':{
             backgroundColor: 'lightGreen',
             color:'black'
         }
    };
     const personStyle={
       '@media (min-width: 500px)':{
           width:'450px',
      }
     }
    const rand=Math.random();
    if(rand>0.7){
        //throw new Error('Something went Wrong Aman!!');
    }
    return(
        <div className="Person" style={personStyle}>
            <p>I am {props.name} and I am {props.age} years old</p>
            <p>{props.children}</p>
            <button  style={buttonStyle}  key={1} onClick={props.clickToChange}>Click to change name</button>
            <br></br>
            <button style={buttonStyle} key={2} onClick={props.clickToDeletePerson}>Click to Delete Person</button>
            <br></br>
            <input type="text" onChange={props.changed} value={props.name}/>

        </div>
    );
};

export default Radium(person);
//export default person;
