import { Caption } from 'assets/styles';
import { CaptionProps } from 'assets/interfaces';

export default function BannerCaption({captionText}: CaptionProps){
    return(
        <Caption>{captionText}</Caption>
    )
}