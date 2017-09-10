import React from 'react';

/* Code
 * Displays code like JSON
 */

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.convertCodeToMarkup = this.convertCodeToMarkup.bind(this);
    this.markup = '';
  }

  // for now assuming it's JSON
  convertCodeToMarkup(code) {
    this.markup = JSON.stringify(code, null, 2);
    return this.markup;
  }

  render() {
    const codeMarkup = this.convertCodeToMarkup(this.props.code);

    return (
      <div className="code">
        <pre><code>
          {codeMarkup}
        </code></pre>
      </div>
    );
  }
}

Code.propTypes = {
  code: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired
};
