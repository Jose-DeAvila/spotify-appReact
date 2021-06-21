import { IconSty } from 'assets/styles';
import { IconProps } from 'assets/interfaces';

export default function Icon(props:IconProps){
    return (
        <IconSty className={props.iconClass} />
    )
}