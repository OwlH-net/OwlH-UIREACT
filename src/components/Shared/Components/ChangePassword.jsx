import React, { useState, useEffect } from 'react'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import { connect } from 'react-redux';
import { changePassword, toggleAlert, ResetAxiosChangePass } from '../../../store/webUtilities/actions';
import {GetUserName} from '../CheckToken';
import { validateChangePasswordForm } from '../validation'
import ReactPasswordStrength from 'react-password-strength';
import AlertDialog from '../AlertDialog'

const ChangePassword = (props) => {

    const [passwords, setPass] = useState({})
    const [isDiff, areNewPassDiff] = useState(false)
    const [userName, setUserName] = useState("")
    const [validationFields, setValidationFields] = useState({
        current: true,
        new: true,
        again: true 
    })
    
    const formChangePass = () => {
        //reset axios ack for changePassword
        props.clearAxiosResponse()

        //remove username for validate input fields
        let {["user"]: _, ...result} = passwords

        //allow alert dialog to show         
        props.ChangeCurrentAlertStatus(true)
        
        //check if both new passwords are equals
        if(result["new"] == result["again"]){  
            //set pass diff to false becasue bath new passwords are equals
            areNewPassDiff(false)

            const [hasError, validationResult] = validateChangePasswordForm(result)
            setValidationFields({
              ...validationResult
            })
        
            if(!hasError){
                //change reducer state with the new passwords status
                props.changePass(passwords)
            }
    
        }else{
                //Change state for show only one alert. 
                //Maybe this state is wrong, 
                //but if both pass aren't equals, shopw first equals Alert.
                setValidationFields({
                    current: true,
                    new: true,
                    again: true 
                })

            //Passwords aren't equals. Change reducer state for show dialog
            areNewPassDiff(true)
        }

    };

    useEffect(() => {
        //Get username
        let username = GetUserName()
        setUserName(username)
        
        setPass({
            user: username,
            current: '',
            new: '',
            again: ''    
        })
    }, []);

    const handleChange = (e) => {
        setPass({
            ...passwords,
            [event.target.name]: event.target.value
        })
    };

    return (        
        <div>
            <Menu />

            {props.passwordChange["ack"]==="true" ? <AlertDialog id="correct-alert-dialog" title="Change password" subtitle="Password change successfully!" variant="success"/> : null}
            {props.passwordChange["ack"]==="false" ? <AlertDialog id="correct-alert-dialog" title="Change password Alert!" subtitle={props.passwordChange["error"]} variant="warning"/> : null}
            {isDiff ? <AlertDialog id="diff-alert-dialog" title="Change password Error!" subtitle="The new passwords must be equals" variant="danger"/> : null}
            {!validationFields.new || !validationFields.again ? <AlertDialog id="change-alert-dialog" title="Change password Error!" subtitle="Incorrect password character" variant="danger"/> : null}
            
            <Banner title="Change password for user:" subtitle='Change user password' data={userName}/>
            <form className="m-3 p-5" style={{justifyContent:'center'}}>
                <div className="media text-muted p-1 m-1">                      
                    <div className="input-group">
                        <span className="w-25 input-group-text">Current password</span>
                        <input name="current" type="password" placeholder={"Insert current password"} value={passwords.current || ''} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div className="media text-muted p-1 m-1">                      
                    <div className="input-group">
                        <span className="w-25 input-group-text">New password</span>
                        {/* <input name="new" type="password" placeholder={"Insert new password"} value={passwords.new || ''} onChange={handleChange} className="form-control" /> */}
                        <ReactPasswordStrength
                            className="customClass PasswordValidation"
                            minLength={3}
                            minScore={2}
                            scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                            inputProps={{ name: "new"}}
                            changeCallback={handleChange}
                        />
                    </div>
                </div>
                <div className="media text-muted p-1 m-1">                      
                    <div className="input-group">
                        <span className="w-25 input-group-text">Repeat new password</span>
                        {/* <input name="again" type="password" placeholder={"Insert current password again"} value={passwords.again || ''} onChange={handleChange} className="form-control" /> */}
                        <ReactPasswordStrength
                            className="customClass PasswordValidation"
                            minLength={3}
                            minScore={2}
                            scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                            inputProps={{ name: "again"}}
                            changeCallback={handleChange}
                        />
                    </div>
                </div>

                {/* <span className="w-25 input-group-text">Current password</span>
                <input name="current" placeholder={"Insert current password"} value={passwords.current || ''} onChange={handleChange}/>
                
                <span className="w-25 input-group-text">New password</span>
                <input name="new" placeholder="Insert new password" value={passwords.new || ''} onChange={handleChange}/>
                
                <span className="w-25 input-group-text">Repeat New password</span>
                <input  name="again" placeholder="Insert new password again" value={passwords.again || ''} onChange={handleChange}/> */}
                
                <div className="AlignRight input-group">
                    <button type="button" className="m-3 p-1 btn btn-primary" onClick={formChangePass}><h5>Change</h5></button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        passwordChange: state.webUtilities.passwordChange
    }
}

const mapDispatchToProps = dispatch => {
    console.log("dispatch to props")
    const changeCurrentPassword = (passwords) => {return changePassword(passwords)}
    const changeCurrentStatus = (data) => {return toggleAlert(data)}
    const changePassAxiosStatus = () => {return ResetAxiosChangePass()}
    return {
        changePass: (passwords) => dispatch(changeCurrentPassword(passwords)),
        ChangeCurrentAlertStatus: (data) => dispatch(changeCurrentStatus(data)),
        clearAxiosResponse: () => dispatch(changePassAxiosStatus()),
    }
}

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(ChangePassword)