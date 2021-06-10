import styled from 'styled-components';
import BannerFigure from '../molecules/bannerFigure';

interface Owner {
  display_name: string,
  uri: string,
}

interface Url {
  height: string,
  url: string,
  width: string
}

interface PlayListProps{
    playlist_name: string,
    playlist_id: string,
    playlist_image:Url,
    playlist_description: string,
    ownerInfo:Owner;
}

const PlaylistCard = styled.li`
  width: 100%;
  margin-right: 25px;
  height: 300px;
`

export default function PlayListCards({playlist_name, playlist_id, playlist_image, playlist_description, ownerInfo}: PlayListProps){

    const {display_name} = ownerInfo;
    console.log(playlist_image);

    return(
        <PlaylistCard>
            <BannerFigure bannerUrl={`/playlist/${playlist_id}`} bannerImage={playlist_image['url']} playlist_title={playlist_name}></BannerFigure>
            <p>{display_name}</p>
            <p>{playlist_description}</p>
        </PlaylistCard>
    )
}
