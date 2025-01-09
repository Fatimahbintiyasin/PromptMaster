//PromptList.jsx

import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//
import { gql, useQuery, useMutation } from "@apollo/client";

// query to fetch prompts
const GET_PROMPTS = gql`
  query GetPrompts {
    prompts {
      id
      chatId
      prompt
      response
      createdAt
      chatTitle
      upVotes
      downVotes
    }
  }
`;

//mutation to delete prompt
const DELETE_PROMPT = gql`
  mutation DeletePrompt($id: String!) {
    deletePrompt(id: $id) {
      id
      prompt
    }
  }
`;

// React component listing prompts
function PromptList() {
    const { loading, error, data, refetch } = useQuery(GET_PROMPTS);
    const [deletePrompt] = useMutation(DELETE_PROMPT, {
      onCompleted: () => refetch(), // Refetch tasks after deletion
    });
  
    if (loading) return <Spinner animation="border" />;
    if (error) {
        console.error("Error fetching prompts:", error);
        return <p>Error fetching prompts: {error.message}</p>;
      }
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this prompt?")) {
        deletePrompt({ variables: { id } });
      }
    };
    return (
      <div>
        <h2>See all your prompts here</h2>
        <Table>
          <thead>
            <tr>
              <th>Chat Id</th>
              <th>Prompt</th>
              <th>Response</th>
              <th>Created At</th>
              <th>Chat Title</th>
              <th>Up Votes</th>
              <th>Down Votes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.prompts.map((prompt) => (
              <tr key={prompt.id}>
                <td>{prompt.chatId}</td>
                <td>{prompt.prompt}</td>
                <td>{prompt.response}</td>
                <td>{prompt.createdAt}</td>
                <td>{prompt.chatTitle}</td>
                <td>{prompt.upVotes}</td>
                <td>{prompt.downVotes}</td>
                <td>
                  <button onClick={() => handleDelete(prompt.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <div className="center">
          <button className="center" onClick={() => refetch()}>
            Refetch
          </button>
        </div>
      </div>
    );
  }
  //
  export default PromptList;