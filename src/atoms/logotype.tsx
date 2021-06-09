import styled from 'styled-components';

const HiperToHome = styled.a`
        width: 100%;
        text-align: center;
        &:hover img{
            transform: translateY(-5px);
            box-shadow: 0 0 4px lightgray;
        }
        img{
            transition: .5s ease all;   
            max-width: 200px;
            width: 100%;
        }

    `

export default function Logotype(){

    return(
        <HiperToHome href="/">
            <img src="./logo_transparent.png" alt="MusicApp Logotype" />
        </HiperToHome>
    )
}