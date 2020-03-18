import React from "react";

// Apollo
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// Components
import ErrorIndicator from "./ErrorIndicator";
import Spinner from "./Spinner";
import ItemListContent from "./ItemListContent";

// CSS
import "./ItemList.css";

const ItemList = ({ user, repo, list, setup }) => {
    const repoQuery = gql`
        query Repo($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                ${list}(last: 20${setup}, orderBy: { field: CREATED_AT, direction: ASC }) {  
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

    const content = loading ? (
        <Spinner />
    ) : error ? (
        <ErrorIndicator error={error} />
    ) : (
        <ItemListContent
            data={data.repository[list].nodes}
            repo={repo}
            list={list}
            user={user}
        />
    );

    return <div className="itemList">{content}</div>;
};

export default React.memo(ItemList);
