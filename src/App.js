import React , {useState, useEffect} from "react";
import  api from './services/api';

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);
useEffect(()=>{
  api.get('repositories').then(response =>{
    setRepositories(response.data);
  });
},[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {title : "Repo 03",
    url : "http://github.com/repo02",
    techs: ["nodes", "reactjs"]});

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`);
        const newRepositories = repositories.filter(repo=> id !== repo.id);
        setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
