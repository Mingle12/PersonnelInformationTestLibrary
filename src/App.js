
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: ''
  });

  useEffect(() => {
    async function fetchPersons() {
      const response = await axios.get('http://localhost:8080/list');
      setPersons(response.data);
    }
    fetchPersons();
  }, []);

  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/add', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log(formData);
  }

  const columns = [
    {
      title:'id',
      dataIndex:'id',
      key:'id',
    },
    {
      title:'name',
      dataIndex:'name',
      key:'name',
    },
    {
      title:'age',
      dataIndex:'age',
      key:'age',
    },
    {
      title:'add',
      dataIndex:'add',
      key:'add',
    },
    {
      title:'delete',
      dataIndex:'delete',
      key:'delete',
    },
  ]
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
      <button onClick={handleClick}>点击添加人员信息</button> {showInput ? (
        <form onSubmit={handleSubmit}>
          <label>
            id：
            <input type="number" name="id" value={formData.id} onChange={handleInputChange} />
          </label>
          <label>
            姓名：
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            年龄：
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
          </label>
          <button type="submit">提交</button>
        </form>
      ) : null}


    </div>
  );
}

export default App;
