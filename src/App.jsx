import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { UserSearch } from './hooks/userSearch'

function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error} = UserSearch()
  const handleSumit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }


  return (
    <div className='page'>

      <header>
        <h1 className='title'>VideoClub</h1>
        <form className='form' onSubmit={handleSumit}> 
          <input onChange={handleChange}value={search}placeholder='The Matrix, Star Wars, Marvel...'>
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
