import logo from './logo.svg';
import './App.css';
import { ProductProvider } from './Contex';
import Home from './Component/Home';
function App() {
  return (
    <div className="App">
      <Home/>
      <ProductProvider/>
     
    </div>
  );
}

export default App;
