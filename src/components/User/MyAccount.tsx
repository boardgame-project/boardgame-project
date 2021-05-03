import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {RootState} from '../../redux/store';
import {RouteComponentProps} from 'react-router-dom'

const MyAccount: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
    const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
    const [isEditingFirstName, setIsEditingFirstName] = useState<boolean>(false);
    const [isEditingLastName, setIsEditingLastName] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    
    const user = useSelector((state: RootState) => state.userReducer)

    useEffect((): void => {
        captureCurrentUser()
    }, []);

    const captureCurrentUser= ():void => {
        setUsername(user.username)
        setEmail(user.email)
        setPassword(password)
        setFirstName(user.first_name)
        setLastName(user.last_name)
    };

    const toggleEditUsername = ():void => {
        setIsEditingUsername(!isEditingUsername)
    };
    const toggleEditEmail = ():void => {
        setIsEditingEmail(!isEditingEmail)
    };
    const toggleEditPassword = ():void => {
        setIsEditingPassword(!isEditingPassword)
    };
    const toggleEditFirstName = ():void => {
        setIsEditingFirstName(!isEditingFirstName)
    };
    const toggleEditLastName = ():void => {
        setIsEditingLastName(!isEditingLastName)
    };

    const toggleDelete = ():void => {
        setIsDeleting(!isDeleting)
    };

    const saveChanges = (param: string):void => {
        let body = null
        switch (param){
            case 'username':
                body = {username: username}
                break
            case 'email':
                body = {email: email}
                break
            case 'password':
                body = {password: password}
                break
            case 'firstname':
                body = {first_name: firstName}
                break
            case 'lastname':
                body = {last_name: lastName}
                break
        }
        axios.put(`api/user/${param}`, body)
        .then(res => {
            console.log(res)
            setIsEditingUsername(false)
            setIsEditingEmail(false)
            setIsEditingPassword(false)
            setIsEditingFirstName(false)
            setIsEditingLastName(false)
        })
        .catch(err => console.log(err))
    };

    const confirmDelete = ():void => {
        axios.delete('/api/user/delete')
        .then(():void => {
            props.history.push('/')
        })
        .catch(err => console.log(err))
    };

    const cancelChanges = ():void => {
        setUsername(user.username)
        setEmail(user.email)
        setPassword(password)
        setFirstName(user.first_name)
        setLastName(user.last_name)
    };

    

    return (
        <div className='myAccountContainer'>
            {!isEditingUsername ?
                <section>
                    <p>username: {username}</p>
                    <button onClick={toggleEditUsername}>edit</button>
                </section>
            :
                <form>
                    <p>username:</p>
                    <input 
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)}/>
                    <button onClick={():void => saveChanges('username')}>save</button>
                    <button onClick={():void => cancelChanges()}>cancel</button>
                </form>}
            {!isEditingEmail ?
                <section>
                    <p>email: {email}</p>
                    <button onClick={toggleEditEmail}>edit</button>
                </section>
            :
                <form>
                    <p>email:</p>
                    <input 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}/>
                    <button onClick={():void => saveChanges('email')}>save</button>
                    <button onClick={():void => cancelChanges()}>cancel</button>
                </form>} 
            {!isEditingPassword ?
                <section>
                    <p>password: {password}</p>
                    <button onClick={toggleEditPassword}>edit</button>
                </section>
            :
                <form>
                    <p>password:</p>
                    <input 
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)}/>
                    <button onClick={():void => saveChanges('password')}>save</button>
                    <button onClick={():void => cancelChanges()}>cancel</button>
                </form>} 
            {!isEditingFirstName ?
                <section>
                    <p>first name: {firstName}</p>
                    <button onClick={toggleEditFirstName}>edit</button>
                </section>
            :
                <form>
                    <p>first name:</p>
                    <input 
                    value={firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)}/>
                    <button onClick={():void => saveChanges('firstname')}>save</button>
                    <button onClick={():void => cancelChanges()}>cancel</button>
                </form>} 
            {!isEditingLastName ?
                <section>
                    <p>last name: {lastName}</p>
                    <button onClick={toggleEditLastName}>edit</button>
                </section>
            :
                <form>
                    <p>last name:</p>
                    <input 
                    value={lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)}/>
                    <button onClick={():void => saveChanges('lastname')}>save</button>
                    <button onClick={():void => cancelChanges()}>cancel</button>
                </form>} 
            {!isDeleting ?
                <button onClick={toggleDelete}>delete</button> :
                <div>
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={confirmDelete}>confirm</button>
                </div>}    
        </div>
    );
};

export default MyAccount;

