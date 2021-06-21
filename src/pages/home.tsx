import { getUserPlaylists } from 'services/services';
import Header from 'organisms/header';
import PlayListCards from 'organisms/Playlists';
import { useCallback, useEffect, useState } from 'react';
import { ListPlaylist, HomeComponent } from 'assets/styles';
import { PlayList } from 'assets/interfaces';

export default function Home(){

    // Estado para almacenar las playlists del usuario
    const [playList, setPlayList] = useState<PlayList[]>([]);

    // Función para obtener las playlists del usuario | Parámetros: access_token => [Token de la API de spotify]
    const getPlayList = useCallback(async (access_token) => {
        try{
            const { items } = await getUserPlaylists(access_token);
            setPlayList(items);
        }catch(error){
            console.log("mal");
        }
    }, [])

    // UseEffect para verificar el token y si existe, obtener las playlists
    useEffect(()=> {
        let access_token:string;
        if(!window.localStorage.getItem('tokenInfo')){
          window.localStorage.clear();
          window.location.href = "/";
        }
        else{
          const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '{"error": "Token info is not provided"}');
          access_token = tokenInfo['access_token'];
          getPlayList(access_token);
        }

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
