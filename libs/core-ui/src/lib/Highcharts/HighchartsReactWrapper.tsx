// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import React from "react";

HighchartsMore(Highcharts); // init module
export function HighchartsReactWrapper(): React.ReactElement {
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);

  const options = {
    chart: {
      zoomType: "xy"
    },
    series: [
      {
        data: [
          49.9, 71.5, 106.4, 129.2, 144, 176, 135.6, 148.5, 216.4, 194.1, 95.6,
          54.4
        ],
        name: "Rainfall",
        tooltip: {
          pointFormat:
            '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} mm</b> '
        },
        type: "column",
        yAxis: 1
      },
      {
        data: [
          [48, 51],
          [68, 73],
          [92, 110],
          [128, 136],
          [140, 150],
          [171, 179],
          [135, 143],
          [142, 149],
          [204, 220],
          [189, 199],
          [95, 110],
          [52, 56]
        ],
        name: "Rainfall error",
        tooltip: {
          pointFormat: "(error range: {point.low}-{point.high} mm)<br/>"
        },
        type: "errorbar",
        yAxis: 1
      },
      {
        data: [
          7, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6
        ],
        name: "Temperature",
        tooltip: {
          pointFormat:
            '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> '
        },
        type: "spline"
      },
      {
        data: [
          [6, 8],
          [5.9, 7.6],
          [9.4, 10.4],
          [14.1, 15.9],
          [18, 20.1],
          [21, 24],
          [23.2, 25.3],
          [26.1, 27.8],
          [23.2, 23.9],
          [18, 21.1],
          [12.9, 14],
          [7.6, 10]
        ],
        name: "Temperature error",
        tooltip: {
          pointFormat: "(error range: {point.low}-{point.high}°C)<br/>"
        },
        type: "errorbar"
      }
    ],
    title: {
      text: "Temperature vs Rainfall"
    },
    tooltip: {
      shared: true
    },

    xAxis: [
      {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      }
    ],

    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value} °C",
          style: {
            color: "red"
          }
        },
        title: {
          style: {
            color: "red"
          },
          text: "Temperature"
        }
      },
      {
        labels: {
          format: "{value} mm",
          style: {
            color: "blue"
          }
        },

        opposite: true,
        // Secondary yAxis
        title: {
          style: {
            color: "blue"
          },
          text: "Rainfall"
        }
      }
    ]
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      //   {...props}
    />
  );
}
