import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Carousel from './components/Carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
export interface UpcomingResult {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    },
}

const App = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')
    const [upcomingMovies, setUpcomingMovies] = useState<UpcomingResult[]>([])
    const [resultsLoaded, setResultsLoaded] = useState<boolean>(false)
    const [results, setResults] = useState<UpcomingResult[]>([])
    console.debug('results: ', results)

    const getTopRatedMovies = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pl-PL&page=1`,

            options
        )
            .then(response => response.json())

            .then(response => setUpcomingMovies(response.results))

            .catch(err => console.error(err))
    }
    const searchMoviesForQuery = (query: string) => {
        setSearchValue(query)
        setResultsLoaded(false)
        fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&language=en-US&page=1`,
            options
        )
            .then(response => response.json())

            .then(response => {
                setResults(response.results)
                setResultsLoaded(true)
            })

            .catch(err => console.error(err))
    }

    useEffect(() => {
        getTopRatedMovies()
    }, [])

    return (
        <div className='h-screen w-full bg-slate-600'>
            <div className='flex justify-start items-center bg-bgNavBar px-10 py-4'>
                <h1 className='mr-6 text-mainFontColor text-2xl font-medium'>
                    TMDB
                </h1>
                <input
                    className='w-[300px] rounded-full px-3 py-1 mr-6'
                    placeholder='Search for movies ...'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button
                    className='text-mainFontColor text-xl'
                    onClick={() => searchMoviesForQuery(inputValue)}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className='bg-bgGray w-full px-10 py-10'>
                <section className='flex flex-col justify-center mb-[100px]'>
                    <p className='text-mainFontColor text-2xl font-medium mb-5 ml-4'>
                        Upcoming
                    </p>
                    <Carousel items={upcomingMovies} />
                </section>
                {resultsLoaded && (
                    <section className='flex flex-col justify-center mb-[100px]'>
                        {results.length > 0 ? (
                            <>
                                <p className='text-mainFontColor text-2xl font-medium mb-5 ml-4'>
                                    Search results for query: {searchValue}
                                </p>
                                <Carousel items={results} />
                            </>
                        ) : (
                            <p>No results for your query: {searchValue}</p>
                        )}
                    </section>
                )}
            </div>
        </div>
    )
}

export default App
