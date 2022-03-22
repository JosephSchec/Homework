
import './App.css';
import Posts from './Posts';
function App() {

  return (
    <div className="App">
       <form action='/posts' method='POST'>
            Name: <input name='name'></input>
            Blog: <textarea name='blog'></textarea>
            <button >submit</button>
        </form>
      <Posts />
    </div>
  );
}

export default App;
