import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

// Apollo
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// Components
import ErrorIndicator from "./ErrorIndicator";
import Spinner from "./Spinner";

// CSS
import "./ItemList.css";

const ItemList = ({ user, repo, list, setup }) => {
    const repoQuery = gql`
        query Repo($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                ${list}(last: 9${setup}, orderBy: { field: CREATED_AT, direction: ASC }) {  
                    nodes {
                        number
                        author {
                            login
                        }                        
                        id
                        title
                        publishedAt                                      
                    }
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(repoQuery, {
        variables: { owner: user, name: repo }
    });

    const history = useHistory();

    const handleItemClick = number => {
        history.push("/item", [{ number, user, repo, list }]);
    };

    const content = loading ? (
        <Spinner />
    ) : error ? (
        <ErrorIndicator error={error} />
    ) : (
        <div>
            {data.repository[list].nodes.map(
                ({ id, title, author, publishedAt, number }) => {
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
                                Author: {author.login} Published:{" "}
                                {moment(publishedAt).fromNow()}
                            </div>
                        </div>
                    );
                }
            )}
        </div>
    );

    return (
        <div className="itemList">
            <h5>
                {setup ? (setup.includes("CLOSED") ? "Closed " : "Open ") : ""}
                {list} list
            </h5>
            {content}
        </div>
    );
};

export default React.memo(ItemList);
