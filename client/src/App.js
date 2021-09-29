import './App.css';
import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Route } from 'react-router-dom';
import Pokemons from './components/Pokemons/Pokemons';
import Detail from './components/Detail/Detail';
import Landing from './components/Landing/Landing';
import Create from './components/Create/Create';

function App() {
  return (

    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/pokemons" component={NavBar} />
      <Route exact path="/pokemons" component={Pokemons} />
      <Route path="/pokemons/:id" render={({match})=>{
        if(match.params.id === 'create') return <Create />
        else {return <Detail id={match.params.id} /> }  
      }} />
      
    </div>
  );
}

export default App;
