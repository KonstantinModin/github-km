import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ItemList = ({ user, repo, list, setup }) => {
    const repoQuery = gql`
        query Repo($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                ${list}(last: 10${setup}) {
                    nodes {
                        id
                        title
                    }
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(repoQuery, {
        variables: { owner: user, name: repo }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="itemList">
            <h5>{list} list</h5>
            <div>
                {data.repository[list].nodes.map(({ id, title }) => {
                    return (
                        <div className="item" key={id}>
                            {title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ItemList;
