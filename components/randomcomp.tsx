import React, { useEffect } from "react";
import axios from "axios";

interface LayoutProps {
  children: Array<React.ReactNode>;
}

type InputProps = React.ComponentProps<"input">;

const extractProps = (reactComp: React.ReactNode) => {
  console.log(reactComp);
};

const RandomComp = (props: LayoutProps) => {
  const { children } = props;
  const chosenChild = children[Math.floor(Math.random() * children.length)];
  const start = new Date().getTime();
  let timeToFirstInter = -1;
  useEffect(() => {
    const logger = () => {
      const end = new Date().getTime();
      axios.post(
        "/api/write_log",
        JSON.stringify({
          // child: chosenChild,
          origin: window.location.pathname,
          duration: end - start,
          timeToFirstInter: timeToFirstInter,
        })
      );
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

export default RandomComp;
