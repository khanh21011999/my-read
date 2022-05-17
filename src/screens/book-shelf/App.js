/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as BooksAPI from "../../api/BooksAPI";
import './App.css';

import { Link, Route, useNavigate } from 'react-router-dom';
import Search from '../search/search';



export const bookShelf = [
  "currentlyReading", "wantToRead", "read"
];
export default function BooksApp() {
  const [currentlyReading, setCurrentReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [currentShelf, setCurrentShelf] = useState('');
  const [currentAddedBook, setCurrentAddedBook] = useState('');
  const [testState, setTestState] = useState('');
  const [isShowSearch, setShowSearch] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setCurrentReading(data.filter(item => item.shelf === 'currentlyReading'));
      setWantToRead(data.filter(item => item.shelf === "wantToRead"));
      setRead(data.filter(item => item.shelf === "read"));
    }
    );
  }, []);
  useEffect(() => {
    updateBook(currentAddedBook, currentShelf);
  }, [currentAddedBook, currentShelf]);
  const updateBook = (book, shelf) => {

    // this.setState({
    //   shelf: this.state[shelf].push(book)

    // });
    // 
    if (shelf === bookShelf[0]) {
      BooksAPI.update(book, shelf).then(() => { console.log('success update current read'); });
      const newArr = [...currentlyReading];
      newArr.splice(currentlyReading.length, 0, book);
      setCurrentReading(newArr);



      // setCurrentReading(newArr);
    }
    else if (shelf === bookShelf[1]) {
      BooksAPI.update(book, shelf).then(() => { console.log('success update want to read'); });
      const newArr = [...wantToRead];
      newArr.splice(wantToRead.length, 0, book);
      setWantToRead(newArr);
    }
    else if (shelf === bookShelf[2]) {
      BooksAPI.update(book, shelf).then(() => { console.log('success update read'); });
      const newArr = [...read];
      newArr.splice(read.length, 0, book);
      setRead(newArr);
    }

    else return null;
  };

  console.log("current reading", currentlyReading);
  console.log("want to read", wantToRead);
  console.log("test state", testState);
  return (
    <div className="app">
      {isShowSearch ? (<Search setShowSearch={setShowSearch} currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} />) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">

            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {currentlyReading && currentlyReading.map((item, index) => {
                      return (
                        <div className="book" key={index}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item?.imageLinks?.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={'currentlyReading'} onChange={(e) => {
                                if (e.target.value !== "none") {
                                  setCurrentReading(currentlyReading.filter(itemRead => itemRead.id !== item.id));
                                  setCurrentShelf(e.target.value);
                                  setCurrentAddedBook(item);
                                }
                              }
                              }>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{item?.title}</div>
                          <div className="book-authors">{item?.authors !== undefined ? item?.authors[0] : `Unknown author`}</div>
                        </div>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToRead && wantToRead?.map((item, index) => {
                      return (
                        <div className="book" key={index}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item?.imageLinks?.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={'wantToRead'} onChange={(e) => {
                                if (e.target.value !== "none") {
                                  setWantToRead(wantToRead.filter(itemRead => itemRead.id !== item.id));
                                  setCurrentShelf(e.target.value);
                                  setCurrentAddedBook(item);
                                }
                              }
                              }
                              >
                                <option value="move" disabled>Move to...</option>
                                <option

                                  value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{item?.title}</div>
                          <div className="book-authors">{item?.authors !== undefined ? item?.authors[0] : `Unknown author`}</div>
                        </div>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {read?.map((item, index) => {
                      return (
                        <div className="book" key={index}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item?.imageLinks?.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={'read'} onChange={(e) => {
                                if (e.target.value !== "none") {
                                  setRead(read.filter(itemRead => itemRead.id !== item.id));
                                  setCurrentShelf(e.target.value);
                                  setCurrentAddedBook(item);
                                }
                              }
                              }>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{item?.title}</div>
                          <div className="book-authors">{item?.authors !== undefined ? item?.authors[0] : `Unknown author`}</div>
                        </div>
                      );
                    })}

                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search" onClick={() => {
            setShowSearch(true);
          }}>
            <button >Add a book</button>
          </div>


        </div>
      )}


    </div>
  );
}

