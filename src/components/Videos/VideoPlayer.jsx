import React from 'react'
import './VideoPlayer.scss'
import ReactPlayer from 'react-player'

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active
        };
    
        this.toggleVideo = this.toggleVideo.bind(this)
    }
    
    toggleVideo () { 
        this.setState({
            active: !this.state.active
        })
    }

    render() {

        return (
            <span className="video-player">
                <span className="video-player-toggle" onClick={this.toggleVideo}>{this.props.children}</span>

                {this.state.active &&
                    <div className="video-player-wrap" onClick={this.toggleVideo}>
                    <div className="video-player-container" >
                        <div className="video-player-ratio" >
                        <ReactPlayer
                                playing
                                url={this.props.url}
                                controls={true}
                                width="100%"
                                height="100%"
                                onEnded={this.toggleVideo}
                        />
                    </div>
                    </div>
                    <h3>{this.props.title}</h3>
                    </div>
                }
            </span>
        )
    }
}

export default VideoPlayer