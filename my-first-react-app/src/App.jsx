import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;


      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.success === false || !data.results) {
        setErrorMessage('No results found.');
        setMovieList([]);
        return;
      }

      setMovieList(data.results);

      if(query && data.results.length > 0) {
        // Update search count in Appwrite
        await updateSearchCount(query, data.results[0]);
      } 

    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try{
      const movies=await getTrendingMovies();

      setTrendingMovies(movies);

   }catch(error) {
      console.error('Error fetching trending movies:', error);
    }
  }

  // Initial fetch for popular movies
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    // Load trending movies on initial render
    loadTrendingMovies();
  }, []);

  // Form submit handler
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img
            src="mainhero.png"
            alt="Hero Banner"
            className="w-48 sm:w-64 mx-auto"
          />
          <h1>
            Find <span className="text-gradient">Movies </span>
            You'll Enjoy Without The Hassle
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
              <h2>Treding Movies</h2>

              <ul>
                {trendingMovies.map((movie,index) => (
                  <li key={movie.$id}>
                    <p>{index+1}</p>
                    <img src={movie.poster_url} alt={movie.title}/>
                  </li>
                ))}

              </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
