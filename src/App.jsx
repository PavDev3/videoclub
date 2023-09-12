import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const { movies } = useMovies()
  const inputRef = useRef()
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  const handleSumit = (event) => {
    event.preventDefault()
    console.log({ query })
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if ( newQuery.starsWith(' ')) return 
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (query === '') {
      setError('No se puede buscar la pelicula')
      return
    }
    if (query.match (/^\d+$/)) {
      setError('No se puede buscar por un numero')
      return
    }
    if (query.length < 3) {
      setError('No se puede buscar por menos de 3 caracteres')
      return
    }
    setError(null)
  },[query])

  return (
    <div className='page'>

      <header>
        <h1 className='title'>VideoClub</h1>
        <form className='form' onSubmit={handleSumit}> 
          <input onChange={handleChange}value={query}placeholder='The Matrix, Star Wars, Marvel...'>
          </input>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
