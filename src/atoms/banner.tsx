import styled from 'styled-components';

interface BannerProps {
    bannerImage: string
}

const BannerImage = styled.img`

`

export default function BannerSong({bannerImage}: BannerProps){
    return(
        <BannerImage src={bannerImage} alt="Playlist image" />
    )
}