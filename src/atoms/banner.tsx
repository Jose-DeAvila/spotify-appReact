import { BannerImage } from 'assets/styles';
import { BannerProps } from 'assets/interfaces';

export default function BannerSong({bannerImage}: BannerProps){
    return(
        <BannerImage src={bannerImage} alt="Playlist image" />
    )
}