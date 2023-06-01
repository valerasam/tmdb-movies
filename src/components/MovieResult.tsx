import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { UpcomingResult } from '../App'

interface CarouselProps {
    movie: UpcomingResult
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    },
}

const apiKey = '2ca7f2c0e4c9c3fc00fb23962898cadb'

const MovieResult = (props: CarouselProps) => {
    const [externalId, setExternalId] = useState('')

    const [netflixLink, setNetflixLink] = useState('')

    const getMovie = (id: string) => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=pl-PL&api_key=${apiKey}`,

            options
        )
            .then(response => response.json())

            .then(response => {
                console.log(response)
            })

            .catch(err => console.error(err))
    }

    useEffect(() => {
        // console.log('props.movie: ', props.movie)
        // fetch(
        //     `https://api.themoviedb.org/3/movie/${props.movie.id}/external_ids?api_key=${apiKey}`,

        //     options
        // )
        //     .then(response => response.json())

        //     .then(response => {
        //         setExternalId(response.imdb_ID)
        //     })

        //     .catch(err => console.error(err))
        const fetchNetflixLink = () => {
            fetch(
                `https://apis.justwatch.com/contentpartner/v2/content/titles/movie/tmdb/${props.movie.id}/locale/pl_PL`,

                options
            )
                .then(response => response.json())

                .then(response => {
                    console.log(response)
                })

                .catch(err => console.error(err))
        }

        fetchNetflixLink()
    }, [])

    return (
        <div
            className='w-[200px]'
            onClick={() => getMovie(props.movie.id.toString())}
        >
            <img
                className='w-[200px] h-[300px] mb-2'
                src={`https://image.tmdb.org/t/p/w185${props.movie.poster_path}`}
            />
            <p className='text-mainFontColor text-lg text-ellipsis overflow-hidden  w-[200px] whitespace-nowrap'>
                {props.movie.title}
            </p>
            <p className='flex items-baseline text-auxFontColor text-sm gap-2'>
                <FontAwesomeIcon icon={faCalendar} />
                {props.movie.release_date}
            </p>
        </div>
    )
}

export default MovieResult
