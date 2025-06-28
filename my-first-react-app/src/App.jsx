import React from 'react'
import Search from './components/Search'

const App = () => {
const[searchTerm, setSearchTerm] = React.useState('');

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="mainhero.png" alt="Hero Banner" className="w-55 sm:w-64 mx-auto" />
          <h1>Find <span className="text-gradient">Movies </span>You'll Enjoy Without The Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
