import { useState } from 'react';
import { FormInput } from '../assets/styles';
import Input from '../atoms/input';

export default function SearchInput(){

    const [keyword, setKeyword] = useState<string>('');

    const sendToSearch = (event:any) => {
        event.preventDefault();
        if(keyword){
            window.location.href = `/search/${keyword}`;
        }
    }

    return(
        <FormInput onSubmit={sendToSearch}>
            <button type="submit"><i className="fas fa-search"></i></button>
            <Input inputType="text" onChange={(e:any) => setKeyword(e.target.value)} placeholder="Buscar canciones"></Input>
        </FormInput>
    )
}