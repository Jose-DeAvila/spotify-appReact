import styled from 'styled-components';
import { getUserPlaylists } from '../services/services';
import Header from '../organisms/header';
import PlayListCards from '../organisms/Playlists';
import { ReactElement, useEffect, useState } from 'react';

const HomeComponent = styled.main`
    text-align: center;
`
interface Owner {
  display_name: string,
  uri: string,
}

interface Url {
  height: string,
  url: string,
  width: string
}

interface PlayList {
  description: string,
  id: string,
  images: Dictionary<string>,
  name: string,
  owner: Owner
}

const ListPlaylist = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0 20px;
`;

export default function Home(){

    const [playList, setPlayList] = useState<PlayList[]>([]);
    
    const getPlayList = async () => {
        try{
            const { items } = await getUserPlaylists(access_token);
            setPlayList(items);
        }catch(error){
            console.log("mal");
        }
    }
    
    const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '');
    const access_token:string = tokenInfo['access_token'];

    useEffect(()=> {
        getPlayList();
    }, [])

    return(
        <>
            <Header></Header>
            <HomeComponent>
                <h2>Playlists:</h2>
                <ListPlaylist>
                  {
                    playList.map(playlistInfo => {
                      const {images} = playlistInfo;
                      return(
                        <PlayListCards 
                          playlist_name={playlistInfo.name} 
                          playlist_id={playlistInfo.id} 
                          playlist_image={images[0]} 
                          playlist_description={playlistInfo.description} 
                          ownerInfo={playlistInfo.owner} 
                        />
                      )
                    })
                  }
                </ListPlaylist>
            </HomeComponent>
        </>
    )
}
