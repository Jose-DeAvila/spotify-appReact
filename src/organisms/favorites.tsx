import FavoritesList from '../molecules/favoritesList';
import { SectionTitle } from '../assets/styles';

export default function FavoritesMain(){
    return(
        <main>
            <SectionTitle>Favoritos</SectionTitle>
            <FavoritesList></FavoritesList>
        </main>
    )
}