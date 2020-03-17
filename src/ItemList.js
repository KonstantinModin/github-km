import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ItemList = ({ user, repo, list, setup }) => {
    const repoQuery = gql`
        query Repo($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                ${list}(last: 10${setup}) {  
                    nodes {
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

    const content = loading ? (
        <p>Loading...</p>
    ) : error ? (
        <>
            <h3>Something went wrong </h3>
            <h5>{error.message}</h5>
        </>
    ) : (
        <div>
            {data.repository[list].nodes.map(
                ({ id, title, author, publishedAt }) => {
                    return (
                        <div className="item" key={id}>
                            <div className="title">
                                Title: <span>{title}</span>
                            </div>
                            <div className="description">
                                Author: {author.login} Published at:&nbsp;
                                {publishedAt.toLocaleString()}
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
