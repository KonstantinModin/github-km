import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

const ItemListContent = ({ data, list, user, repo }) => {
    const history = useHistory();

    //Go to Item Page
    const handleItemClick = number => {
        history.push("/item", [{ number, user, repo, list }]);
    };

    // Function to convert date to milliseconds
    const getMilSec = t => new Date(t).getTime();

    return (
        <>
            {data
                // sort to show last items first
                .sort(
                    (a, b) =>
                        getMilSec(b.publishedAt) - getMilSec(a.publishedAt)
                )
                .map(({ id, title, author, publishedAt, number }) => {
                    return (
                        <div
                            className="item"
                            key={id}
                            onClick={() => handleItemClick(number)}
                        >
                            <div className="title">
                                Title: <span>{title}</span>
                            </div>
                            <div className="description">
                                <span>#{number}</span>
                                <span>Author: {author.login}</span>
                                <span>
                                    Published: {moment(publishedAt).fromNow()}
                                </span>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default React.memo(ItemListContent);
