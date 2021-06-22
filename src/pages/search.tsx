import Header from 'organisms/header';
import SearchMain from 'organisms/search';
import SearchInput from 'molecules/searchInput';
import { RouteComponentProps } from 'react-router-dom';
import { TParams } from 'assets/interfaces';

export default function PlaylistItems({match}: RouteComponentProps<TParams>){

    console.log(match.params.page);

    return(
        <>
            <Header />
            <SearchMain keyword={match.params.keyword} page={parseInt(match.params.page) || 0} />
            <SearchInput></SearchInput>
        </>
    )
}