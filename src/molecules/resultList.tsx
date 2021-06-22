import BannerTrack from '../atoms/bannerSong';
import Songtitle from '../atoms/songTitle';
import { ListOfSongs, SongInfo, SongNumber, NameAndArtist, BtnPlay, NoSongs, PaginationButtons, PaginationButton, NumberOfPage, Actions, BtnFav } from '../assets/styles';

export default function ResultList({urlForward, urlBack, page, songs = [], loading, favorites = [], removeFromFavorites, addToFavorites, error}:any){

    // Función para enviar a la siguiente página (paginación)
    const sendForward = () => {
        window.location.href = urlForward || '/';
    }

    // Función para enviar a la anterior página (paginación)
    const sendBackward = () => {
        window.location.href = urlBack || '/';
    }

    return(
        <ListOfSongs>
            {loading && <NoSongs>Cargando...</NoSongs>}
            {
                songs.length > 0
                ? 
                songs.map((songListInfo:any, index:any) => {
                    return(
                        <SongInfo key={songListInfo.id}>
                            <SongNumber>{index+1}.</SongNumber>
                            <BannerTrack bannerUrl={songListInfo.album.images[0] ? songListInfo.album.images[0].url : 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1'}></BannerTrack>
                            <NameAndArtist style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>
                                <Songtitle titleSong={songListInfo.name}></Songtitle>
                                <Songtitle titleSong={songListInfo.artists[0].name}></Songtitle>
                            </NameAndArtist>
                            <Actions>
                                <BtnFav>{favorites[index] ? <i onClick={() => removeFromFavorites(songListInfo.id, index)} className="fas fa-heart" title="Eliminar de favoritos"></i> : <i onClick={() => addToFavorites(songListInfo.id, index)} className="far fa-heart" title="Agregar a favoritos"></i>}</BtnFav>
                                <BtnPlay title="Reproducir" rel="noreferrer" target="_blank" href={songListInfo.external_urls.spotify}><i className="fas fa-play"></i></BtnPlay>
                            </Actions>
                        </SongInfo>
                    )
                })
                :
                !loading && <NoSongs>{error ? error : 'No hay canciones disponibles'}</NoSongs>
            }
            <PaginationButtons>
                {page !== undefined && page > 0 ? <PaginationButton onClick={sendBackward}><i className="fas fa-caret-left"></i> Atrás</PaginationButton> : ''}
                <NumberOfPage><span>Página</span> {page !== undefined ? page+1 : 0 }</NumberOfPage>
                {page !== undefined && page >= 0 && songs.length > 0 ? <PaginationButton onClick={sendForward}>Siguiente <i className="fas fa-caret-right"></i></PaginationButton> : ''}
            </PaginationButtons>
        </ListOfSongs>
    )
}