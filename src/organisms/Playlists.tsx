import styled from 'styled-components';
import BannerFigure from '../molecules/bannerFigure';

interface PlayListProps{
    playlist_name: string,
    playlist_id: string,
    playlist_image: string,
    playlist_description: string,
    ownerInfo:Dictionary<string>
}

const PlaylistCard = styled.li`

`

export default function PlayListCards({playlist_name, playlist_id, playlist_image, playlist_description, ownerInfo}: PlayListProps){

    const {display_name} = ownerInfo;

    return(
        <PlaylistCard>
            <BannerFigure bannerUrl={`/playlist/${playlist_id}`} bannerImage={playlist_image} playlist_title={playlist_name}></BannerFigure>
            <p>{display_name}</p>
            <p>{playlist_description}</p>
        </PlaylistCard>
    )
}