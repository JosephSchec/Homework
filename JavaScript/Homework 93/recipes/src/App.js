import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import ClickCounter from './ClickCounter';
import Header from './Header';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';
import recipeJson from './recipes.json'


export default function App() {

  return (
    <div className='container-fluid'>
      <div className='text-center'>
        <Header />

        <h4>Recipes</h4>
        <Routes>
          <Route index element={<RecipeList recipes={recipeJson} />} />

          <Route path='/recipe/:id' element={<RecipeDetails />} />

          <Route path='*' element={ <Navigate to='/' replace='true' />} />

        </Routes>
        <Outlet />
        <hr />
        <ClickCounter />
      </div>
    </div>
  );
}


