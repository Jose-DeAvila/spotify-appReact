import BannerTrack from 'atoms/bannerSong';
import Songtitle from 'atoms/songTitle';
import { ListOfSongs, SongInfo, SongNumber, NameAndArtist, BtnPlay, NoSongs, PaginationButtons, PaginationButton, NumberOfPage, Actions, BtnFav } from 'assets/styles';
import { SongListParams } from 'assets/interfaces';

export default function SongList({urlForward, urlBack, page, songs = [], loading, favorites = [], removeFromFavorites, addToFavorites, error}: SongListParams){

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
                songs.map((songListInfo, index) => {
                    return(
                        <SongInfo key={songListInfo.track.id}>
                            <SongNumber>{index+1}.</SongNumber>
                            <BannerTrack bannerUrl={songListInfo.track.album.images[2].url}></BannerTrack>
                            <NameAndArtist style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>
                                <Songtitle titleSong={songListInfo.track.name}></Songtitle>
                                <Songtitle titleSong={songListInfo.track.artists[0].name}></Songtitle>
                            </NameAndArtist>
                            <Actions>
                                <BtnFav title="Agregar / Quitar favorito">{favorites[index] ? <i onClick={() => removeFromFavorites(songListInfo.track.id, index)} className="fas fa-heart"></i> : <i onClick={() => addToFavorites(songListInfo.track.id, index)} className="far fa-heart"></i>}</BtnFav>
                                <BtnPlay title="Reproducir" rel="noreferrer" target="_blank" href={songListInfo.track.external_urls.spotify}><i className="fas fa-play"></i></BtnPlay>
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