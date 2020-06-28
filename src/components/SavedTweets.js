import React, {Component} from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Tweet from './Tweet';
import Helper from '../util/Helper';
import './SavedTweets.css';

class SavedTweets extends Component {
    
    static defaultProps = {
        tweets: []
    }

    render() {
        const { remove } = this.props;
        return (
            <div className="SavedTweets">
                <header className="SavedTweets-header">
                    <h2>Saved Tweets</h2>
                </header>
                <Droppable 
                    droppableId={'1'}
                >
                    {(provided) => (
                        <div
                            className="SavedTweets-content"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tweets.map((t, idx) => 
                                <Tweet 
                                    id={t.id}
                                    index={idx}
                                    key={t.id} 
                                    img={t.img}
                                    name={t.name}
                                    screenName={t.screenName}
                                    date={Helper.formatDateFrom(t.date)}
                                    message={t.message}
                                    remove={remove}/>
                            )}
                            { provided.placeholder }
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default SavedTweets;