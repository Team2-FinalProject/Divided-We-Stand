import React from "react";

export default function Podium() {
  return (
    <section>
      <div id="podium-box" className="row" style={{height: "300px", marginLeft: "3cm", marginTop: "1cm"}}>
        <div className="col-md-4 step-container m-0 p-0">
          <div style={{color: "white"}}>Text 2</div>
          <div id="second-step" className="bg-blue step centerBoth podium-number">
            2
          </div>
        </div>
        <div className="col-md-4 step-container m-0 p-0">
          <div style={{color: "white"}}>Text 1</div>
          <div id="first-step" className="bg-blue step centerBoth podium-number">
            1
          </div>
        </div>
      </div>
    </section>
  );
}
