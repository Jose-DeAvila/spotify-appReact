import styled from 'styled-components';
import { getAccessCode } from '../services/services';

const ButtonSpotify = styled.button`
        font-size: 1.2rem;
        display: block;
        background-color: #03414d;
        color: white;
        padding: 15px 40px;
        border: none;
        outline: none;
        border-radius: 20px;
        transition: .5s ease all;
        cursor: pointer;
        max-width: 300px;
        &:hover{
            background-color: #013641;
        }
    `

export default function SpotifyButton() {

    return (
        <ButtonSpotify onClick={getAccessCode}>Ingresar con Spotify</ButtonSpotify>
    )
}