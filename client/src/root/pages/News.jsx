import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const News = () => {
    const [news, setNews] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [newsLatest, setNewsLatest] = useState();
    const [cardsPerPage] = useState(4);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentNews = news?.slice(indexOfFirstCard, indexOfLastCard);
    console.log((news?.length / 4).toFixed());

    // Change page
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // console.log(cardsPerPage, movieCard.length, paginate);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const getNewsLatest = async () => {
        await axios
            .get(`http://localhost:3002/api/news/recent?new=true`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setNewsLatest(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getAllNews = async () => {
        await axios
            .get("http://localhost:3002/api/news/", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                console.log(response.data[0].createdAt);
                setNews(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
        // forceUpdate();
    };

    useEffect(() => {
        getAllNews();
        getNewsLatest();
    }, []);

    return (
        <>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>News</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="blog__sidebar">
                                <div className="blog__sidebar__search">
                                    <form action="#">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                        />
                                        <button type="submit">
                                            <span className="icon_search"></span>
                                        </button>
                                    </form>
                                </div>
                                <div className="blog__sidebar__item">
                                    <h4>Recent News</h4>
                                    <div className="blog__sidebar__recent">
                                        {newsLatest?.map((recent, index) => (
                                            <a
                                                key={index}
                                                href="#"
                                                className="blog__sidebar__recent__item"
                                            >
                                                <div className="blog__sidebar__recent__item__pic">
                                                    <img
                                                        src={`http://localhost:3002/assets/${recent.image}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="blog__sidebar__recent__item__text">
                                                    <h6>{recent.title}</h6>
                                                    <span>
                                                        {new Date(
                                                            recent.createdAt
                                                        ).toDateString()}
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="row">
                                {currentNews?.map((n, index) => (
                                    <div
                                        key={index}
                                        className="col-lg-6 col-md-6 col-sm-6"
                                    >
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img
                                                    src={`http://localhost:3002/assets/${n?.image}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="blog__item__text">
                                                <ul>
                                                    <li>
                                                        <i className="fa fa-calendar-o"></i>{" "}
                                                        {new Date(
                                                            n.createdAt
                                                        ).toDateString()}
                                                    </li>
                                                </ul>
                                                <h5>
                                                    <NavLink
                                                        className="blog__title"
                                                        to={`/news-detail/${n._id}`}
                                                    >
                                                        {n.title}
                                                    </NavLink>
                                                </h5>
                                                <p className="blog__desc">
                                                    {}
                                                    {n.desc}
                                                </p>
                                                <NavLink
                                                    to={`/news-detail/${n._id}`}
                                                    className="blog__btn"
                                                >
                                                    READ MORE{" "}
                                                    <span className="arrow_right"></span>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="col-lg-12">
                                    <Pagination
                                        count={(
                                            news?.length / 4 +
                                            0.4
                                        ).toFixed()}
                                        page={currentPage}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default News;
