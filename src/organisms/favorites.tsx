import { SectionTitle } from 'assets/styles';
import { SongInfoInt, SongListParams } from 'assets/interfaces';
import SongList from 'molecules/songList';
import { useCallback, useEffect, useState } from 'react';
import { addToFavorite, checkInFavorites, getFavoritesSongs, removeFromFavorite } from 'services/services';

export default function FavoritesMain({page}: SongListParams){
    
    // Estados songList => [Canciones] | loading => [Estado de carga] | favorites => [Lista de favoritos]
    const [songList, setSongList] = useState<SongInfoInt[]>([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState<boolean[]>([]);
    
    // Se definen las dos urls de la paginación
    const urlForward:string = `/favorites/${page === 0 ? 1 : page && (page+1)}`;
    const urlBack:string = `/favorites/${page && (page-1)}`;
    
    
    // Se recupera el token del localstorage
    const tokenInfo = JSON.parse(window.localStorage.getItem('tokenInfo') || '{"error": "Token info is not provided"}');
    const access_token:string = tokenInfo['access_token'];
    
    // Función para saber cuales de las canciones anteriores son favoritos | Parámetros: items => [list de canciones actuales]
    const fetchFavorites = useCallback(async (items:SongInfoInt[]) => {
        let aux1:string[] = [];
        
        for(let i = 0; i<items.length; i++){
            aux1.push(items[i].track.id);
        }

        const data = await checkInFavorites(access_token, aux1);
        setFavorites(data);
    }, [access_token]);
    
    // Función para traer las canciones de la playlist
    const fetchSongsInFavorites = useCallback(async() => {
        setLoading(true);
        const data = await getFavoritesSongs(access_token, page);
        if(data.items.length > 0){
            setSongList(data.items);
            fetchFavorites(data.items);
            setLoading(false);
        }
        else{
            setSongList([]);
            setLoading(false);
        }
    }, [access_token, fetchFavorites, page])
    
    // Elimina la canción de favoritos | Parámetros: id => [Id de la canción] -> indexSong => [Index de la canción dentro de favoritos]
    const removeFromFavorites = async (id:string, indexSong:number) => {
        const response = await removeFromFavorite(access_token, id);
        if(response.status === 200){
            setFavorites(favorites.map((favorite, index) => {
                if(index === indexSong){
                    favorite = !favorite;
                }
                return favorite
            }))
        }
        else{
            alert("Error al eliminar de favoritos");
        }
    }

    // Agrega la canción a favoritos | Parámetros: id => [Id de la canción] -> indexSong => [Index de la canción dentro de favoritos]
    const addToFavorites = async(id:string, indexSong:number) => {
        const response = await addToFavorite(access_token, id);
        if(response.status === 200){
            setFavorites(favorites.map((favorite, index) => {
                if(index === indexSong){
                    favorite = !favorite;
                }
                return favorite
            }))
        }
        else{
            alert("Error al colocar en favoritos");
        }
    }

    // UseEffect para traer canciones
    useEffect(() => {
        fetchSongsInFavorites();
    }, [fetchSongsInFavorites])

    return(
        <main>
            <SectionTitle>Favoritos</SectionTitle>
            <SongList urlForward={urlForward} urlBack={urlBack} songs={songList} page={page || 0} loading={loading} favorites={favorites} removeFromFavorites={removeFromFavorites} addToFavorites={addToFavorites}></SongList>
        </main>
    )
}