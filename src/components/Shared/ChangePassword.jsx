import React, { useState, useEffect } from 'react'
import Menu from './Components/Menu/Menu'
import Banner from './Components/Banner/Banner'
import { connect } from 'react-redux';
import { changePassword, toggleAlert, ResetAxiosChangePass, AddAlertToAlertList } from '../../store/webUtilities/actions';
import {GetUserName} from './CheckToken';
import { validateChangePasswordForm } from './validation'
import ReactPasswordStrength from 'react-password-strength';
import AlertDialog from './AlertDialog'

const ChangePassword = (props) => {
    const [alerts, setAlert] = useState([])
    const [passwords, setPass] = useState({})
    const [isDiff, areNewPassDiff] = useState(false)
    const [userName, setUserName] = useState("")
    const [validationFields, setValidationFields] = useState({
        current: true,
        new: true,
        again: true 
    })
    
    //Alerts for passwordChange Axios
    useEffect(() => {   
        if(!props.passwordChange["ack"]){return}

        //save current time
        const now = new Date() / 1000

        var idAlert = now+'-'+props.passwordChange["ack"]
        var titleAlert = props.passwordChange["ack"]==="true" ? 'Change password: ' : 'Change password alert! '
        var subtitleAlert = props.passwordChange["ack"]==="false" ? props.passwordChange["error"] : "Password changed successfully!"
        var variantAlert = props.passwordChange["ack"]==="true" ? 'success' : 'warning'

        const alert = {
            id: idAlert,
            title: titleAlert,
            subtitle: subtitleAlert,
            variant: variantAlert
        }
        props.addAlertToState(alert)

    }, [props.passwordChange]);
    
    //clear axios data
    useEffect(() => {
        props.clearAxiosResponse()
    }, []);

    //check for diff passwords
    useEffect(() => {
        if(!isDiff){return}

        //save current time
        const now = new Date() / 1000

        var idAlert = now+'-diff'
        var titleAlert = 'Change password Error! '
        var subtitleAlert = "Passwords must be equals"
        var variantAlert = 'danger'

        const alert = {
            id: idAlert,
            title: titleAlert,
            subtitle: subtitleAlert,
            variant: variantAlert
        }
        areNewPassDiff(false)
        props.addAlertToState(alert)
    }, [isDiff]);

    const formChangePass = () => {     
        //allow alert dialog to show         
        props.ChangeCurrentAlertStatus(true)
        
        //check if both new passwords are equals
        if(passwords["new"] == passwords["again"]){  
            //set pass diff to false becasue bath new passwords are equals
            areNewPassDiff(false)

            const [hasError, validationResult] = validateChangePasswordForm(passwords)
            setValidationFields({
              ...validationResult
            })
        
            if(!hasError){
                //change reducer state with the new passwords status
                props.changePass(passwords)
            }else{
                //save current time
                const now = new Date() / 1000

                var idAlert = now+'-valid'
                var titleAlert = 'Change password Error! '
                var subtitleAlert = "New password has invalid characters"
                var variantAlert = 'danger'

                const alert = {
                    id: idAlert,
                    title: titleAlert,
                    subtitle: subtitleAlert,
                    variant: variantAlert
                }
                props.addAlertToState(alert)
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

    //Call alert list for every map item
    const alertItems = (props.alertList || []).map(alert => {
        return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/>
    })

    return (        
        <div>
            <Menu /> 
            
            {/* Alerts list */}
            {alertItems}
            
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
                        <ReactPasswordStrength
                            className="customClass PasswordValidation"
                            minLength={7}
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
                        <input name="again" type="password" placeholder={"Repeat password"} value={passwords.again || ''} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                
                <div className="AlignRight input-group">
                    <button type="button" className="m-3 p-1 btn btn-primary" onClick={formChangePass}><h5>Change</h5></button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        passwordChange: state.webUtilities.passwordChange,
        errorAlertShow: state.webUtilities.errorAlertShow,
        alertList: state.webUtilities.alertList
    }
}

const mapDispatchToProps = dispatch => {
    const changeCurrentPassword = (passwords) => {return changePassword(passwords)}
    const changeCurrentStatus = (data) => {return toggleAlert(data)}
    const changePassAxiosStatus = () => {return ResetAxiosChangePass()}
    const addAlert = (alert) => {return AddAlertToAlertList(alert)}
    return {
        changePass: (passwords) => dispatch(changeCurrentPassword(passwords)),
        ChangeCurrentAlertStatus: (data) => dispatch(changeCurrentStatus(data)),
        clearAxiosResponse: () => dispatch(changePassAxiosStatus()),
        addAlertToState: (alert) => dispatch(addAlert(alert)),
    }
}

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(ChangePassword)