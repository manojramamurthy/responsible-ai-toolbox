// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IStyle,
  mergeStyleSets,
  IProcessedStyleSet
} from "office-ui-fabric-react";

export interface ITextExplanationDashboardStyles {
  explainerDashboard: IStyle;
  sliderWithText: IStyle;
  slider: IStyle;
  textBelowSlider: IStyle;
  chartWithRadio: IStyle;
  barChart: IStyle;
  chartRight: IStyle;
  labelPrediction: IStyle;
  radio: IStyle;
  chartLegend: IStyle;
  highlightWithLegend: IStyle;
  textHighlighting: IStyle;
  textRight: IStyle;
  legend: IStyle;
  posFeatureImportance: IStyle;
  negFeatureImportance: IStyle;
}

export const textExplanationDashboardStyles: () => IProcessedStyleSet<ITextExplanationDashboardStyles> =
  () => {
    return mergeStyleSets<ITextExplanationDashboardStyles>({
      barChart: {
        marginLeft: "2%",
        maxHeight: "450px",
        minHeight: "300px",
        minWidth: "400px"
      },
      chartLegend: {
        color: "#666666",
        fontSize: "11px",
        marginTop: "10px"
      },
      chartRight: {
        flexDirection: "column",
        marginLeft: "3%",
        marginRight: "3%",
        maxWidth: "230px",
        minWidth: "230px"
      },
      chartWithRadio: {
        justifyContent: "space-between"
      },
      explainerDashboard: {
        height: "100%",
        width: "100%"
      },
      highlightWithLegend: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row"
      },
      labelPrediction: {
        color: "black",
        fontSize: "24px",
        fontWeight: "500",
        marginBottom: "20px"
      },
      legend: {
        color: "#b7b7b7",
        marginBottom: "17px"
      },
      negFeatureImportance: {
        color: "#5A53FF",
        fontWeight: "bold",
        marginRight: "3px",
        marginTop: "5px",
        padding: "2px",
        textDecorationLine: "underline"
      },
      posFeatureImportance: {
        backgroundColor: "#5A53FF",
        color: "white",
        fontWeight: "bold",
        marginBottom: "5px",
        marginRight: "3px",
        padding: "2px"
      },
      radio: {
        fontSize: "12px",
        fontWeight: "lighter"
      },
      slider: {
        marginTop: "3%"
      },
      sliderWithText: {
        marginLeft: "3%",
        marginRight: "3%"
      },
      textBelowSlider: {
        fontSize: "20px"
      },
      textHighlighting: {
        borderColor: "#CCCCCC",
        borderRadius: "1px",
        borderStyle: "groove",
        fontWeight: "lighter",
        lineHeight: "32px",
        marginLeft: "3%",
        marginTop: "2%",
        maxHeight: "200px",
        minWidth: "400px",
        padding: "25px"
      },
      textRight: {
        flexDirection: "column",
        fontSize: "11px",
        margin: "3%",
        maxWidth: "230px",
        minWidth: "230px"
      }
    });
  };
