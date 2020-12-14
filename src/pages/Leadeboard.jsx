import React from "react";
import Podium from "../components/Podium"

export default function Leaderboard() {
  return (
    <section>
      <h1 style={{ color: "white", textAlign: "center", marginTop: "1cm" }}>
        Leaderboard
      </h1>
        <table className="nes-table is-bordered is-dark center">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Damage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Yeska Haganta</td>
              <td style={{textAlign:"right"}}>55</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Adrian</td>
              <td style={{textAlign:"right"}}>35</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Rivari</td>
              <td style={{textAlign:"right"}}>15</td>
            </tr>
          </tbody>
        </table>
      <Podium></Podium>
    </section>
  );
}
