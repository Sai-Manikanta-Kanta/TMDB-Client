import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from 'axios'
import './styles/home.css'

import star from './Assets/star.png';

import search from './Assets/search.png';
export default function Home() {
    const [trendingMoviesData, setTrendingMoviesData] = useState([]);
    const [btnDefault, setBtnDefault] = useState("today");
    const [inputVal, setInputVal] = useState("");
    useEffect(() => {


        if (btnDefault === "today") {
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://tmdb-server-3zdb.onrender.com/movies/trending/day');
                    setTrendingMoviesData(response.data)
                }
                catch (error) {
                    console.error("Error in fetching data")
                }
            }
            fetchData();
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://tmdb-server-3zdb.onrender.com/movies/trending/week');
                    setTrendingMoviesData(response.data)
                }
                catch (error) {
                    console.error("Error in fetching data")
                }
            }
            fetchData();
        }

    }, [btnDefault])
let toggleImage;
    function handleTrendingButton() {
        if (btnDefault === "today") {
            
            setBtnDefault("this week")
        }
        else {
            setBtnDefault("today")
        }
    }
    function handleSearchChange(event) {
        setInputVal(event.target.value)
        //console.log(inputVal)
    }



  const imageBaseUrl='https://image.tmdb.org/t/p/w500'
    const list = trendingMoviesData.map(item =>
        <div><li className="list-item">
            <h1 className="movie-name">Title:{item.title ? item.title : item.name}</h1>
            <img className="star"   src={star}/>
            <h2 className="rating"><span>Rating:{item.vote_average}/10</span></h2>
            <h4 className="release-date">Release Date:{item.release_date}</h4>
            <h5 className="overview">Description: {item.overview}</h5>
            <img className="poster"    src={`${imageBaseUrl}${item.poster_path}`}  alt="Image"     / >
            </li></div>)

    let btn;
    if (inputVal === "") {
        btn = null;
    }
    else {
        btn = <Link to={`/search/${inputVal}`}><button className="search-button">Search</button></Link>
    }
   

    return (
        <div className="whole-wrapper">

            <div className="searchBar-button-wrapper">
                <span className="search-bar-wrapper">
                    <input className="search-bar" placeholder="" value={inputVal} onChange={handleSearchChange} /></span>
                    <span><img className="search-icon"   src={search} /></span>
                <span> {btn}</span>
            </div>
            <div className="trending-wrapper">
                <h3 className="trending">Trending movies {btnDefault}</h3>
                <button className="toggle" onClick={handleTrendingButton}>Toggle</button>
            </div>

            <div className="list-wrapper"><ol>{list}</ol></div>
        </div>
    )
}