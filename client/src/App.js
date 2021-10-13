import './App.css';
import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Route } from 'react-router-dom';
import Pokemons from './components/Pokemons/Pokemons';
import Detail from './components/Detail/Detail';
import Landing from './components/Landing/Landing';
import Create from './components/Create/Create';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Pagination/Filter'
import Sort from './components/Pagination/Sort'

function App() {
  return (

    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path={["/pokemons","/search"]} component={NavBar} />
      <Route exact path="/pokemons" component={Filter} />
      <Route exact path="/pokemons" component={Pokemons} />
      <Route exact path="/pokemons" component={Pagination} />

      <Route exact path="/search" render={()=><Pokemons isSearch={true}/>} />
      
      <Route exact path="/pokemons/:id" render={({match,history})=>{
        if(match.params.id === 'create') return <Create />

        else {return <Detail id={match.params.id} /> }  
      }} />
      
      
    </div>
  );
}

export default App;
