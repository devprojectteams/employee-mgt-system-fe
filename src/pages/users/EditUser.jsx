import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:8081/users/${id}`);
      setUser(result.data);
    };

    loadUser();
  }, [id]);

  const deleteUser = useCallback(
    async (id) => {
      await axios.delete(`http://localhost:8081/users/${id}`);
      navigate("/");
    },
    [navigate]
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>User Details</h3>

            <div>
              <button
                className="btn btn-outline-danger mr-2"
                onClick={() => deleteUser(id)}
              >
                Delete
              </button>
              <Link className="btn btn-outline-primary mr-2" to={`/edit/${id}`}>
                Edit
              </Link>
              <Link className="btn btn-outline-secondary" to="/">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mb-2">
            <strong>Name: </strong>
            {user.name}
          </div>

          <div className="mb-2">
            <strong>Username: </strong>
            {user.username}
          </div>

          <div>
            <strong>Email: </strong>
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
}
