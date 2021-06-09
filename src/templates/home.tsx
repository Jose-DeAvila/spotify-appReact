import styled from 'styled-components';
import { getUserPlaylists } from '../services/services';
import Header from '../organisms/header';
import PlayListCards from '../organisms/Playlists';
import { ReactElement, useEffect, useState } from 'react';

const HomeComponent = styled.main`
    text-align: center;
`

const ListPlaylist = styled.ul`
    text-align: center;
    list-style: none;
    padding: 0;
`;

export default function Home(){

    const [playList, setPlayList] = useState([]);

    const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '');
    const access_token:string = tokenInfo['access_token'];

    useEffect(()=> {
        getPlayList();
    }, [])

    const getPlayList = async () => {
        try{
            const { items } = await getUserPlaylists(access_token);
            setPlayList(items);
        }catch(error){
            console.log("mal");
        }
    }

    return(
        <>
            <Header></Header>
            <HomeComponent>
                <h2>Playlists:</h2>
                <ListPlaylist>
                    {
                        playList.map((value):ReactElement<any, any> => {
                            const {images} = value;
                            return(
                                <PlayListCards playlist_name={value['name']} playlist_id={value['id']} playlist_image={images[0].url} />
                            )
                        })
                    }
                </ListPlaylist>
            </HomeComponent>
        </>
    )
}