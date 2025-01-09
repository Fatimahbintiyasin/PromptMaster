//CreatePrompt.jsx

import React from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Import react-bootstrap components

// mutation to add a prompt
const ADD_PROMPT = gql`
  mutation AddPrompt($chatId: String!, $prompt: String!, $response: String!, $createdAt: String!, $chatTitle: String!, $upVotes: Int!, $downVotes: Int!) {
    createPrompt(chatId: $chatId, prompt: $prompt, response: $response, createdAt: $createdAt, chatTitle: $chatTitle, upVotes: $upVotes, downVotes: $downVotes) {
      id
      chatId
      prompt
    }
  }
`;

function CreatePrompt() {
    let navigate = useNavigate();
    const [addPrompt, {error}] = useMutation(ADD_PROMPT);

    const [chatId, setChatId] = React.useState('');
    const [prompt, setPrompt] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [createdAt, setCreatedAt] = React.useState('');
    const [chatTitle, setChatTitle] = React.useState('');
    const [upVotes, setUpVotes] = React.useState('');
    const [downVotes, setDownVotes] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await addPrompt({ variables: { chatId, prompt, response, createdAt, chatTitle, upVotes: parseInt(upVotes), 
                downVotes: parseInt(downVotes)  } });
                setChatId('');
                setPrompt('');
                setResponse('');
                setCreatedAt('');
                setChatTitle('');
                setUpVotes('');
                setDownVotes('');
        
                navigate('/promptlist');
        }catch (err) {
            console.error("Failed to create prompt:", err);
          }
    };

    if (error) {
        return <p>Error creating prompt: {error.message}</p>;
      }

    return (
        <Container>
            <h2>Add Prompt</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Chat Id</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Chat Id"
                            value={chatId}
                            onChange={(e) => setChatId(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Prompt</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Response</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Response"
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Created Date</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="date"
                            placeholder="Created Date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Chat Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Chat Title"
                            value={chatTitle}
                            onChange={(e) => setChatTitle(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Up Votes</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Up Votes"
                            value={upVotes}
                            onChange={(e) => setUpVotes(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Down Votes</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Down Votes"
                            value={downVotes}
                            onChange={(e) => setDownVotes(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </Container>
    );

}
export default CreatePrompt;