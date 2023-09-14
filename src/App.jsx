import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { UserSearch } from './hooks/userSearch'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [ sort, setSort ] = useState(false)
  const { search, updateSearch, error} = UserSearch()
  const { movies , loading, getMovies } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
    getMovies({search});
  },500),[getMovies])


  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <h1 className='title'>VideoClub</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <label>
            <input
              type='checkbox'
              onChange={handleSort}
              checked={sort}
            />
            Clasificar
          </label>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
