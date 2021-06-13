import Head from "next/head";
import styles from "../styles/Home.module.css";
import RandomComp from "../components/randomcomp";

export default function Home() {
  const Nested = () => {
    return (
      <a href="/hello" onClick={() => console.log("hello")}>
        3
      </a>
    );
  };
  const Hello = () => {
    return (
      <a href="/hello" onClick={() => console.log("hello")}>
        3
      </a>
    );
  };

  const Hello2 = () => {
    return <Nested />;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Random Comp Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RandomComp>
        <a key="a" href="/hello" onClick={() => console.log("hello")}>
          1
        </a>
        <a key="b" href="/hello" onClick={() => console.log("hello")}>
          2
        </a>
        <Hello />
        <Hello />
        <Hello2 />
      </RandomComp>
    </div>
  );
}
