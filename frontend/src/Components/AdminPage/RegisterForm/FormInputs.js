import { useState } from 'react';
import './Styles/FormInputs.css';


const FormInputs = (props) => {

    const [focused, setFocused] = useState(false);
    const {label, errorMssg, onChange, id, ...inputProps} = props;

    const handleFocus = () => {
        setFocused(true);
    }

    return(
        <> 
            <div className='form-inputs'>
                <label className='form-label'>{label}</label>
                <input className='registerForm-input' {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
                <span className='registerFormErrorMessage'>{errorMssg}</span>
            </div>
        </>
    )

}

export default FormInputs;