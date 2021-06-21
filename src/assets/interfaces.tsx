interface BannerProps {
    bannerImage: string // Ruta de la imagen
}

interface CaptionProps{
    captionText: string // Descripción de la imagen
}

interface bannerSongProps{
    bannerUrl: string // Enlace al que enviará al dar click a la imagen o al título
}

interface IconProps{
    iconClass: string // Clase de fontawesome para el ícono del componente
}

interface navProps {
    children?: React.ReactNode; // Elementos que van dentro de la lista
}

interface SongTitleProps {
    titleSong: string // Nombre de la canción
}

interface FigureProps{
    bannerUrl: string, // Enlace al que enviará la card
    bannerImage: string, // Enlace a la imágen de la playlist
    playlist_title: string // Título de la playlist
}

interface NavListProps{
    children?: React.ReactNode, // Elementos hijos del nodo
    visibility: boolean // Estado del nodo (Visible o no)
}

interface SongListParams {
    playlist_id?: any, // Id de la playlist
    urlForward?:string, // Url para ir adelante en la paginación
    urlBack?:string, // Url para ir hacía atrás en la paginación
    page?:any, // Página actual de la paginación
    favorites?: boolean[], // Lista de marcados como favoritos 
    songs?: SongInfoInt[], // Lista de canciones
    loading?: boolean // Estado de carga
    removeFromFavorites?:any, // Función para eliminar de favoritos
    addToFavorites?: any, // Función par agregar a favoritos 
    error?:string // Mensaje de error en caso de que lo haya
}

interface images {
    height: number, // Altura de la imagen
    width: number, // Ancho de la imagen
    url: string // Enlace de la imágen 
}

interface ArtistInfo {
    name: string, // Nombre del artista
    id: string // Id del artista en spotify
}

interface AlbumInfo {
    id: string, // Id del album de la canción 
    name: string, // Nombre del album
    images: images[] // Imágen del album
}

interface TrackInfo {
    artists: ArtistInfo[], // Infomación del artista
    name: string, // Nombre de la canción
    album: AlbumInfo, // Album de la canción
    id: string, // Id de la canción
    external_urls: ExternalsUrls; // Links externos a la canción
}

interface ExternalsUrls{
    spotify: string, // Enlace a la canción en spotify
}

interface SongInfoInt{
    track: TrackInfo // Infomación de la canción
}

interface Owner {
    display_name: string, // Nombre del dueño de la playlist
    uri: string, // Enlace al perfil del dueño de la playlist
}
  
interface Url {
    height: string, // Alto de la imagen
    url: string, // Enlace a la imagen
    width: string // Ancho de la imagen
}
  
interface PlayListProps{
    playlist_name: string, // Nombre de la playlist
    playlist_id: string, // Id de la playlist
    playlist_image: Url, // Imágen de la playlist
    playlist_description: string, // Descripción de la playlist
    ownerInfo:Owner; // Dueño de la playlist
}
  
interface PlayList {
    description: string, // Descripción de la playlist
    id: string, // Id de la playlist
    images: Url[], // Imágen de la playlist
    name: string, // Nombre de la playlist
    owner: Owner // Dueño de la playlist
}

interface userInfo {
    display_name: string, // Nombre del usuario
    images: images[] // Imágen del usuario
}

type TParams = {
    id: string, // ID pasado por URL
    page: string // Página pasada por URL
};

export type{
    BannerProps,
    CaptionProps,
    bannerSongProps,
    IconProps,
    navProps,
    SongTitleProps,
    FigureProps,
    NavListProps,
    SongInfoInt,
    SongListParams,
    PlayListProps,
    PlayList,
    TParams,
    userInfo
}