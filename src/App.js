import React, { Component } from 'react';
import './App.css';
import Persons from './Persons/Persons';
import ErrorBoundary from './ErrorBoundary';

import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state={
    persons:[
      {id:1, name:"Aman", age:31},
      {id:2, name:"Roza", age:23},
      {id:3, name:"Tansen", age:29}
    ],
    showPersons:false,
  };


  SwitchNameHandler=(newName)=>{
    this.setState({
      persons:[
        {id:1, name:newName, age:32},
        {id:2, name:"Roza Azim", age:24},
        {id:3, name:"Tansen Khan", age:30}
      ]
    });
  };


  ChangeNameHandler=(event, id)=>{
    const personIndex=this.state.persons.findIndex((per)=>{ return per.id===id});

    const onePerson={...this.state.persons[personIndex]};
    //const onePerson=Object.assign({}, this.state.persons[personIndex]);
    onePerson.name=event.target.value;

    const neWpersons=[...this.state.persons];
    neWpersons[personIndex]=onePerson;

    this.setState({persons:neWpersons});
  };


  togglePersonsHandler=()=>{
    const doesShow=this.state.showPersons;
    this.setState({showPersons:!doesShow});
  };


  deletePersonsHandler=(index)=>{
    //const neWpersons=this.state.persons;
    //const neWpersons=this.state.persons.splice();
    const neWpersons=[...this.state.persons];
    neWpersons.splice(index, 1);
    this.setState({persons:neWpersons});
  };


  render() {
     const buttonStyle={
           backgroundColor:'brown',
           color:'white',
           font:'inherit',
           border:'1px solid blue',
           padding:'8px',
           cursor:'pointer',
           ':hover':{
             backgroundColor: 'lightBlue',
             color:'black'
           }
       };
    let persons=null;
    let btnClass='';
    if(this.state.showPersons){
      persons=(
          this.state.persons.map((per, index)=>{
              return( <div key={per.id}>
                        <ErrorBoundary>
                            <Persons name={per.name}
                                     age={per.age}
                                     changed={(event)=>{this.ChangeNameHandler(event, per.id)}}
                                     clickToChange={this.SwitchNameHandler.bind(this, 'Bobo')}
                                     clickToDeletePerson={()=>{this.deletePersonsHandler(index)}}>f</Persons>
                        </ErrorBoundary>
                      </div> );
          })
      );
      buttonStyle.backgroundColor='red';
      buttonStyle[':hover']={
           backgroundColor:'salmon',
          color:'black'
      }
    }

    let classes1=['red', 'bold'].join(' ');
    let classes2=[];

    if(this.state.persons.length<=2)
    {
      classes2.push('red');
    }
    if(this.state.persons.length<=1)
    {
      classes2.push('bold');
    }

    return (

        <div className="App">
          <h1>Persons Info</h1>
          <p className={classes1}>This is working</p>
          <p className={classes2.join(' ')}>This is working too</p>

          <button style={buttonStyle} key={1} onClick={()=>this.SwitchNameHandler('Azim')}>Switch Name</button>
          <br></br>

          <button style={buttonStyle} key={2} onClick={this.togglePersonsHandler}>Toggle Persons</button>

            <StyleRoot>
                {persons}
            </StyleRoot>


          <hr></hr>
            <StyleRoot>
                <Persons name={this.state.persons[0].name}
                         age={this.state.persons[0].age}
                         clickToChange={this.SwitchNameHandler.bind(this, 'Rumman')}/>

                <Persons name={this.state.persons[1].name}
                         age={this.state.persons[1].age}
                         clickToChange={this.SwitchNameHandler.bind(this, 'Rumman-from child2 comp')}
                         changed={(event)=>{this.ChangeNameHandler(event, this.state.persons[1].id)}}>My Hobby: Playing</Persons>

                <Persons name="Tansen" age="29"/>
                <div className="App body">I am global</div>
            </StyleRoot>

        </div>

    );
    //return React.createElement('div', {className:'App'}, React.createElement('h1', null,'Hi, I\'m a React App'));
  }
}

export default Radium(App);
//export default App;
