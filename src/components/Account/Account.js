import React from 'react';

import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget/PasswordForget';
import PasswordChangeForm from '../PasswordChange/PasswordChange';
import withAuthorization from '../../hoc/withAuthorization';


const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser ?
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    : null
    }
  </AuthUserContext.Consumer>


const authCondition = (authUser) => Boolean(authUser);
export default withAuthorization(authCondition)(AccountPage);
