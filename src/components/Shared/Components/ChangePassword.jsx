import React, { useState, useEffect } from 'react'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import { connect } from 'react-redux';
import { changePassword } from '../../../store/webUtilities/actions';
import {GetUserName} from '../CheckToken';

const ChangePassword = (props) => {

    const [passwords, setPass] = useState({})
    const [userName, setUserName] = useState("")

    const formChangePass = () => {
        props.changePass(passwords)
    };

    useEffect(() => {
        //Get username
        let username = GetUserName()
        setUserName(username)

        // const username = GetUserName()
        // console.log('PASS modified')    
        // console.log(username)    
        
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
            <Banner title="Change password for user:" subtitle='Change user password' data={userName}/>
            {/* <Banner title="Change Password" subtitle='Summary' /> */}
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
                        <input name="new" type="password" placeholder={"Insert new password"} value={passwords.new || ''} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <div className="media text-muted p-1 m-1">                      
                    <div className="input-group">
                        <span className="w-25 input-group-text">Repeat new password</span>
                        <input name="again" type="password" placeholder={"Insert current password again"} value={passwords.again || ''} onChange={handleChange} className="form-control" />
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

const mapDispatchToProps = dispatch => {
    console.log("dispatch to props")
    const changeCurrentPassword = (passwords) => {return changePassword(passwords)}
    return {
        changePass: (passwords) => dispatch(changeCurrentPassword(passwords))
    }
}

const withProps = connect(null, mapDispatchToProps);
export default withProps(ChangePassword)