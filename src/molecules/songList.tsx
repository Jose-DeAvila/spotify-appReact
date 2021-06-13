import { useEffect, useCallback, useState } from 'react';
import { getPlaylistItems } from '../services/services';
import BannerTrack from '../atoms/bannerSong';
import Songtitle from '../atoms/songTitle';
import { ListOfSongs, SongInfo, SongNumber, NameAndArtist, BtnPlay, NoSongs } from '../assets/styles';
import { SongListParams, SongInfoInt } from '../assets/interfaces';

export default function SongList({playlist_id}: SongListParams){

    const [songList, setSongList] = useState<SongInfoInt[]>([]);

    const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '');
    const access_token:string = tokenInfo['access_token'];

    const fetchPlayListItems = useCallback( async () => {
        const { items } = await getPlaylistItems(access_token, playlist_id);
        setSongList(items);
    }, [playlist_id, access_token]);

    useEffect(() => {
        fetchPlayListItems();
    }, [fetchPlayListItems]);

    return(
        <ListOfSongs>
            {
                songList.length > 0 
                ? 
                songList.map((songListInfo, index) => {
                    return(
                        <SongInfo key={songListInfo.track.id}>
                            <SongNumber>{index+1}.</SongNumber>
                            <BannerTrack bannerUrl={songListInfo.track.album.images[2].url}></BannerTrack>
                            <NameAndArtist style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>
                                <Songtitle titleSong={songListInfo.track.name}></Songtitle>
                                <Songtitle titleSong={songListInfo.track.artists[0].name}></Songtitle>
                            </NameAndArtist>
                            <BtnPlay rel="noreferrer" target="_blank" href={songListInfo.track.external_urls.spotify}><i className="fas fa-play"></i></BtnPlay>
                        </SongInfo>
                    )
                })
                :
                <NoSongs>No hay canciones disponibles</NoSongs>
            }
        </ListOfSongs>
    )
}