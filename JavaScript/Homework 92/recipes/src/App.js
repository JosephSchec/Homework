import { Component } from 'react';
import './App.css';
import ClickCounter from './ClickCounter';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';

class App extends Component {

  state = {
    recipes: [
      {
        id: 1,
        name: 'Pizza',
        ingredients: ['dough', 'sauce', 'cheese'],
        directions: ['mix', 'bake', 'eat'],
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JYpBhrj2uXf8FBgOKr1QYJJIMXifn9QRkA&usqp=CAU'
      },
      {
        id: 2,
        name: 'Burger',
        ingredients: ['bun', 'meat', 'veggies'],
        directions: ['grill', 'set', 'eat'],
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDht4KDgE3sFPzI8Px574uLnqMpOsljLdnKg&usqp=CAU'
      }
    ],
    selectedRecipe: 0
  }

  selectedRecipe = (index) => {
    this.setState({
      selectedRecipe: index
    });

  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='text-center'>
          <h1>Class Recipes</h1>
          <hr />
          <h4>Recipes</h4>
          <RecipeList recipes={this.state.recipes} selectedRecipe={this.selectedRecipe} />
          <hr />
          <RecipeDetails recipe={this.state.recipes[this.state.selectedRecipe]} />
          <hr />
          <ClickCounter />
        </div>
      </div>
    );
  }
}

export default App;
