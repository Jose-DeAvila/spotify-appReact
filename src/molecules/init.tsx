import Logotype from 'atoms/logotype';
import SpotifyButton from 'atoms/spotifyButton';
import { InitMolecule } from 'assets/styles';

export default function Init(){
    return(
        <InitMolecule>
            <Logotype />
            <SpotifyButton />
        </InitMolecule>
    )
}