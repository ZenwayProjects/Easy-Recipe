import './Styles/FormInput.css';


const FormInput = (props) => {

    const {label, onChange, id, ...inputProps} = props;

    return(
        <> 
            <div className='form-inputs'>
                <label className='form-label'>{label}</label>
                <input className='loggedAccount-input' {...inputProps} onChange={onChange}/>
            </div>
        </>
    )

}

export default FormInput;