import Tweet from '../Tweet/Tweet';
import './TweetList.css';
import { useContext, useState } from 'react';
import { TweetsContext } from '../../contexts/TweetsContext';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

const TweetList = () => {
    const { tweets, scrollDown, isEmpty } = useContext(TweetsContext);
    const [isLoading, setIsLoading] = useState(false);

    const downHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await scrollDown();
        setIsLoading(false);
    };
    console.log(tweets);
    return (
        <>
            <ReactScrollWheelHandler downHandler={downHandler} >
                <div className="TweetList">
                {tweets.map((tweet) => (
                    <Tweet key={tweet.date} {...tweet} />
                ))}
                {isEmpty && <div style={{ color: '#CCCCCC' }}>Nothing to see here..</div>}
                </div>
                
            </ReactScrollWheelHandler>
            {isLoading && <div style={{ color: '#CCCCCC' }}>Loading...</div>}
            
        </>
    );
}
export default TweetList;
