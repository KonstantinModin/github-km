import React from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown/with-html";

// Components
import Comments from "./Comments";
import ErrorBoundary from "./ErrorBoundary";

//CSS
import "./ItemPageContent.css";

const ItemPageContent = ({ data, list, user, repo }) => {
    const {
        author,
        title,
        number,
        state,
        bodyHTML,
        publishedAt,
        createdAt,
        comments
    } = data.repository[list];

    return (
        <>
            <div className="title border">
                <div className="columnLeft">
                    <div>Github User Name: {user}</div>
                    <div>Repository: {repo}</div>
                </div>
                <div className="columnRight">
                    <h4>{list}</h4>
                    <div>#{number}</div>
                    <h3>{title}</h3>
                    <div>State: {state}</div>
                    <div>Published: {moment(publishedAt).fromNow()}</div>
                    <div>Created: {moment(createdAt).fromNow()}</div>
                    <div>Comments: {comments.nodes.length}</div>
                </div>
            </div>
            <div className="body border">
                <div className="titleBody">
                    <img src={author.avatarUrl} alt="item author" />
                    <h5>Author: {author.login}</h5>
                    <h6>Published: {moment(publishedAt).fromNow()}</h6>
                </div>
                <ErrorBoundary>
                    <ReactMarkdown source={bodyHTML} escapeHtml={false} />
                </ErrorBoundary>
            </div>
            <Comments comments={comments.nodes} />
        </>
    );
};

export default ItemPageContent;
