import React from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from "./Common/Components/ErrorBoundary";
import Home from "./Home";
import './components/all.sass'
import SEO from "./components/SEO";

function App() {

  const WrapperHome = (props: any) => {
    return(
        <ErrorBoundary>
          <SEO title={"Ideas Mapping"} />
          <Home {...props} />
        </ErrorBoundary>
    )
  }

  return (
      <WrapperHome />
  )

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Invalid URL
          </p>
        </header>
      </div>
  );
}

export default App;
