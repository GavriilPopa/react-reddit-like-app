import React from 'react';
import './App.css';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';
import Footer from './features/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
      <Footer />
    </>
  );
}

export default App;
