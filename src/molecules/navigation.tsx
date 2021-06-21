import { useEffect, useState } from 'react';
import NavElement from 'atoms/navElement';
import NavList from './navbar';
import { signOutSession } from 'services/services';
import { Navigation, ProfilePhoto, NavElementLink } from 'assets/styles';
import { userInfo } from 'assets/interfaces';

export default function NavigationMol(){

    // Estados: NavVisibility => [Estado visible del menú] | imageProfile => [Imagen del usuario] | userInfo => [Información del usuario]
    const [NavVisibility, setNavVisibility] = useState(false);
    const [imageProfile, setImageProfile] = useState('')
    const [userInfo, setUserInfo] = useState<userInfo>();

    // UseEffect para verificar información del token/usuario y para asignar tanto la imágen cómo la visbilidad y la información del usuario 
    useEffect(() => {
        if(!localStorage.getItem('tokenInfo') || !localStorage.getItem('userInfo')){
            window.location.href = "/";
        }
        else{
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
            const {images} = userInfo;
            setImageProfile(images.length > 0 ? images[0].url : 'https://media.istockphoto.com/illustrations/woman-with-short-hair-in-headphones-illustration-id465785399?k=6&m=465785399&s=612x612&w=0&h=R65nc5vFJLgClId1WJW8Ox6cwZbgcTjSZdbupH7LtUI=');
            setUserInfo(userInfo);
        }
    }, [])

    return(
        <Navigation>
            <ProfilePhoto onClick={() => setNavVisibility(!NavVisibility)}>
                <NavList visibility={NavVisibility}>
                    <NavElement>
                        <NavElementLink href="/">
                            {userInfo ? userInfo.display_name : 'Username'}
                        </NavElementLink>
                    </NavElement>
                    <NavElement>
                        <NavElementLink href="/favorites">
                            Favoritos
                        </NavElementLink>
                    </NavElement>
                    <NavElement>
                        <NavElementLink href="#" onClick={signOutSession}>
                            Cerrar sesión
                        </NavElementLink>
                    </NavElement>
                </NavList>
                <img src={imageProfile} alt="User Profile" />
            </ProfilePhoto>
        </Navigation>
    )
}