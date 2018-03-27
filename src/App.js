import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person.js';

class App extends Component {
  state = {
  	persons: [
  		{name: 'Joe', age: 27, id: 1},
  		{name: 'Jack', age: 28, id: 2},
  		{name: 'Jeffer', age: 29, id: 3}
  	],
    ShowPersons: false
  }

  switchNameHandler = (newName) => {
  	// console.log('Was clicked.')
  	this.setState({
  		persons: [
  			{name: newName, age: 27},
  			{name: 'Jackson', age: 28},
  			{name: 'Jefferson', age: 29}
  		]
  	})
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};

    // const person = Object.assing({}, this.state.persons[personIndex])

    person.name = event.target.value

    const persons = [...this.state.persons];
    persons[personIndex] = person

  	// this.setState({
  	// 	persons: [
  	// 		{name: 'Joseph', age: 27, id: 1},
  	// 		{name: event.target.value, age: 28, id: 2},
  	// 		{name: 'Jefferson', age: 29, id: 3}
  	// 	]
  	// })
    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    // cnst persons = this.state.persons.slice() ---> the approach below is the same.
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState(
        {persons: persons}
      )
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.ShowPersons;
    this.setState({
      ShowPersons: !doesShow
    })
  }

  render() {
  	const style = {
  		backgroundColor: 'green',
      color: 'white',
  		font: 'inherit',
  		border: '1pxx solid blue',
  		padding: '8px',
  		cursor: 'pointer'
  	}

    let persons = null;

    if (this.state.ShowPersons) {
      persons = (
        // index is passed to us for free
        <div>
          {this.state.persons.map((person, index) => {
            return <Person name={person.name} 
            age={person.age} 
            click={() => this.deletePersonHandler(index)} 
            key={person.id} 
            changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        </div>
        );

        style.backgroundColor = 'red'
    }

    let classes = []

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1> Hi, I'm a React App. </h1>
        <p className={classes.join(' ')}> Is this really working? </p>
        <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null,'Hi, I\'m a React App!!!'));
    // ok to do a function call on the button because it only gets executed on click, not immediately.
  }
}

export default Radium(App);

//          <div>
//            <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
//            <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Huertzler')} changed={this.nameChangeHandler}>Yo I'm great!</Person>
//            <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
//          </div>
