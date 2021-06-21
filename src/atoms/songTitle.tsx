import { TitleStyles } from 'assets/styles';
import { SongTitleProps } from 'assets/interfaces';

export default function SongTitle({titleSong}: SongTitleProps){
    return(
        <TitleStyles>{titleSong}</TitleStyles>
    )
}