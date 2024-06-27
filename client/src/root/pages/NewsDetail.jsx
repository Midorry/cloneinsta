import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const NewsDetail = () => {
    const [news, setNews] = useState();
    const [allNews, setAllNews] = useState();
    const [newsLatest, setNewsLatest] = useState();
    const [next, setNext] = useState(false);

    const id = useParams();
    console.log(id);

    const getNews = async () => {
        await axios
            .get(`http://localhost:3002/api/news/${id.id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setNews(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getNewsLatest = async () => {
        await axios
            .get(`http://localhost:3002/api/news?new=true`, {
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
                setAllNews(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
        // forceUpdate();
    };

    useEffect(() => {
        getNews();
        getAllNews();
        getNewsLatest();
    }, [next]);

    return (
        <>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>News Detail</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-5 order-md-1 order-2">
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
                        <div className="col-lg-8 col-md-7 order-md-1 order-1">
                            <div className="blog__details__text">
                                <div className="flex items-center justify-between">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o"></i>{" "}
                                            {new Date(
                                                news?.createdAt
                                            ).toDateString()}
                                        </li>
                                    </ul>
                                    <div className="blog__details__widget">
                                        <h5>Chia sẻ bằng:</h5>
                                        <div className="blog__details__social">
                                            <a href="#">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-google-plus"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-linkedin"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-envelope"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center flex-col">
                                    <h3>{news?.title}</h3>
                                    <img
                                        src={`http://localhost:3002/assets/${news?.image}`}
                                        alt=""
                                    />
                                    <p>{news?.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="related-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title related-blog-title">
                                <h2>Bài viết bạn có thể thích</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {allNews?.map((news, index) => (
                            <div
                                key={index}
                                className="col-lg-4 col-md-4 col-sm-6"
                            >
                                <div className="blog__item">
                                    <div className="blog__item__pic">
                                        <img
                                            src={`http://localhost:3002/assets/${news?.image}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="blog__item__text">
                                        <ul>
                                            <li>
                                                <i className="fa fa-calendar-o"></i>{" "}
                                                {new Date(
                                                    news.createdAt
                                                ).toDateString()}
                                            </li>
                                        </ul>
                                        <h5>
                                            <NavLink
                                                className="blog__title"
                                                to={`/news-detail/${news._id}`}
                                                onClick={() => setNext(!next)}
                                            >
                                                {news.title}
                                            </NavLink>
                                        </h5>
                                        <p className={`blog__desc`}>
                                            {news.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewsDetail;
