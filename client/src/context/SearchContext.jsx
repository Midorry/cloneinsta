import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = useState([]);

    const searchInput = async (inputs) => {
        await axios
            .get(`http://localhost:3002/api/product/search?name=${inputs}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const filterPrice = async (min, max) => {
        await axios
            .get(
                `http://localhost:3002/api/product/price?min=${min}&max=${max}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    accept: "application/json",
                }
            )
            .then(function (response) {
                console.log(response);
                if (response.data.length == 0) {
                    setValueSearch(valueSearch);
                } else {
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const searchCategory = async (value) => {
        await axios
            .get(`http://localhost:3002/api/product/search?category=${value}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const sortPrice = async (value) => {
        await axios
            .get(`http://localhost:3002/api/product/search?price=${value}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const sortDate = async () => {
        // console.log(valueSearch);
        // sortValueSearch = valueSearch.sort(function (a, b) {
        //     // Convert the date strings to Date objects
        //     let dateA = new Date(a.createdAt);
        //     let dateB = new Date(b.createdAt);

        //     // Subtract the dates to get a value that is either negative, positive, or zero
        //     return dateB - dateA;
        // });
        // setValueSearch(sortValueSearch);
        // console.log(sortValueSearch);
        await axios
            .get(`http://localhost:3002/api/product/search?new=true`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getAllProducts = async () => {
        await axios
            .get(`http://localhost:3002/api/product`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setValueSearch(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const value = {
        searchInput,
        searchCategory,
        sortPrice,
        sortDate,
        getAllProducts,
        filterPrice,
        setValueSearch,
        valueSearch,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
export default SearchProvider;
