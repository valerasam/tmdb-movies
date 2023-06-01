import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { UpcomingResult } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import MovieResult from './MovieResult'

interface CarouselProps {
    items: UpcomingResult[]
}

const Carousel = (props: CarouselProps) => {
    const settings = {
        dots: false,
        fade: false,
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        // arrows: null,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    }

    return (
        <Slider {...settings}>
            {props.items.map(movie => {
                if (movie.poster_path && movie.title) {
                    return <MovieResult movie={movie} key={movie.title} />
                }
            })}
        </Slider>
    )
}

export default Carousel
