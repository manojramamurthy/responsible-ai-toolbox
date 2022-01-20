// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";

import { Utils } from "../CommonUtils";
import { IChartProps } from "../Interfaces/IChartProps";

const highlighted = {
  backgroundColor: "#5A53FF",
  color: "white",
  fontFamily: "Segoe UI",
  fontSize: "1.5em",
  fontweight: "400px"
} as React.CSSProperties;

const boldunderline = {
  color: "#5A53FF",
  fontFamily: "Segoe UI",
  fontSize: "1.5em",
  fontWeight: "bold",
  textDecorationLine: "underline"
} as React.CSSProperties;

const normal = {
  fontFamily: "Segoe UI",
  fontSize: "1.5em"
} as React.CSSProperties;

export class TextHighlighting extends React.PureComponent<IChartProps> {
  /*
   * presents the document in an accessible manner with text highlighting
   */
  public render(): React.ReactNode[] {
    const text = this.props.text;
    const importances = this.props.localExplanations;
    const k = this.props.topK;
    const sortedList = Utils.sortedTopK(importances, k!, this.props.radio!);
    const val = text.map((word, wordIndex) => {
      let styleType = normal;
      const score = importances[wordIndex];
      if (sortedList.includes(wordIndex)) {
        if (score > 0) {
          styleType = highlighted;
        } else if (score < 0) {
          styleType = boldunderline;
        } else {
          styleType = normal;
        }
      }
      return (
        <span key={wordIndex} style={styleType} title={score.toString()}>
          {word}
        </span>
      );
    });
    return val.map((word, wordIndex) => {
      return <span key={wordIndex}>{word} </span>;
    });
  }
}
