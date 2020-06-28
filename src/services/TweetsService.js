import {model} from './TweetModel';
import fetchJsonp from 'fetch-jsonp';

class TweetsService {

    _url = 'http://tweetsaver.herokuapp.com/';

    get(param) {
        return fetchJsonp(`${this._url}?q=${param}&count=10`)
            .then(response => response.json())
            .then(data => {
                return data.tweets.map( t => {
                    return model(
                        t.id,
                        t.user.profileImageUrlHttps,
                        t.user.name,
                        t.user.screenName,
                        t.createdAt,
                        t.text
                    )
                })
            })
            .catch(function(ex) {
                throw ex;
            });
    }
}

export default (function getInstance() {
    return new TweetsService();
})();