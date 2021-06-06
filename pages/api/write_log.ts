// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { appendFile } from "fs";
import os from "os";

interface LogTemplate {
  name: String;
  props: String;
  origin: String;
  firstInter: number;
  duration: number;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const writeFile = "comp.log";
  console.log(body);
  if (!body.child) {
    console.log("No Child");
    res.status(400).send("No Child");
  } else {
    const name = body.child.id ? body.child.id : body.child.tagName;
    const props = body.child.props ? JSON.stringify(body.child.props) : "";
    const message: LogTemplate = {
      name: name,
      props: props,
      origin: body.origin,
      firstInter: body.timeToFirstInter,
      duration: body.duration,
    };
    appendFile(writeFile, JSON.stringify(message) + os.EOL, (err) => {
      if (err) res.status(400).send("Fail");
      console.log(`Writing to ${writeFile}`);
    });
    res.status(200).send("Success");
  }
};
