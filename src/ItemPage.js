import React from "react";

// Apollo
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// Components
import ItemPageContent from "./ItemPageContent";
import Spinner from "./Spinner";
import ErrorIndicator from "./ErrorIndicator";

// CSS
import "./ItemPage.css";

const ItemPage = ({ history }) => {
    const { number, user, repo, list } = history.location.state[0];

    const listSingle = list.slice(0, -1);

    const itemQuery = gql`
        query itemQuery($owner: String!, $name: String!, $node_number:Int!) {
            repository(owner: $owner, name: $name) {
                ${listSingle}(number: $node_number) {                    
                    author {
                        login
                    }
                    title
                    state
                    bodyHTML                                                             
                    publishedAt
                    createdAt
                    comments(last:20) {
                        nodes {
                            id
                            author {
                                login
                            }
                            bodyHTML                            
                            bodyText
                            publishedAt
                        }
                    }                                              
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(itemQuery, {
        variables: { owner: user, name: repo, node_number: number }
    });

    const content = loading ? (
        <Spinner />
    ) : error ? (
        <ErrorIndicator error={error} />
    ) : (
        <ItemPageContent
            data={data}
            list={listSingle}
            user={user}
            repo={repo}
        />
    );

    return (
        <div className="itemPage">
            <button className="btn btn-info" onClick={() => history.goBack()}>
                Go back
            </button>
            {content}
        </div>
    );
};

export default ItemPage;
