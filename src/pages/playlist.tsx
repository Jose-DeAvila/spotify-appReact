import Header from 'organisms/header';
import PlaylistItemsMain from 'organisms/playlistItems';
import SearchInput from 'molecules/searchInput';
import { RouteComponentProps } from 'react-router-dom';
import { TParams } from 'assets/interfaces';

export default function PlaylistItems({match}: RouteComponentProps<TParams>){

    return(
        <>
            <Header />
            <PlaylistItemsMain playlist_id={match.params.id} page={parseInt(match.params.page) || 0} />
            <SearchInput></SearchInput>
        </>
    )
}