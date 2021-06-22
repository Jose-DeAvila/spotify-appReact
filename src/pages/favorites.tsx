import Header from 'organisms/header';
import FavoritesMain from 'organisms/favorites';
import SearchInput from 'molecules/searchInput';
import { RouteComponentProps } from 'react-router-dom';
import { TParams } from 'assets/interfaces';
import { useEffect } from 'react';

export default function Favorites({match}:RouteComponentProps<TParams>){

    // UseEffect para verificar el token info y la infomación del usuario
    useEffect(()=> {
        if(!window.localStorage.getItem('tokenInfo') || !window.localStorage.getItem('userInfo')){
          window.localStorage.clear();
          window.location.href = "/";
        }
    }, []);

    return(
        <>
            <Header />
            <FavoritesMain page={parseInt(match.params.page) || 0}/>
            <SearchInput></SearchInput>
        </>
    )
}