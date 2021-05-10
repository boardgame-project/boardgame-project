import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// import { User } from 'customTypes';

const Header: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const user_id = useSelector((state: RootState) => state.userReducer.user_id);

  const [checkBox, setCheckBox] = useState(false);

  const dispatch = useDispatch();

  const logoutUser = (): void => {
    axios
      .delete('/api/auth/logout')
      .then(() => {
        dispatch({ type: 'LOGOUT_USER' });
        props.history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const toggleCheckBox = (): void => {
    setCheckBox(!checkBox);
  };

  return (
    <div className="header">
      <div>
        <Link to="/">
          <div className="hexContainer">
            <div className="hexagon1"></div>
            <div className="hexagon2"></div>
            <div className="hexagon3"></div>
          </div>
        </Link>
      </div>

      <nav id="navContainer">
        <div id="menuToggle">
          <input type="checkbox" id="checkbox" checked={checkBox} onClick={toggleCheckBox} />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <li>
              <Link onClick={toggleCheckBox} className="navLink" to="/">
                home
              </Link>
            </li>
            {user_id ? (
              <li>
                <Link onClick={toggleCheckBox} className="navLink" to="/user">
                  profile
                </Link>
              </li>
            ) : (
              ''
            )}
            {user_id ? (
              <li>
                <Link onClick={toggleCheckBox} className="navLink" to="/account">
                  account
                </Link>
              </li>
            ) : (
              ''
            )}
            <li>
              <Link onClick={toggleCheckBox} className="navLink" to="/game">
                games
              </Link>
            </li>
            {user_id ? (
              <li>
                <a
                  onClick={() => {
                    logoutUser();
                    toggleCheckBox();
                  }}>
                  logout
                </a>
              </li>
            ) : (
              <li>
                <Link onClick={toggleCheckBox} className="navLink" to="/auth">
                  login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
