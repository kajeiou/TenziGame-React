import { useState, useEffect } from 'react';
import './De.css';


export default function De(props) {

    const [de, setDe] = useState(props.De)
    const [validated, setValidated] = useState(props.validated)

    useEffect(() => {
        setDe(props.De)

    }, [props.De.value, props.validate])


    return(
        <div className='De'>
            <button className='De.de'>
                {de.value} 
            </button>
        </div>
        
    )
    
   
}