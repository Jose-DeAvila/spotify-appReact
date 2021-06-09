import React from 'react';
import styled from 'styled-components';
import BannerSong from '../atoms/banner';
import BannerCaption from '../atoms/bannerCaption';

interface FigureProps{
    bannerUrl: string,
    bannerImage: string,
    playlist_title: string
}

const Figure = styled.figure`
`

const BannerUrl = styled.a`
`

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