import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import "./css/searchbox.css"
import { ReactComponent as Search} from '../images/search.svg'
import { ReactComponent as Dropdown} from '../images/dropdown.svg'
function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            history.push(`/products?keyword=${keyword}&page=1`);
            setKeyword('')
        } else {
            history.push('/');
        }
    };
    
    return (
        <form  inline  className='flex'>
            <Button className='all-button' type='button'>All<Dropdown/></Button> 
            <input
                type='text '
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='w-full bg-red-400'
            />

            <button
                type='submit'
                className='second-button'
                onClick={submitHandler}
            >
                <Search/>
            </button>
        </form>
    )
}

export default SearchBox
