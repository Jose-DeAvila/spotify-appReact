import {Container} from '../assets/styles';
import NavigationMol from '../molecules/navigation';
import Logotype from '../atoms/logotype';

export default function Header(){
    return(
        <Container>
            <Logotype></Logotype>
            <NavigationMol></NavigationMol>
        </Container>
    )
}