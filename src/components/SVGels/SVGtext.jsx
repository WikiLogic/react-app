import React from 'react';
import PropTypes from 'prop-types';

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
  text: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
