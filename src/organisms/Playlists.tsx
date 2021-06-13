import BannerFigure from '../molecules/bannerFigure';
import { PlaylistCard, ExploreButton, PlayListText } from '../assets/styles';
import { PlayListProps } from '../assets/interfaces';

export default function PlayListCards({playlist_name, playlist_id, playlist_image, playlist_description, ownerInfo}: PlayListProps){

    const {display_name} = ownerInfo;

    return(
        <PlaylistCard>
            <BannerFigure bannerUrl={`/playlist/${playlist_id}`} bannerImage={playlist_image ? playlist_image['url'] : 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1'} playlist_title={playlist_name}></BannerFigure>
            <PlayListText className="userOwner">{display_name}</PlayListText>
            {playlist_description && <PlayListText>{playlist_description}</PlayListText>}

            <ExploreButton href={`/playlist/${playlist_id}`}>Explorar</ExploreButton>
        </PlaylistCard>
    )
}
