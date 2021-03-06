import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Droppable } from 'react-beautiful-dnd';
import AlertModal from './AlertModal';
import Tweet from './Tweet';
import tweets from '../services/TweetsService';
import Helper from '../util/Helper';
import './TweetBox.css';

class TweetBox extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            tweets: [],
            isLoading: false,
            searchValue: '',
            errorMessage: ''
        };
        this.alertModalElement = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.loadTweets = this.loadTweets.bind(this);
    }

    sendTweets(data) {
        this.props.sendTweets(data);
    }

    updateTweets(data) {
        this.setState({ tweets: data });
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value});
    }

    loadTweets(event) {
        event.preventDefault();
        const {searchValue} = this.state;
        if (searchValue) {
            this.setState({isLoading: true});
            tweets.get(searchValue)
                .then((data) => {
                    this.setState({tweets: data, isLoading: false, errorMessage: '' });
                    this.sendTweets(data);
                    this.alertModalElement.current.closeModal();
                })
                .catch(e => {
                    this.setState({tweets: [], isLoading: false, errorMessage: e });
                    this.alertModalElement.current.openModal();
                });
        }
    }

    render() {
        return (
            <div className="TweetBox">
                
                <header className="TweetBox-header">
                    <form className="TweetBox-search" onSubmit={this.loadTweets}>
                        <input
                            type="text"
                            value={this.state.searchValue}
                            onChange={this.handleChange}
                            placeholder="Search Twitter"
                            tabIndex="0" />
                        <button 
                            type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                </header>
                
                { this.state.isLoading ?
                    <div className="TweetBox-loading"><FontAwesomeIcon icon={faCircleNotch} /></div> :
                    <Droppable droppableId={'0'}>
                        {(provided) => (
                            <div
                                className="TweetBox-content"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {this.state.tweets.map((t, idx) => 
                                    <Tweet 
                                        key={t.id}
                                        id={t.id}
                                        index={idx}
                                        img={t.img}
                                        name={t.name}
                                        screenName={t.screenName}
                                        date={Helper.formatDateFrom(t.date)}
                                        message={t.message} />
                                )}
                                { provided.placeholder }
                            </div>
                        )}
                    </Droppable>
                }
                <AlertModal ref={this.alertModalElement} message={this.state.errorMessage} />
            </div>
        )
    }
}

export default TweetBox;