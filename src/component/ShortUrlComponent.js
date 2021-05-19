import React, { Component } from 'react'
import './ShortUrlComponent.css'
import DetailsComponent from './UrlDetailsComponent'

const url = 'http://localhost:8080/api/shortenurl'
const appUrl = 'http://localhost:8080/api/'

const open = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

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
            longUrl: data,
            loadDeatails: false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            url: this.state.longUrl
        }
        if (this.state.longUrl !== "") {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(response => response.json())
                .then((data) => {
                    this.setState({
                        shorturl: appUrl + data.url
                    })
                }).catch((err) => {
                    console.log("Err: ", err)
                })
        }
    }

    handleDetailComponent = () => {
        this.setState({
            loadDeatails: true
        })
    }

    openInNewTab = async () => {
        let urlDt = this.state.shorturl
        await fetch(urlDt)
            .then(response => response.json())
            .then((data) => {
                open(data.url)
            }).catch((err) => {
                console.log("Err: ", err)
            })
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
                            placeholder="Enter url"
                            onChange={(url) => {this.onChangeHandle(url)}} />
                            <br/><br/>
                        <button className="btn"> submit </button><br />
                    </form>

                    {this.state.shorturl === "" ? <label></label> :
                        <label>Short url:</label>}<br /><br />
                    <div>
                        <a onClick={this.openInNewTab}
                           className="output"> 
                           {this.state.shorturl}
                        </a>
                    </div>
                    <br /><br />

                    <div>
                        <button
                            style={{ width: "100px", height: "40px" }}
                            onClick={this.handleDetailComponent}> Show Details </button><br />
                        {this.state.loadDeatails === true ?
                            <DetailsComponent url={url} appurl={appUrl} />
                            : <div></div>}
                    </div>
                </div>
            </div>
        )
    }
}



export default ShortUrlComponent
