// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { localization } from "@responsible-ai/localization";
import { AccessibleChart, IPlotlyProperty } from "@responsible-ai/mlchartlib";
import React from "react";

import { Utils } from "../CommonUtils";
import { IChartProps } from "../Interfaces/IChartProps";

export class BarChart extends React.PureComponent<IChartProps> {
  /*
   * returns an accessible bar chart from mlchartlib
   */
  public render(): React.ReactNode {
    return (
      <AccessibleChart
        plotlyProps={this.buildPlotlyProps(this.props)}
        theme={undefined}
      />
    );
  }

  private buildPlotlyProps(props: IChartProps): IPlotlyProperty {
    /*
     * builds the bar chart with x and y values as well as the tooltip
     * defines the layout of the chart
     */
    const importances = props.localExplanations;
    const k = props.topK!;
    const sortedList = Utils.sortedTopK(importances, k, this.props.radio!);
    const color = sortedList.map((x) =>
      importances[x] < 0 ? "#FFFFFF" : "#5A53FF"
    );
    const [data, x, y, ylabel, tooltip]: [
      any[],
      number[],
      number[],
      string[],
      string[]
    ] = [[], [], [], [], []];
    sortedList.forEach((idx, i) => {
      let str = "";
      if (idx > 1) {
        str += "...";
      }
      if (idx > 0) {
        str += `${this.props.text[idx - 1]} `;
      }
      str += this.props.text[idx];
      if (idx < this.props.text.length - 1) {
        str += ` ${this.props.text[idx + 1]}`;
      }
      if (idx < this.props.text.length - 2) {
        str += "...";
      }
      y.push(i);
      x.push(importances[idx]);
      ylabel.push(this.props.text[idx]);
      tooltip.push(str);
    });
    data.push({
      hoverinfo: "x+text",
      marker: {
        color,
        line: {
          color: "rgb(0,120,212)",
          width: 1.5
        }
      },
      orientation: "h",
      text: tooltip,
      type: "bar",
      x,
      y
    });
    const chart: IPlotlyProperty = {
      config: {
        displaylogo: false,
        modeBarButtonsToRemove: [
          "toggleSpikelines",
          "hoverClosestCartesian",
          "hoverCompareCartesian",
          "lasso2d",
          "select2d",
          "sendDataToCloud",
          "toImage",
          "resetScale2d",
          "autoScale2d",
          "zoom2d",
          "pan2d",
          "zoomIn2d",
          "zoomOut2d"
        ],
        responsive: true
      },
      data,
      layout: {
        margin: {
          r: 0,
          t: 10
        },
        // paper_bgcolor: "#f2f2f2",
        plot_bgcolor: "#FFFFFF",
        xaxis: {
          automargin: true,
          fixedrange: true,
          range: [
            Math.floor(Math.min(...importances)) - 1,
            Math.ceil(Math.max(...importances)) + 1
          ],
          title: localization.InterpretText.BarChart.featureImportance,
          titlefont: {
            family: "Segoe UI"
          }
        },
        yaxis: {
          automargin: true,
          autotick: false,
          fixedrange: true,
          tickcolor: "#F2F2F2",
          ticklen: 8,
          tickmode: "array",
          ticks: "outside",
          ticktext: ylabel,
          tickvals: y,
          tickwidth: 1,
          titlefont: {
            family: "Segoe UI"
          }
        }
      }
    };
    return chart;
  }
}
