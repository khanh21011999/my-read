import React from "react";
import { Link } from "react-router-dom";
import '../book-shelf/App.css';
import styles from './search.module.css';
import * as BooksAPI from "../../api/BooksAPI";
import { bookShelf } from "../book-shelf/App";
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryValue: '',
            searchData: []
        };
    }
    getSearchResult = () => {
        BooksAPI.search(this.state.queryValue.toLowerCase()).then(data => this.setState({ searchData: data }));

    };
    updateBook = (book, shelf) => {

        // this.setState({
        //   shelf: this.state[shelf].push(book)

        // });
        console.log("book", book);
        console.log("shelf", shelf);
        if (shelf === bookShelf[0]) {
            BooksAPI.update(book, shelf).then(() => { console.log('success update current read'); });

        }
        else if (shelf === bookShelf[1]) {
            BooksAPI.update(book, shelf).then(() => { console.log('success update want to read'); });

        }
        else if (shelf === bookShelf[2]) {
            BooksAPI.update(book, shelf).then(() => { console.log('success update read'); });

        }

        else return null;
    };
    render() {
        console.log();
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to={'/'}>
                            <button className="close-search" >Close</button>
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input onChange={(e) => {
                                this.setState({
                                    queryValue: e.target.value
                                }, () => {
                                    this.getSearchResult();
                                });

                            }} type="text" placeholder="Search by title or author" />

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>

                <div className={styles['book-search-container']}>
                    {this.state.searchData?.length > 0 ? (this.state.searchData?.map((item, index) => {
                        return (
                            <div className={styles['book-item-container']} key={index}>
                                <div className={styles['book-search-item']} style={{ width: 128, height: 193, backgroundImage: `url(${item?.imageLinks?.thumbnail})` }}>
                                    <div className={styles['book-search-changer']}>
                                        <select
                                            value={'none'}
                                            onChange={(e) => {
                                                if (e.target.value !== "none") {
                                                    this.updateBook(item, e.target.value);
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
}