import styled from 'styled-components';
import NavigationMol from '../molecules/navigation';
import Logotype from '../atoms/logotype';

const Container = styled.header`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0 20px;
    & > a {
        width: 40%;
    }
    & > nav {
        width: 50%;
    }
`

export default function Header(){
    return(
        <Container>
            <Logotype></Logotype>
            <NavigationMol></NavigationMol>
        </Container>
    )
}