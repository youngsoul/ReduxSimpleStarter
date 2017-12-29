import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBToye6JgbfZcpWAGn7QzLQioiktBrFy7s';

// create a new component and it should produce html

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');

    }
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    }

    render() {
        // videoSearch is a function that is only allowed to be called every
        // 300ms.  a sort of debounce like a hardware button.
        const videoSearch = _.debounce( (term) => {this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList videos={this.state.videos} onVideoSelect={video => this.setState({selectedVideo: video})} />
            </div>
        );
    }
}

// take this components generated html and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));