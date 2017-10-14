import React from 'react';

/* The native svg <text> el does not allow for text wrapping
 * This component provides that
 */
export default function SVGtext(props) {
  return (
    <foreignObject
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
    >
      <p xmlns="http://www.w3.org/1999/xhtml">{props.text}</p>
    </foreignObject>
  );
}

SVGtext.propTypes = {
  text: React.PropTypes.string.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};
