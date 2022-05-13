import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
const bookShelf = [
  "currentlyReading", "wantToRead", "read"
];
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      allBook: [],
      read: [],
      showSearchPage: false,
      onChangeValue: 'read',
  
    };
  }


  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        currentlyReading: data.filter(item => item.shelf === 'currentlyReading'),
        wantToRead: data.filter(item => item.shelf === "wantToRead"),
        read: data.filter(item => item.shelf === "read")
      });
    }
    );
  }
  // componentDidUpdate(prevProps,prevState){
  //   if(prevState.currentlyReading!==this.state.currentlyReading){
  //     this.setState({
  //       currentlyReading: ,
       
  //     });
  //   }
  // }


  // componentDidUpdate(prevProps,prevState){
  //   if(prevState!==this.state){

  //   }
  // }
  //TODO fetch data later, for now just use state
  updateBook = (book, shelf) => {

    // this.setState({
    //   shelf: this.state[shelf].push(book)

    // });
   
    if (shelf === bookShelf[0]) {
      BooksAPI.update(book, shelf).then(() => { console.log('success update current read'); });
      
     this.setState({
      shelf: this.state[shelf].push(book)
      
    });
      
    }
    else if (shelf === bookShelf[1]) {
      BooksAPI.update(book, shelf).then(() => { console.log('success update want to read'); });
      this.setState({
        shelf: this.state[shelf].push(book)
      });
    }
    else if (shelf === bookShelf[2]) {
      BooksAPI.update(book, shelf).then(() => { console.log('success update read'); });
      this.setState({
        shelf: this.state[shelf].push(book)
      });
    }

    else return null;
  };
  render() {
    console.log("track update",this.state.currentlyReading);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
                      {this.state.currentlyReading.map((item, index) => {
                        return (
                          <div className="book" key={index}>
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={'currentlyReading'} onChange={(e) => {
                                  this.setState({
                                    currentlyReading: this.state.read.filter(itemRead => itemRead.id !== item.id),
                                    onChangeValue: e.target.value
                                  },
                                    () => {
                                      this.updateBook(item, this.state.onChangeValue);
                                    });
                                }}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{item.title}</div>
                            <div className="book-authors">{item.authors[0]}</div>
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
                      {this.state.wantToRead.map((item, index) => {
                        return (
                          <div className="book" key={index}>
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={'wantToRead'} onChange={(e) => {
                                  this.setState({
                                    wantToRead: this.state.read.filter(itemRead => itemRead.id !== item.id),
                                    onChangeValue: e.target.value
                                  },
                                    () => {
                                      this.updateBook(item, this.state.onChangeValue);
                                    });
                                }}>
                                  <option value="move" disabled>Move to...</option>
                                  <option

                                    value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{item.title}</div>
                            <div className="book-authors">{item.authors[0]}</div>
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
                      {this.state.read.map((item, index) => {
                        return (
                          <div className="book" key={index}>
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={'read'} onChange={(e) => {
                                  this.setState({
                                    read: this.state.read.filter(itemRead => itemRead.id !== item.id),
                                    onChangeValue: e.target.value
                                  },
                                    () => {
                                      this.updateBook(item, this.state.onChangeValue);
                                    });
                                }}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{item.title}</div>
                            <div className="book-authors">{item.authors[0]}</div>
                          </div>
                        );
                      })}

                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
