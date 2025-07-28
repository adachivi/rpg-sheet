import api from '../services/api';

const NewSheet = () => {
    const submitSheet = () => {
        const characterName = document.getElementById("characterName").value;
        const playerName = document.getElementById("playerName").value;

        api.post('/sheet', {characterName, playerName});
    };
    
    // View
    return (
      <div className="page-body">
        <h1>Create a new sheet</h1>

        <form>
          <label htmlFor="characterName">Character Name</label>
          <input type="text" id="characterName" name="characterName"></input><br />
          <label htmlFor="playerName">Player Name</label>
          <input type="text" id="playerName" name="playerName"></input><br />
          <button type="button" onClick={submitSheet}>Submit</button>
        </form>
      </div>
    );
};

export default NewSheet;