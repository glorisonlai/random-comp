import React, { useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

interface LayoutProps {
  children: Array<JSX.Element>;
}

const RandomComp: React.FC<LayoutProps> = ({ children }) => {
  const chosenChild = children[Math.floor(Math.random() * children.length)];
  const start = new Date().getTime();
  let timeToFirstInter = -1;
  useEffect(() => {
    const logger = () => {
      const end = new Date().getTime();
      console.log(chosenChild.key, chosenChild.type);
      axios.post("/api/write_log", {
        props: chosenChild.props,
        origin: window.location.pathname,
        duration: end - start,
        timeToFirstInter: timeToFirstInter,
      });
    };
    window.addEventListener("beforeunload", logger);
    return () => {
      window.removeEventListener("beforeunload", logger);
    };
  }, []);

  const logInter: VoidFunction = () => {
    if (timeToFirstInter > 0) return;
    const end = new Date().getTime();
    timeToFirstInter = end - start;
  };
  return <div onClick={logInter}>{chosenChild}</div>;
};

const NoSsr = dynamic(() => Promise.resolve(RandomComp), { ssr: false });

export default NoSsr;
