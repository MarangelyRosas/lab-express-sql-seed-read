import axios from "axios";
import { useState, useEffect } from "react";
import Song from "./Song";

const API = process.env.REACT_APP_API_URL;

function Songs() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    axios.get(`${API}/songs`)
    .then((response) => {
      setSongs(response.data)
    }).catch((e) => {
      console.warn("catch", e)
    });
  }, []);

  return (
    <div className="Songs">
      <section>
        <table className="Songs">
          <thead>
            <tr>
              <th scope="col">Fav</th>
              <th scope="col">Song</th>
              <th scope="col">Artist</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => {
              return <Song key={song.id} song={song} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Songs;