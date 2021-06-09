import styled from 'styled-components';

interface CaptionProps{
    captionText: string
}

const Caption = styled.figcaption`

`

export default function BannerCaption({captionText}: CaptionProps){
    return(
        <Caption>{captionText}</Caption>
    )
}