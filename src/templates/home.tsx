import { getUserPlaylists } from '../services/services';
import Header from '../organisms/header';
import PlayListCards from '../organisms/Playlists';
import { useCallback, useEffect, useState } from 'react';
import { ListPlaylist, HomeComponent } from '../assets/styles';
import { PlayList } from '../assets/interfaces';

export default function Home(){
    const [playList, setPlayList] = useState<PlayList[]>([]);
    
    const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '');
    const access_token:string = tokenInfo['access_token'];

    const getPlayList = useCallback(async () => {
        try{
            const { items } = await getUserPlaylists(access_token);
            setPlayList(items);
        }catch(error){
            console.log("mal");
        }
    }, [access_token])

    useEffect(()=> {
        const {error} = JSON.parse(window.localStorage.getItem('tokenInfo') || '');
        if(error){
          window.localStorage.clear();
          window.location.href = "/";
        }
        getPlayList();
    }, [getPlayList]);

    return(
        <>
            <Header></Header>
            <HomeComponent>
                <h2>Playlists:</h2>
                <ListPlaylist>
                  {
                    playList ?
                    playList.map(playlistInfo => {
                      const {images} = playlistInfo;
                      return(
                        <PlayListCards key={playlistInfo.id}
                          playlist_name={playlistInfo.name} 
                          playlist_id={playlistInfo.id} 
                          playlist_image={images[0]} 
                          playlist_description={playlistInfo.description} 
                          ownerInfo={playlistInfo.owner} 
                        />
                      )
                    })
                    :
                    <h1>No hay playlists</h1>
                  }
                </ListPlaylist>
            </HomeComponent>
        </>
    )
}
