import React from "react";
import s from "./Loading.module.css";

function Loading() {
  return <div className={`${s.loading} ${s["loading--full-height"]}`}></div>;
}

export default Loading;
