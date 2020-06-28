import React, {Component} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Tweet.css';

class Tweet extends Component {

    remove(id) {
        this.props.remove(id);
    }

    render() {
        const {id, index, name, img, screenName, date, message, remove} = this.props;
        return (
            <Draggable 
                draggableId={id.toString()}
                index={index}
                onDragStart={this.handleDrag}>

                    {(provided) => (
                        <div className="Tweet"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>

                            <div className="Tweet-container">
                                <div className="Tweet-image">
                                    <img src={img} alt="profile"/>
                                </div>
                                <div className="Tweet-content">
                                    <div className="Tweet-content-header">
                                        <span className="Tweet-content-header-name">{name}</span>
                                        <span><a href={`https://twitter.com/${screenName}`}>@{screenName}</a></span>
                                        <span className="Tweet-content-header-date">{date}</span>
                                        { remove ? 
                                            <div onClick={() => this.remove(id)} >
                                                <FontAwesomeIcon 
                                                    className="Tweet-content-header-remove" 
                                                    icon={faTrashAlt} />
                                            </div>
                                           : ''
                                        }
                                    </div>
                                    <div className="Tweet-content-message">
                                        <span>{message}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </Draggable>
        )
    }
}

export default Tweet;