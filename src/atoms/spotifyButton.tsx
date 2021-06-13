import { getAccessCode } from '../services/services';
import { ButtonSpotify } from '../assets/styles';

export default function SpotifyButton() {
    return (
        <ButtonSpotify onClick={getAccessCode}>Ingresar con Spotify</ButtonSpotify>
    )
}