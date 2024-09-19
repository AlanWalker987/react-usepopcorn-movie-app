import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
//import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      color="yellow"
      size={48}
      messages={["bad", "okay", "average", "good", "amazing"]}
    />
    <StarRating maxRating={3} color="red" size={30} messages={[]} />
  </React.StrictMode>
);
