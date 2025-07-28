import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [data, setData] = useState(null);

  // Request data to the API
  useEffect(() => {
    api.get('/home')
      .then(response => {
        console.log("response.data:", response.data); // Check data's content on console's log
        setData(response.data);
      })
      .catch(error => {
        console.error("Error: Homepage's data couldn't be found:", error);
      });
  }, []);

  // View
  if (!data) return <p style={{ padding: '2rem' }}>Carregando</p>;

  return (
    <div className="page-body">
      <h1>All Sheets</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Character</th>
              <th>Player</th>
            </tr>
          </thead>
          {data.map(({characterName, playerName}, index) => (
          <tbody key={index} className="sheet-summary">
            <tr>
              <td>{characterName}</td>
              <td>{playerName}</td>
            </tr>
          </tbody>
          ))}
        </table>
      <div><strong>Sheets:</strong> {data[0].id}</div>
      </div>
    </div>
  );
};

export default Home;