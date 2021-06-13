import React from 'react';
import BannerSong from '../atoms/banner';
import BannerCaption from '../atoms/bannerCaption';
import { Figure, BannerUrl } from '../assets/styles';
import { FigureProps } from '../assets/interfaces';

export default function BannerFigure({bannerImage, bannerUrl, playlist_title}: React.PropsWithChildren<FigureProps>){
    return(
        <BannerUrl href={bannerUrl}>
            <Figure>
                <BannerSong bannerImage={bannerImage} />
                <BannerCaption captionText={playlist_title} />
            </Figure>
        </BannerUrl>
    )
}
