import React, { useState } from "react";
import ReactMarkdown from "react-markdown/with-html";
import ErrorBoundary from "./ErrorBoundary";
import moment from "moment";

//CSS
import "./Comments.css";

const Comments = ({ comments }) => {
    // Comments filter state
    const [inputValue, setInputValue] = useState("");
    // Comments filter handler
    const handleInputChange = ({ target: { value } }) => {
        setInputValue(value);
    };

    // Function to convert date to milliseconds
    const getMilSec = t => new Date(t).getTime();

    return (
        <div className="comments border">
            <h4>Comments</h4>
            <div className="filter">
                <span>Filter:</span>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button
                    className="btn btn-danger"
                    onClick={() => setInputValue("")}
                >
                    Clear filter
                </button>
            </div>

            {comments.length ? (
                comments
                    // Comments filter including author name
                    .filter(({ bodyText, author }) =>
                        (bodyText + " " + author.login)
                            .toLowerCase()
                            .includes(inputValue.trim().toLowerCase())
                    )
                    .sort(
                        ({ publishedAt: a }, { publishedAt: b }) =>
                            getMilSec(b) - getMilSec(a)
                    )
                    .map(({ author, bodyHTML, publishedAt, id }) => {
                        // update bodyHTML to prevent react-mardown Warnings
                        const updatedBodyHTML = bodyHTML.replace(/\n*/g, "");
                        return (
                            <div className="comment" key={id}>
                                <div className="titleComment">
                                    <h5>Author: {author.login}</h5>
                                    <h6>
                                        Published:{" "}
                                        {moment(publishedAt).fromNow()}
                                    </h6>
                                </div>
                                <ErrorBoundary>
                                    <ReactMarkdown
                                        source={updatedBodyHTML}
                                        escapeHtml={false}
                                    />
                                </ErrorBoundary>
                            </div>
                        );
                    })
            ) : (
                <h6>No comments yet</h6>
            )}
        </div>
    );
};

export default Comments;
