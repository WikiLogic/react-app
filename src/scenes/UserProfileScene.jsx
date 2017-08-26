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

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    this.props.logoutHandler();
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">
            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                {this.props.user.name}
              </div>
              <div className="layout-cols-2__right">
                <button onClick={this.logoutHandler}>LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            Currently only the demo login is running, it has no profile data. Proper profiles will be coming!
          </div>
        </div>
      </div>
    );
  }
}

UserProfileScene.propTypes = {
  logoutHandler: React.PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
};

UserProfileScene.defaultProps = {
  user: {
    name: 'Not Logged In',
  },
};
