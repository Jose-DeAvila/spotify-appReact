import { RemoveProps } from 'assets/interfaces';
import { BtnDelete } from '../assets/styles';

export default function RemoveButton(props: RemoveProps){
    return(
        <BtnDelete title="Eliminar playlist" onClick={props.onClick}><i className="fas fa-times"></i></BtnDelete>
    )
}