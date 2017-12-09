import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';
import Input from 'WlComponents/_Atoms/Input.jsx';
import InputButton from 'WlComponents/_Atoms/InputButton.jsx';
import InputRange from 'WlComponents/_Atoms/InputRange.jsx';

/**
 * The Search Results page
 * @prop {*} name
 */
export default class StyleguideScene extends React.Component {
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
            <h1>Style guide! (Heading 1)</h1>
          </div>
        </div>
        <div className="page__body">
          <div className="max-width-wrap">
            <section>
              <div className="layout-cols-2">
                <div className="layout-cols-2__left">
                  <h2>Heading 2</h2>
                  <h3>Heading 3</h3>
                  <h4>Heading 4</h4>
                  <h5>Heading 5</h5>
                  <h6>Heading 6</h6>
                </div>
                <div className="layout-cols-2__right text-align-left">
                  <p>Use h1&#39;s for page titles. All other heading tags are the same -
                    for more variety, scope the heading style to the component you&#39;re
                    working on. Don&#39;t rely on tags for typography.
                  </p>
                  <p>
                    123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, repellat, ad.
                    Autem reiciendis nobis, aspernatur, quo delectus modi quae vel assumenda aliquam
                    inventore recusandae iure rerum odio veniam, consectetur non.
                  </p>
                </div>
              </div>
            </section>
            <hr />
            <section>
              <h2>Colors</h2>
              <p>
                <span className="bg-blue-dark color-white display-inline-block padding">blue-dark</span>
                <span className="pad" />
                <span className="bg-blue-light color-white display-inline-block padding">blue-light</span>
                <div className="pad" />
                <span className="bg-grey-dark display-inline-block padding">grey-dark</span>
                <span className="pad" />
                <span className="bg-grey-light display-inline-block padding">grey-light</span>
              </p>
            </section>
            <hr />
            <section>
              <h2>Buttons</h2>
              <button>Button</button>
              <span className="pad" />
              <input type="button" value="input type='button'" />
              <span className="pad" />
              <input type="submit" value="input type='submit'" />
            </section>
            <hr />
            <section>
              <h2>Form elements</h2>
              <Input
                id="input"
                labelText="An input"
                inputType="text"
                inputPlaceholder="This is an input"
              />
              <div className="pad" />
              <Input
                id="input-password"
                labelText="An input type='password'"
                inputType="password"
                inputPlaceholder="This is a password input"
              />
              <div className="pad" />
              <InputButton
                id="input-btn"
                labelText="An input with a button!"
                inputType="text"
                inputPlaceholder="This is an input..."
                btnText="button"
              />
              <div className="pad" />
              <InputRange
                id="inpu-range"
                labelText="A Range Input"
                changeHandler={() => {}}
              />

            </section>
            <hr />
            <section>
              <h2>Claims</h2>
              <div className="layout-cols-2">
                <div className="layout-cols-2__left">
                  <Claim
                    claim={{
                      text: 'claim text',
                      probability: 0.75,
                    }}
                    handleClick={() => {}}
                  />
                </div>
                <div className="layout-cols-2__gap" />
                <div className="layout-cols-2__right">
                  <Claim
                    claim={{
                      text: 'claim text',
                      probability: 0.5,
                    }}
                    handleClick={() => {}}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
