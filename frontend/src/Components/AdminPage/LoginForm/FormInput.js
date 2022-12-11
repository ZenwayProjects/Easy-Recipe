import './Styles/FormInputs.css';


const FormInputs = (props) => {

    const {label, onChange, id, ...inputProps} = props;

    return(
        <> 
            <div className='form-inputs'>
                <label className='form-label'>{label}</label>
                <input className='loginForm-input' {...inputProps} onChange={onChange}/>
                <span className='loginFormErrorMessage'>{errorMssg}</span>
            </div>
        </>
    )

}

export default FormInputs;