import React from 'react';

/**
 * The User profile & settings page
 * Here you will be able to change the theme / alert settings / your username / password / etc...
 * @prop {*} name 
 */
export default class UserProfileScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                DEMO
              </div>
              <div className="layout-cols-2__right">
                <button>LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            You are logged in as Demo - proper user profiles are coming soon!
          </div>
        </div>
      </div>
    );
  }
}
