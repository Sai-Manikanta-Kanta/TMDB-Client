import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './styles/home.css'
import home from './Assets/home.png';
import star from './Assets/star.png';
export default function Search() {
    const [moviesList, setMoviesList] = useState([]);
    const { movieName } = useParams();

    useEffect(() => {



        //console.log(movieName)
        const fetchData = async () => {
            try {
                const response = await axios.get('https://tmdb-server-3zdb.onrender.com/search/movies/' + movieName);
                setMoviesList(response.data)
            }
            catch (error) {
                console.error("Error in fetching data")
            }
        }
        fetchData();



    }, [])
    let list;
    if (moviesList.length === 0) {
        list = <h3  className="list-item">No Movies Found</h3>
    }
    else {
        const imageBaseUrl='https://image.tmdb.org/t/p/w500'
         list = moviesList.map(item =>
            <div><li className="list-item">
                <h1 className="movie-name">Title:{item.title ? item.title : item.name}</h1>
                <img className="star"   src={star}/>
                <h2 className="rating"><span>Rating:{item.vote_average}/10</span></h2>
                <h4 className="release-date">Release Date:{item.release_date}</h4>
                <h5 className="overview">Description: {item.overview}</h5>
                <img className="poster"    src={`${imageBaseUrl}${item.poster_path}`}   alt="Image"     / >
                </li></div>)
    }

    return (
        <div className="whole-wrapper1">
            <h1 className="matching-text">Matching Movies List</h1>
            <Link to="/"> <img src={home} className="home-icon"   /></Link>
            <ol className="list-warpper">{list}</ol>

        </div>
    )
}