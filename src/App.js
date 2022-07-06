import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "55333ede";
  const APP_KEY = "8f428acb254701e7205e6caec22079e0	";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");


  useEffect(() => {
    getRecipes();
  },[query]);


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };


  const updateSearch = e => {
    setSearch(e.target.value);
  }


  const getSearch = e=> {
    e.preventDefault();
    //this prevents refresh
    setQuery(search);
    setSearch("");
  }

  return (
    <div className='App'>

    <form onSubmit={getSearch} className='search-form'>
      <input className='search-bar' placeholder='start typing...' type="text" value={search} onChange={updateSearch}></input>
      <button className='search-button' type="submit">search</button>
    </form>
    <div className='recipes'>
    {(recipes || []).map(recipe => (
      <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} /> ))}
    </div>
  
    </div>
  );
};


export default App;
