import styled from 'styled-components';

interface BannerProps {
    bannerImage: string
}

const BannerImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`

export default function BannerSong({bannerImage}: BannerProps){
    return(
        <BannerImage src={bannerImage} alt="Playlist image" />
    )
}
