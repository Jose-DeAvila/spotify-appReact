import styled from 'styled-components';

interface IconProps{
    iconClass: string
}

const IconSty = styled.i`
    font-size: 2rem;
`

export default function Icon(props:IconProps){
    return (
        <IconSty className={props.iconClass} />
    )
}