import React from 'react';
import API from 'WlAPI/api.js';
import Notify from 'WlServices/notify.js';
import Code from 'WlComponents/Code/Code.jsx';
import InputButton from 'WlComponents/InputButton/InputButton.jsx';

/**
 * The Search Results page
 */
export default class ApiDev extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      body: '',
      result: '',
    };

    this.updateUrl = this.updateUrl.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

  updateUrl(newUrl) {
    this.setState({
      url: newUrl,
    });
  }

  updateBody(newBody) {
    this.setState({
      body: newBody,
    });
  }

  get() {
    API.get(this.state.url).then((res) => {
      console.log("in get", res);
      this.setState({
        result: res,
      });
    });
  }

  post() {
    API.post(this.state.url, this.state.body).then((res) => {

      this.setState({
        result: res,
      });
    });
  }


  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="max-width-wrap">

            <div className="layout-cols-2">
              <div className="layout-cols-2__left">
                Submit to the API
              </div>
              <div className="layout-cols-2__gap" />
              <div className="layout-cols-2__right text-left">
                See what comes back
              </div>
            </div>


          </div>
        </div>

        <div className="page__body">
          <div className="max-width-wrap">

            <div className="layout-cols-2">
              <div className="layout-cols-2__left">

                <div className="flex-row">
                  <div style={{ padding: '5px' }}>/api/</div>
                  <InputButton
                    inputType="text"
                    buttonText="GET"
                    submitHandler={this.get}
                    onChange={this.updateUrl}
                  />
                </div>

                <br />

                <div>
                  <textarea
                    className="width-100"
                    value={this.state.body}
                    onChange={this.updateBody}
                  />
                </div>

                <div className="text-right">
                  <button onClick={this.post}>POST</button>
                </div>

              </div>
              <div className="layout-cols-2__gap" />
              <div className="layout-cols-2__right text-left">

                <Code code={this.state.result} />

              </div>
            </div>

            <p>Here are some examples:</p>
            <p>/claims/5</p>

          </div>
        </div>
      </div>
    );
  }
}

ApiDev.propTypes = {

};
