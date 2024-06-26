import { useEffect, useState } from "react";
import StarRating from "./StarRating";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = 'c54cf42c';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [userRating, setUserRating] = useState('');

  function handlesSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
    setUserRating(0);
  }

  function handleClosedMovie() {
    setSelectedId(null);
  }

  function handleGetWatch(movie) {
    if (!watched.find(watchedMovie => watchedMovie.imdbID === movie.imdbID)) {
      //make new array and add movie
      setWatched(watched => [...watched, movie]);
    }
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }



  useEffect(function () {
    //this is cotroller to stop request
    const cotroller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        //add the controler as a second parameter
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, { signal: cotroller.signal });

        if (!res.ok) {
          throw new Error("Something went wrong...")
        }

        const data = await res.json();
        if (data.Response === 'False') throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      }
      catch (err) {
        console.error(err.message);

        //when fetch abort one request will trow error that need to be ignored
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally // this code will always be executed
      {
        setIsLoading(false);
      }
    }

    //when search in is less than 3 symbols will not do anything
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleClosedMovie();
    fetchMovies();

    //cleaning function to use the controller
    return function () {
      cotroller.abort();
    };
  }, [query]); //this effect will render when query is changed

  return (
    <>

      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handlesSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetail selectedId={selectedId} onCloseMovie={handleClosedMovie}
              onAddWatched={handleGetWatch} watched={watched} setUserRating={setUserRating}
              userRating={userRating} /> :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
          }
        </Box>
      </Main>

    </>
  );
}



function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className="error">
    <span>⛔</span>
    {message}
  </p>
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }) {


  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      // value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function Main({ children }) {

  return (
    <main className="main">
      {children}
    </main>
  )
}

function Box({ children }) {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  )
}

// function WatchedBox({ children }) {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   )
// }

function MovieList({ movies, onSelectMovie }) {


  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

function Movie({ movie, onSelectMovie }) {

  // onClick={() => onSelectMovie(movie.imdbID)} set data thats why use () =>
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovieList({ watched, onDeleteWatched }) {

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  )
}

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched, setUserRating, userRating }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //deconstruct the object and save it in movie
  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  const watchedMovie = watched.find(watchedMovie => watchedMovie.imdbID === movie.imdbID);

  function handleAdd() {

    //make new object and give it back to []
    const newWatchMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    }

    onAddWatched(newWatchMovie)
    setUserRating('');
    onCloseMovie();
  }

  //if the key Esc is press to close movieDetails
  useEffect(function () {
    function callback(e) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }


    document.addEventListener('keydown', callback);

    //stop the event listener when the details is closed
    return function () {
      document.removeEventListener('keydown', callback);
    }
  }, [onCloseMovie])


  try {
    useEffect(function () {
      async function GetMovieDetails() {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);

        if (!res.ok) {
          throw new Error("Something went wrong...")
        }

        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      }
      GetMovieDetails();
    }, [selectedId]); // rerendering when selectedID is changed
  }
  catch (error) {
    console.log(error);
  }

  useEffect(function () {
    if (!title) return;

    document.title = `Movie > ${title}`;

    return function () {
      document.title = 'usePopcorn';
    }
  },
    [title]
  );

  return <div className="details">
    {isLoading ? <Loader /> :
      <>
        <header>
          <img src={poster} alt={`Poster of ${movie}`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p>{genre}</p>
            <p>
              <span>⭐</span>
              {imdbRating} IMDB rating
            </p>
          </div>
        </header>
        <section>
          <div className="rating">
            {!watchedMovie ?
              <>
                <StarRating maxRating={10} size={26} onSetRating={setUserRating} />
                {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
              </>
              :
              <p>You rated that movie with {watchedMovie.userRating} ⭐!</p>
            }

          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      </>
    }
  </div >
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  )
}