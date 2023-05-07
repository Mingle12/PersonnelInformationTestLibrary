import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Add() {

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    async function fetchPersons() {
      const response = await axios.get('http://localhost:8080/list');
      setPersons(response.data);
    }
    fetchPersons();
  }, []);

  return (
    <div>
      <h2>Person List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {persons.map(person =>
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Add;
