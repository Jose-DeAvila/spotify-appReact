import SongList from '../molecules/songList';
import { SongListParams } from '../assets/interfaces';

export default function PlaylistItemsMain({playlist_id}: SongListParams){
    return(
        <main>
            <SongList playlist_id={playlist_id}></SongList>
        </main>
    )
}