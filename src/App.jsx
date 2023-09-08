import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const { movies: mappedgMovies } = useMovies()


  return (
    <div className='page'>

      <header>
        <h1 className='title'>VideoClub</h1>
        <form className='form'> 
          <input placeholder='The Matrix, Star Wars, Marvel...'>
          </input>
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedgMovies}/>
      </main>
    </div>
  )
}

export default App
