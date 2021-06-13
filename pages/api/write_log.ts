// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { appendFile } from "fs";
import os from "os";

interface LogTemplate {
  props: string;
  origin: string;
  firstInter: number;
  duration: number;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const writeFile = "comp.log";
  console.log(body);
  const message: LogTemplate = {
    props: body.props,
    origin: body.origin,
    firstInter: body.timeToFirstInter,
    duration: body.duration,
  };
  for (const key of Object.keys(message)) {
    if (!message[key]) {
      console.log(message);
      res.status(400).send("Invalid Params");
      return;
    }
  }
  appendFile(writeFile, JSON.stringify(message) + os.EOL, (err) => {
    if (err) res.status(400).send("Fail");
    console.log(`Writing to ${writeFile}`);
  });
  res.status(200).send("Success");
};
