import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:8080/users/${id}`);
      setUser(result.data);
    };

    loadUser();
  }, [id]);

  const { name, username, email, id: userId } = user;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Details of User with ID: {userId}</h2>

          <div className="card">
            <div className="card-header">User Details</div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name: </b> {name}
              </li>
              <li className="list-group-item">
                <b>Username: </b>
                {username}
              </li>
              <li className="list-group-item">
                <b>Email: </b> {email}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to="/" data-testid="home-link">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
