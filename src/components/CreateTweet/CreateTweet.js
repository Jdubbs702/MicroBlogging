import "./CreateTweet.css";
import TextareaAutosize from "react-textarea-autosize";
import { useState, useContext, useEffect } from "react";
import { TweetsContext } from "../../contexts/TweetsContext";
import Btn from "../../UIKit/Elements/Btn/Btn";
import { AuthContext } from "../../contexts/AuthContext";

const CreateTweet = () => {
  const { displayName, photoURL } = useContext(AuthContext);
  const { addNewTweet } = useContext(TweetsContext);
  const [content, setContent] = useState("");
  const [tooLong, setTooLong] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    !photoURL ? setBtnDisabled(true) : setBtnDisabled(false);
  }, [photoURL]);
  useEffect(() => {
    !photoURL ? setBtnDisabled(true) : setBtnDisabled(false);
  }, [photoURL]);

  const createTweetHandler = async (e) => {
    e.preventDefault();
    if (content.trim().length > 0) {
      await addNewTweet(content);
      setContent("");
    }
  };

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
    if (content.length > 140) {
      setTooLong(true);
    } else {
      setTooLong(false);
    }
  };

  return (
    <form onSubmit={createTweetHandler} className="CreateTweet">
      <TextareaAutosize
        placeholder="Something you wanna say?"
        value={content}
        onChange={handleTextAreaChange}
        style={{ width: "inherit" }}
      ></TextareaAutosize>
      <div className="tweet-footer">
        <div>
          {!displayName ? (
            <div className="create-message">
              Please select Username in Profile.
            </div>
          ) : (
            ""
          )}
          {!photoURL ? (
            <div className="create-message">
              Please select Photo in Profile.
            </div>
          ) : (
            ""
          )}
          {tooLong && (
            <div className="create-message">
              The tweet can't contain more than 140 chars.
            </div>
          )}
        </div>
        <div className="btn-container">
          <Btn disabled={btnDisabled} className="add-button">
            Tweet
          </Btn>
        </div>
      </div>
    </form>
  );
};

export default CreateTweet;
