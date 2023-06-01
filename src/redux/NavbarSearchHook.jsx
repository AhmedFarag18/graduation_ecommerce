import React, { useEffect, useState } from 'react'
import { API_URL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from './slices/products-slice';
import { useNavigate } from 'react-router-dom';

function NavbarSearchHook() {
    const dispatch = useDispatch();
    const [found, setFound] = useState(true);
    const final = useSelector((state) => state.products);
    const [products, setProducts] = useState([]);
    const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || "");
    let [count, setCount] = useState(0);

    const navigate = useNavigate()

    const [brandId, setBrandId] = useState(0);
    const [typeId, setTypeId] = useState(0);
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(count / pageSize);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const onChangeSearch = (e) => {
        setSearchWord(e.target.value);
        localStorage.setItem('searchWord', e.target.value);

        navigate("/products");
    }
    const onChangeBrandId = (e) => {
        setBrandId(e.target.value);
    }
    const onChangeTypeId = (e) => {
        setTypeId(e.target.value);
    }

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            dispatch(getAllProducts(`?PageIndex=${currentPage}&PageSize=${pageSize}${`${brandId ? `&BrandId=${brandId}` : ``}`}${`${typeId ? `&TypeId=${typeId}` : ``}`}${`${localStorage.getItem("searchWord") ? `&Search=${localStorage.getItem("searchWord")}` : ``}`}`))
        }, 1200);
        return () => {
            clearTimeout(debounceSearch);
        }
    }, [searchWord, currentPage, pageSize, brandId, typeId])

    return [onChangeSearch, searchWord, currentPage, totalPages, count, setCount, handlePageChange, pageSize, onChangeBrandId, brandId, onChangeTypeId, typeId];
}

export default NavbarSearchHook