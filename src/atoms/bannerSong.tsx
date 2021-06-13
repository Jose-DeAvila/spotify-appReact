import { BannerTrackStyles } from '../assets/styles';
import { bannerSongProps } from '../assets/interfaces';

export default function BannerTrack({bannerUrl}: bannerSongProps){
    return(
        <BannerTrackStyles src={bannerUrl} alt="Banner Track" />
    )
}