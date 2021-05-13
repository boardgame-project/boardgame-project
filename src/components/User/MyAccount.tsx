import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { RootState } from '../../redux/store';
import { RouteComponentProps } from 'react-router-dom';
import Button from '../StyledComponents/Button';
import { User } from 'customTypes';

const MyAccount: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const user = useSelector((state: RootState) => state.userReducer);

  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isEditingFirstName, setIsEditingFirstName] = useState<boolean>(false);
  const [isEditingLastName, setIsEditingLastName] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('some password');
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);

  const dispatch = useDispatch();

  const toggleEditUsername = (): void => {
    setIsEditingUsername(!isEditingUsername);
  };
  const toggleEditEmail = (): void => {
    setIsEditingEmail(!isEditingEmail);
  };
  const toggleEditPassword = (): void => {
    setIsEditingPassword(!isEditingPassword);
  };
  const toggleEditFirstName = (): void => {
    setIsEditingFirstName(!isEditingFirstName);
  };
  const toggleEditLastName = (): void => {
    setIsEditingLastName(!isEditingLastName);
  };

  const toggleDelete = (): void => {
    setIsDeleting(!isDeleting);
  };

  const setEditing = (): void => {
    setIsEditingUsername(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
  };

  const saveChanges = (param: string): void => {
    let body = null;
    switch (param) {
      case 'username':
        body = { username: username };
        break;
      case 'email':
        body = { email: email };
        break;
      case 'password':
        body = { password: password };
        break;
      case 'firstname':
        body = { first_name: firstName };
        break;
      case 'lastname':
        body = { last_name: lastName };
        break;
    }
    axios
      .put(`api/user/${param}`, body)
      .then((res: AxiosResponse<User>) => {
        const user = res.data;
        dispatch({ type: 'UPDATE_USER', payload: user });
        setEditing();
      })
      .catch((err) => console.log(err));
  };

  const confirmDelete = (): void => {
    axios
      .delete('/api/user/delete')
      .then((): void => {
        props.history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const cancelChanges = (): void => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(password);
    setFirstName(user.first_name);
    setLastName(user.last_name);
  };

  return (
    <div className="myAccount">
      <div className="myAccountContainer">
        <h2>account</h2>
        {!isEditingUsername ? (
          <section>
            <p>username: {username}</p>
            <Button onClick={toggleEditUsername}>edit</Button>
          </section>
        ) : (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
            }}>
            <p>username:</p>
            <input
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)}
            />
            <Button onClick={(): void => saveChanges('username')}>save</Button>
            <Button
              onClick={(): void => {
                cancelChanges();
                toggleEditUsername();
              }}>
              &#10005;
            </Button>
          </form>
        )}
        {!isEditingEmail ? (
          <section>
            <p>email: {email}</p>
            <Button onClick={toggleEditEmail}>edit</Button>
          </section>
        ) : (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
            }}>
            <p>email:</p>
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
            />
            <Button onClick={(): void => saveChanges('email')}>save</Button>
            <Button
              onClick={(): void => {
                cancelChanges();
                toggleEditEmail();
              }}>
              &#10005;
            </Button>
          </form>
        )}
        {!isEditingPassword ? (
          <section>
            <p>password: {password}</p>
            <Button onClick={toggleEditPassword}>edit</Button>
          </section>
        ) : (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
            }}>
            <p>password:</p>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)}
            />
            <Button onClick={(): void => saveChanges('password')}>save</Button>
            <Button
              onClick={(): void => {
                cancelChanges();
                toggleEditPassword();
              }}>
              &#10005;
            </Button>
          </form>
        )}
        {!isEditingFirstName ? (
          <section>
            <p>first name: {firstName}</p>
            <Button onClick={toggleEditFirstName}>edit</Button>
          </section>
        ) : (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
            }}>
            <p>first name:</p>
            <input
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)}
            />
            <Button onClick={(): void => saveChanges('firstname')}>save</Button>
            <Button
              onClick={(): void => {
                cancelChanges();
                toggleEditFirstName();
              }}>
              &#10005;
            </Button>
          </form>
        )}
        {!isEditingLastName ? (
          <section>
            <p>last name: {lastName}</p>
            <Button onClick={toggleEditLastName}>edit</Button>
          </section>
        ) : (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
            }}>
            <p>last name:</p>
            <input
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)}
            />
            <Button onClick={(): void => saveChanges('lastname')}>save</Button>
            <Button
              onClick={(): void => {
                cancelChanges();
                toggleEditLastName();
              }}>
              &#10005;
            </Button>
          </form>
        )}
        {!isDeleting ? (
          <>
            <Button className="deletebtn" onClick={toggleDelete}>
              delete
            </Button>
          </>
        ) : (
          <div className="confirmDelete">
            <p className="confirmDeleteText">Are you sure you want to delete your account?</p>
            <div className="btnGroup">
              <Button onClick={confirmDelete}>confirm</Button>
              <Button onClick={toggleDelete}>&#10005;</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
