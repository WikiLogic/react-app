import React from 'react';

/* Code
 * Displays code like JSON
 */

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.convertCodeToMarkup = this.convertCodeToMarkup.bind(this);
  }

  // for now assuming it's JSON
  convertCodeToMarkup(code) {
    return JSON.stringify(code, null, 2);
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
  code: React.PropTypes.string.isRequired,
};
