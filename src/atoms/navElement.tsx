import { LiElement } from 'assets/styles';
import { navProps } from 'assets/interfaces';

export default function navElement(props: React.PropsWithChildren<navProps>){
    return(
        <LiElement>
            {props.children}
        </LiElement>
    )
}