import React from 'react';
import styled from 'styled-components';

interface navProps {
    children?: React.ReactNode; 
}

const LiElement = styled.li`
    transition: .3s ease all;
    padding: 10px 0;
    &:first-child{
        border-radius: 20px 20px 0 0;
    }
    &:last-child{
        border-radius: 0 0 20px 20px;
    }
    &:hover{
        background-color: #022229;
    }
`

export default function navElement(props: React.PropsWithChildren<navProps>){
    return(
        <LiElement>
            {props.children}
        </LiElement>
    )
}