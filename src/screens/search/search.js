/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../book-shelf/App.css';
import styles from './search.module.css';
import * as BooksAPI from "../../api/BooksAPI";
import { bookShelf } from "../book-shelf/App";
import { useState } from 'react';
import { useEffect } from 'react';
export default function Search(props) {
    const [queryValue, setQueryValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const location = useLocation();

    const getSearchResult = () => {
        BooksAPI.search(queryValue.toLowerCase()).then(data => {
            const searchFiltered = data.map((item, index) => {
                const matchedData = props.allBook.map((item2, index) => {
                    if (item.id === item2.id) {
                        return item2;
                    }
                    return null;
                });
                const filterNull = matchedData.filter(item => item !== null);
                if (filterNull.length > 0) {
                    return filterNull[0];
                }
                else return { ...item, shelf: "none" };
            });
            setSearchData(searchFiltered);

        });
    };

    useEffect(() => {
        getSearchResult();
    }, [queryValue]);
    const updateBook = (book, shelf) => {
        console.log("book", book);
        console.log("shelf", shelf);
        if (shelf === bookShelf[0]) {
            BooksAPI.update(book, shelf).then(() => { console.log('success update current read'); });
            const newBook = searchData.map((item, index) => {
                if (item.id === book.id) {
                    return {
                        ...item,
                        shelf: shelf
                    };
                }
                return item;
            });
            setSearchData(newBook);
            const newData = [...props.currentlyReading,book];
          
            props.setCurrentReading(newData);
        }
        else if (shelf === bookShelf[1]) {
            BooksAPI.update(book, shelf).then(() => { console.log('success update want to read'); });
            const newBook = searchData.map((item, index) => {
                if (item.id === book.id) {
                    return {
                        ...item,
                        shelf: shelf
                    };
                }
                return item;
            });
            setSearchData(newBook);
            const newData = [...props.wantToRead,book];
          
            props.setWantToRead(newData);
            

        }
        else if (shelf === bookShelf[2]) {
            BooksAPI.update(book, shelf).then(() => { console.log('success update read'); });
            const newBook = searchData.map((item, index) => {
                if (item.id === book.id) {
                    return {
                        ...item,
                        shelf: shelf
                    };
                }
                return item;
            });
            setSearchData(newBook);
            const newData = [...props.read,book];
          
            props.setRead(newData);
        }
        else return null;
    };
    return (
        <div>
            <div className="search-books">
                <div className="search-books-bar">
                    <button onClick={() => { props.setShowSearch(false); }} className="close-search" >Close</button>
                    <div className="search-books-input-wrapper">
                        <input onChange={(e) => {
                            setQueryValue(e.target.value);
                        }} type="text" placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>

            <div className={styles['book-search-container']}>
                {Array.isArray(searchData) ? (searchData?.map((item, index) => {
                    return (
                        <div className={styles['book-item-container']} key={index}>
                            <div className={styles['book-search-item']} style={{ width: 128, height: 193, backgroundImage: `url(${item?.imageLinks?.thumbnail})` }}>
                                <div className={styles['book-search-changer']}>
                                    <select
                                        value={item.shelf === undefined ? "none" : item.shelf}
                                        onChange={(e) => {
                                            if (e.target.value !== "none") {
                                                updateBook(item, e.target.value);
                                              
                                            }
                                        }}
                                    >
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles['title-and-author-container']}>
                                <div className={styles['book-title']}>{item?.title}</div>
                                <div className={styles['book-author']}>{item?.authors !== undefined ? item?.authors[0] : `Unknown author`}</div>
                            </div>
                        </div>


                    );
                })) : (
                    <div>
                        No result found
                    </div>
                )}

            </div>
        </div>

    );
}
