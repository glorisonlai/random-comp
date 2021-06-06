import Head from "next/head";
import styles from "../styles/Home.module.css";
import RandomComp from "../components/randomcomp";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Comp Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RandomComp>
        <a href="/hello" onClick={() => console.log("hello")}>
          1
        </a>
        <a href="/hello" onClick={() => console.log("hello")}>
          2
        </a>
      </RandomComp>
    </div>
  );
}
