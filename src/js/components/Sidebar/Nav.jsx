import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* Code
 * Displays code like JSON
 */

export default class Nav extends React.Component {
    static propTypes = {
        links: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const navMarkup = [];
        this.props.links.forEach(link => {
            navMarkup.push(<Link to={link.to}>{link.text}</Link>);
        });
        return <div className="sidebar-nav">{navMarkup}</div>;
    }
}
