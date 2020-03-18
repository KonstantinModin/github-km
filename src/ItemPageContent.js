import React from "react";
import ReactMarkdown from "react-markdown/with-html";

//CSS
import "./ItemPageContent.css";

const ItemPageContent = ({ data, list, user, repo }) => {
    const {
        id,
        author,
        title,
        state,
        bodyHTML,
        closed,
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
                </div>
            </div>
            <div className="body border">
                <ReactMarkdown source={bodyHTML} escapeHtml={false} />
            </div>
            <div className="comments border">
                <h4>Comments</h4>
                {comments.nodes.map(({ author, bodyHTML, publishedAt, id }) => {
                    // update bodyHTML to prevent multiples console Warnings
                    const updatedBodyHTML = bodyHTML.replace(/\n*/g, "");
                    return (
                        <div className="comment" key={id}>
                            <ReactMarkdown
                                source={updatedBodyHTML}
                                escapeHtml={false}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ItemPageContent;
