import React from 'react';
import Claim from 'WlComponents/Claim/Claim.jsx';
import Input from 'WlComponents/_Atoms/Input.jsx';
import InputButton from 'WlComponents/_Atoms/InputButton.jsx';

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
            <h1>Style guide!</h1>
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
                <span className="color-box dark-blue" />
                <span className="color-box link-blue" />
                <span className="color-box rule-color" />
                <span className="color-box grey" />
              </p>
            </section>
            <hr />
            <section>
              <h2>Buttons</h2>
              <button>Button</button>
              <input type="button" value="input type='button'" />
              <input type="submit" value="input type='submit'" />
            </section>
            <hr />
            <section>
              <h2>Forms</h2>
              <form action="#">
                <Input
                  id="input"
                  labelText="An input"
                  inputType="text"
                  inputPlaceholder="This is an input"
                />
                <div className="pad" />
              </form>
              <InputButton
                id="input-btn"
                labelText="The input button"
                inputType="text"
                inputPlaceholder="This is an input..."
                btnText="button"
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
