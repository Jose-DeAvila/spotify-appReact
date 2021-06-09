import Logotype from '../atoms/logotype';
import SpotifyButton from '../atoms/spotifyButton';
import styled from 'styled-components';

const InitMolecule = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default function Init(){
    
    return(
        <InitMolecule>
            <Logotype />
            <SpotifyButton />
        </InitMolecule>
    )
}