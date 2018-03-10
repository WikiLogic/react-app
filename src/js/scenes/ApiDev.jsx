import React from "react";
import API from "src/API/api.js";
import Code from "src/components/Code/Code.jsx";
import InputButton from "src/components/_Atoms/InputButton.jsx";
import Loader from "src/components/Loader/Loader.jsx";

/**
 * The Search Results page
 */
export default class ApiDev extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            body: "",
            result: "",
            isLoading: false
        };

        this.updateUrl = this.updateUrl.bind(this);
        this.updateBody = this.updateBody.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
    }

    updateUrl(newUrl) {
        this.setState({
            url: newUrl
        });
    }

    updateBody(newBody) {
        this.setState({
            body: newBody
        });
    }

    get() {
        API.get(this.state.url).then(res => {
            this.setState({
                result: res,
                isLoading: false
            });
        });

        this.setState({ isLoading: true });
    }

    post() {
        API.post(this.state.url, this.state.body).then(res => {
            this.setState({
                result: res,
                isLoading: false
            });
        });

        this.setState({ isLoading: true });
    }

    render() {
        return (
            <div className="page">
                <div className="page__header">
                    <div className="max-width-wrap">
                        <div className="layout-cols-2">
                            <div className="layout-cols-2__left">Submit to the API</div>
                            <div className="layout-cols-2__gap" />
                            <div className="layout-cols-2__right text-left">
                                See what comes back
                            </div>
                        </div>
                    </div>
                </div>
                <Loader isLoading={this.state.isLoading} />

                <div className="page__body">
                    <div className="max-width-wrap">
                        <div className="layout-cols-2">
                            <div className="layout-cols-2__left">
                                <InputButton
                                    id="api-input"
                                    labelText="label text!"
                                    inputType="text"
                                    inputPlaceholder="placeholder text"
                                    inputInitValue="/api/"
                                    btnText="GET"
                                    submitHandler={this.get}
                                />

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

                                <p>
                                    Here are some examples:
                                    <ul>
                                        <li>test</li>
                                        <li>claims/5</li>
                                        <li>claims?search=test</li>
                                    </ul>
                                </p>
                            </div>
                            <div className="layout-cols-2__gap" />
                            <div className="layout-cols-2__right text-left">
                                <Code code={this.state.result} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ApiDev.propTypes = {};
