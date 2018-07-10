import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {YamlService} from "../../services/YamlService";
import Resources from "../Resources/Resources";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs';
import './ConfigurationComponent.css';

class ConfigurationComponent extends Component {

    constructor(props) {
        super(props);
        this.yamlGen = new YamlService();
        this.state = {
            generatedYaml: `// Code`
        }
    }

    handleClick = () => {
        const data = {
            name: 'boarding-pass',
            type: 'git',
            source: {
                uri: "https://github.com/hack-space-atl/concourse-boarding-pass.git",
                branch: 'master'
            }
        };
        let jsonData = this.yamlGen.createResource(data);
        const moreData = {
            name: 'um whatName',
            type: 'some type',
            source: {
                target: "https://somewebsite.com",
                insecure: "true",
                teams: [
                    {
                        name: "teamName1",
                        username: 'hello',
                        password: 'somepass'
                    },
                    {
                        name: "teamName2",
                        username: 'something',
                        password: 'another pass'
                    }
                ]
            }
        };
        jsonData = this.yamlGen.createResource(moreData);
        // console.log(jsonData);
        const step = {
            name: "some job name",
            public: true,
            plan: [
                {
                    get: "my Repo"
                },
                {
                    task: "hello-world",
                    file: "resource-tutorial/tutorials/basic/task-hello-world/task_hello_world.yml"
                }
            ]
        };
        this.yamlGen.createJob(step);
        const parsed = this.yamlGen.toYaml();
        // const parsed = YamlService.test({plan: [step]});

        this.setState({
            generatedYaml: parsed
        });
    };


    render() {
        console.log("rendering with state: ", this.state);
        return (
            <div className="configuration">
                <h2 className="title">Configuration</h2>

                <div className="sections">

                    <div className="section-left"><Resources/></div>

                    <div className="section-mid">

                        <Resources/>

                    </div>

                    <div className="section-right">

                        <div className="codeViewer">
                            <SyntaxHighlighter language='yaml'
                                               style={docco.default}
                                               showLineNumbers={true}
                                               customStyle={{display: 'block'}}
                                               wrapLines={true}>{this.state.generatedYaml}</SyntaxHighlighter>
                            <div>
                                <button onClick={this.handleClick}>Download</button>
                            </div>
                        </div>


                    </div>
                </div>

                <Link to='/'>Back</Link>
            </div>
        )
    }
}

export default withRouter(ConfigurationComponent)
