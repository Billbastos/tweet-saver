import React, {Component} from 'react';
import TweetBox from './TweetBox'
import SavedTweets from './SavedTweets'
import storageService from '../services/LocalStorageService'
import { DragDropContext } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './TweetSaver.css'

class TweetSaver extends Component {

    constructor() {
        super();
        this.state = {
            left: [],
            right: []
        };
        this.tweetBoxElement = React.createRef();
        this.onDragEnd = this.onDragEnd.bind(this);
        this.updateLeftState = this.updateLeftState.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        const tweets = JSON.parse(localStorage.getItem('tweets'));
        this.setState({ right: tweets || [] });
    }

    updateLeftState(data) {
        this.setState({left: data})
    }

    removeItem(itemId) {
        const itemRemoved = storageService.remove(itemId);
        if (itemRemoved) {
            const left = [...this.state.left];
            left.push(itemRemoved);
            this.tweetBoxElement.current.updateTweets(left);
            this.setState({
                left: left,
                right: storageService.localItems,
            });
        }
    }

    onDragEnd(result) {
        const {draggableId, destination, source } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId) {
            return;
        }
        if (destination.droppableId === '1') {
            let index;
            const item = this.state.left.find( (i, idx) => {
                const found = i.id.toString() === draggableId.toString()
                index = found ? idx : -1;
                return i.id.toString() === draggableId.toString();
            });
            if (!storageService.isStoraged(item)) {
                storageService.add(item);
                const left = [...this.state.left];
                if (index !== -1) {
                    left.splice(index, 1);
                    this.tweetBoxElement.current.updateTweets(left);
                }
                this.setState({
                    right: this.state.right.concat(item),
                    left: left
                })
            }
        }
    }

    render() {
        return (
            <div>
                <header className="TweetSaver-header">
                    <h1>Tweet Saver <FontAwesomeIcon className="TweetSaver-header-icon" icon={faTwitter} /></h1>
                    <span className="TweetSaver-header-autor">By Gui Bastos - 2020</span>
                </header>
                <main className="TweetSaver-content">
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        <div className="TweetSaver-tweetbox">
                            <TweetBox ref={this.tweetBoxElement} sendTweets={this.updateLeftState}/>
                            <SavedTweets tweets={this.state.right} remove={this.removeItem}/>
                        </div>
                    </DragDropContext>
                </main>
            </div>
        )
    }
}

export default TweetSaver;