import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Row, Col, Spinner, Card, CardHeader, CardBody,Button, Input } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {FaEdit} from "react-icons/fa"

export const UsersPosts = () => {
  let initialState = {
    data: undefined,
    error: undefined,
    loading: true,
  };
  const [posts, setPosts] = useState(initialState);
  const { id } = useParams();
 
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({title: "", body: ""});


  const editItem = (id, title, body) => {
    setEditMode(true);
    setFormData({id, title, body});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, formData)
        .then(({ data }) => {
          setPosts((prevState) => ({
            ...prevState,
            data: prevState.data.map((post) =>
              post.id === data.id ? data : post
            ),
          }));
          setEditMode(false);
          setFormData({title: "", body: ""});
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(`https://jsonplaceholder.typicode.com/posts`, formData)
        .then(({ data }) => {
          setPosts((prevState) => ({
            ...prevState,
            data: [...prevState.data, data],
          }));
          setFormData({title: "", body: ""});
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  

  const deleteItem = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts((prevState) => ({
          ...prevState,
          data: prevState.data.filter((post) => post.id !== id),
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(({ data }) => {
        setPosts((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setPosts({ data: undefined, loading: false, error: err.toString() });
      });
  }, [id]);
  const renderBody = () => {
    if (posts.loading) {
      return <Spinner />;
    } else if (posts.error) {
      return <h4 className="text-danger">Unexpected error occurred :(</h4>;
    } else {
      const postsData = posts.data || [];
      if (postsData instanceof Array) { 
        return (
          <>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Input
                type="textarea"
                placeholder="Body"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
              />
              <Button style={{backgroundColor:"blue"}} type="submit">
                {editMode ? "Update Post" : "Create Post"}
              </Button>
            </form>
            {postsData.map(({ title, body, id }) => (
              <Card className="mt-3" key={id}>
                <CardHeader>{title}</CardHeader>
                <CardBody>
                  {body}
                  <button
                    onClick={() => deleteItem(id)}
                    style={{ color: "red", border: "none", backgroundColor: "white" }}
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    onClick={() => editItem(id, title, body)}
                    style={{ color: "green", border: "none", backgroundColor: "white" }}
                  >
                    <FaEdit />
                  </button>
                </CardBody>
              </Card>
            ))}
          </>
        );
      }
    }
  };
  


  return (
    <Layout>
      <Row>
        <Col ms={12}>
        {renderBody()}
        </Col>
      </Row>
    </Layout>
  );
};