import SongList from 'molecules/songList';
import { SongInfoInt, SongListParams } from 'assets/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { addToFavorite, checkInFavorites, getPlaylistItems, removeFromFavorite, removePlaylist } from 'services/services';
import RemoveButton from '../atoms/removeButton';

export default function PlaylistItemsMain({playlist_id, page}: SongListParams){
    
    // Estados: songList => [Canciones] | loading => [Estado de carga] | favorites => [Lista de favoritos] | error => [Mensaje de error]
    const [songList, setSongList] = useState<SongInfoInt[]>([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState<boolean[]>([]);
    
    // Se definen las dos urls de la paginación
    const urlForward:string = `/playlist/${playlist_id}/${page === 0 ? 1 : page && (page+1)}`;
    const urlBack:string = `/playlist/${playlist_id}/${page && (page-1)}`;
    
    // Se recupera el token del localstorage
    const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '{"Error": "Token info is not provided"}');
    const access_token:string = tokenInfo['access_token'];
    
    // Función para saber cuales de las canciones anteriores son favoritos
    const fetchFavorites = useCallback(async (items:SongInfoInt[]) => {
        let aux1:string[] = [];
        
        if(items && items.length > 0){
            for(let i = 0; i<items.length; i++){
                aux1.push(items[i].track.id);
            }
            const data = await checkInFavorites(access_token, aux1);
            setFavorites(data);
        }
        else{
            setFavorites([]);
        }
    }, [access_token]);
    
    // Función para traer las canciones de la playlist
    const fetchPlaylistItems = useCallback(async() => {
        setLoading(true);
        const data = await getPlaylistItems(access_token, playlist_id, page);
        if(!data.error && data.items.length > 0){
            setSongList(data.items);
            fetchFavorites(data.items);
            setLoading(false);
            
        }else{
            setSongList([]);
            setLoading(false);
        }
    }, [access_token, fetchFavorites, page, playlist_id])

    // Elimina la canción de favoritos | Parámetros: id => [Id de la canción] -> indexSong => [Index de la canción dentro de favoritos]
    const removeFromFavorites = async (id:string, indexSong:number) => {
        setFavorites(favorites.map((favorite, index) => {
            if(index === indexSong){
                favorite = !favorite;
            }
            return favorite
        }));
        const response = await removeFromFavorite(access_token, id);
        if(response.status !== 200){
            setFavorites(favorites.map((favorite, index) => {
                if(index === indexSong){
                    favorite = !favorite;
                }
                return favorite
            }));
        }
    }

    // Agrega la canción a favoritos | Parámetros: id => [Id de la canción] -> indexSong => [Index de la canción dentro de favoritos]
    const addToFavorites = async(id:string, indexSong:number) => {
        setFavorites(favorites.map((favorite, index) => {
            if(index === indexSong){
                favorite = !favorite;
            }
            return favorite
        }));
        const response = await addToFavorite(access_token, id);
        if(response.status !== 200){
            setFavorites(favorites.map((favorite, index) => {
                if(index === indexSong){
                    favorite = !favorite;
                }
                return favorite
            }));
        }
    }

    // Eliminar la playlist actual
    const fetchRemovePlaylist = async() => {
        const response = await removePlaylist(access_token, playlist_id);
        if(response.status === 200){
            window.location.href = "/";
        }
    }

    // UseEffect para traer canciones
    useEffect(() => {
        fetchPlaylistItems();
    }, [fetchPlaylistItems])

    return(
        <main>
            <SongList playlist_id={playlist_id || ''} urlForward={urlForward} urlBack={urlBack} page={page || 0} songs={songList} favorites={favorites} loading={loading} removeFromFavorites={removeFromFavorites} addToFavorites={addToFavorites}></SongList>
            <RemoveButton onClick={fetchRemovePlaylist} ></RemoveButton>
        </main>
    )
}