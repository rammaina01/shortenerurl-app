import React, { Component } from 'react'
import './ShortUrlComponent.css'
import DetailsComponent from './UrlDetailsComponent'

const url = 'http://localhost:8080/api/shortenurl'
const appUrl ='http://localhost:8080/api/'
class ShortUrlComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            shorturl: '',
            longUrl: ''
        }
    }


    onChangeHandle(event) {
        event.preventDefault();
        let data = event.target.value
        this.setState({
            longUrl: data
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            url: this.state.longUrl
        }
        if(this.state.longUrl !== ""){
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then((data) => {
                    console.log("s url>>", data.url)
                    this.setState({
                        shorturl: appUrl+data.url
                    })
                }).catch((err) => {
                    console.log("Err: ", err)
                })
        }
    }

    render() {
        return (
            <div className="container">
                <div>
                <h2>Url Shortener </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter full url:</label><br />
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter url "
                        onChange={(url) => { this.onChangeHandle(url) }} /><br /><br />
                    <button className="btn"> submit </button><br />
                </form>
                {this.state.shorturl ==="" ?<label></label>:<label>Short url:</label>}
                <p className="output">{this.state.shorturl}</p><br/>
                <div>
                    <DetailsComponent url={url} appurl={appUrl}/>
                </div>
                </div>
            </div>
        )
    }
}

export default ShortUrlComponent
