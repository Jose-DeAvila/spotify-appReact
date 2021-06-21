import { HiperToHome } from "assets/styles"
import Logo from '../LogoTransparent.svg';

export default function Logotype(){
    return(
        <HiperToHome href="/">
            <img src={Logo} alt="MusicApp Logotype" />
        </HiperToHome>
    )
}