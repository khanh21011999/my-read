import React from 'react';
import {
    BrowserRouter, Routes,
    Route,
} from "react-router-dom";
import App from "../screens/book-shelf/App";
import Search from '../screens/search/search';



export default function Navigation() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='search' element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}