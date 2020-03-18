import React from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown/with-html";

// Components
import Comments from "./Comments";

//CSS
import "./ItemPageContent.css";

const ItemPageContent = ({ data, list, user, repo }) => {
    const {
        author,
        title,
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
                    <h3>{title}</h3>
                    <div>Author: {author.login}</div>
                    <div>State: {state}</div>
                    <div>Published: {moment(publishedAt).fromNow()}</div>
                    <div>Created: {moment(createdAt).fromNow()}</div>
                </div>
            </div>
            <div className="body border">
                <ReactMarkdown source={bodyHTML} escapeHtml={false} />
            </div>
            <Comments comments={comments.nodes} />
        </>
    );
};

export default ItemPageContent;
