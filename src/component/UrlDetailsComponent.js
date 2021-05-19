import React, { Component } from 'react'
import './UrlDetailsComponent.css'

const header = ['Long url', 'Short url', 'Total used count'];

class UrlDetailsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            data: []
        }
    }

    fetchUrl = async () => {
        await fetch(this.props.url)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    loading: false,
                    data: data
                })
            }).catch((err) => {
                console.log("Err: ", err)
            })
    }

    componentDidMount() {
        this.fetchUrl()
    }

    render() {

        let size = this.state.data
        return (
            <div>
                { size.length === 0 ? <p></p> :
                    <div>
                        <h3>Show url details: </h3>
                        <table className="table">
                            <thead>
                                <tr>{header.map((v, i) => <td key={i}>{v}</td>)}</tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((d, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><a href={d.longUrl}>{d.longUrl}</a></td>
                                            <td><a href={d.shortUrl}>{this.props.appurl+d.shortUrl}</a></td>
                                            <td>{d.usedCount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
            </div>
        )
    }
}

export default UrlDetailsComponent
