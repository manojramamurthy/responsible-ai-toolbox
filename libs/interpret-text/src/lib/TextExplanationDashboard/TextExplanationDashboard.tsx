// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { localization } from "@responsible-ai/localization";
import {
  ChoiceGroup,
  IChoiceGroupOption,
  Slider
} from "office-ui-fabric-react";
import React from "react";

import { RadioKeys, Utils } from "./CommonUtils";
import { BarChart } from "./Control/BarChart";
import { TextHighlighting } from "./Control/TextHightlighting";
import { ITextExplanationDashboardProps } from "./Interfaces/IExplanationDashboardProps";
import { textExplanationDashboardStyles } from "./TextExplanationDashboard.styles";

export interface ITextExplanationDashboardState {
  /*
   * holds the state of the dashboard
   */
  maxK: number;
  topK: number;
  radio: string;
}

const options: IChoiceGroupOption[] = [
  /*
   * creates the choices for the radio button
   */
  { key: RadioKeys.All, text: localization.InterpretText.Dashboard.allButton },
  { key: RadioKeys.Pos, text: localization.InterpretText.Dashboard.posButton },
  { key: RadioKeys.Neg, text: localization.InterpretText.Dashboard.negButton }
];

export class TextExplanationDashboard extends React.PureComponent<
  ITextExplanationDashboardProps,
  ITextExplanationDashboardState
> {
  constructor(props: ITextExplanationDashboardProps) {
    /*
     * initializes the dashboard with its state
     */
    super(props);
    this.state = {
      maxK: Math.min(
        15,
        Math.ceil(Utils.countNonzeros(this.props.dataSummary.localExplanations))
      ),
      radio: RadioKeys.All,
      topK: Math.ceil(
        Utils.countNonzeros(this.props.dataSummary.localExplanations) / 2
      )
    };
    this.changeRadioButton = this.changeRadioButton.bind(this);
  }

  public render() {
    const classNames = textExplanationDashboardStyles();
    return (
      <div className={classNames.explainerDashboard}>
        <div className={classNames.sliderWithText}>
          <div className={classNames.slider}>
            <Slider
              min={1}
              max={this.state.maxK}
              step={1}
              defaultValue={this.state.topK}
              showValue={false}
              onChange={(value) => this.setTopK(value)}
            />
          </div>
          <div className={classNames.textBelowSlider}>
            {`${this.state.topK.toString()} ${
              localization.InterpretText.Dashboard.importantWords
            }`}
          </div>
        </div>
        <div className={classNames.chartWithRadio}>
          <div className={classNames.barChart}>
            <BarChart
              text={this.props.dataSummary.text}
              localExplanations={this.props.dataSummary.localExplanations}
              topK={this.state.topK}
              radio={this.state.radio}
            />
          </div>
          <div className={classNames.chartRight}>
            <div className={classNames.labelPrediction}>
              {localization.InterpretText.Dashboard.label +
                localization.InterpretText.Dashboard.colon +
                Utils.predictClass(
                  this.props.dataSummary.classNames!,
                  this.props.dataSummary.prediction!
                )}
            </div>
            <div className={classNames.radio}>
              <ChoiceGroup
                defaultSelectedKey="all"
                options={options}
                onChange={this.changeRadioButton}
                required
              />
            </div>
            <div className={classNames.chartLegend}>
              {localization.InterpretText.Dashboard.legendText}
            </div>
          </div>
        </div>
        <div className={classNames.highlightWithLegend}>
          <div className={classNames.textHighlighting}>
            <TextHighlighting
              text={this.props.dataSummary.text}
              localExplanations={this.props.dataSummary.localExplanations}
              topK={this.state.topK}
              radio={this.state.radio}
            />
          </div>
          <div className={classNames.textRight}>
            <div className={classNames.legend}>
              {localization.InterpretText.Dashboard.featureLegend}
            </div>
            <div>
              <span className={classNames.posFeatureImportance}>A</span>
              <span>
                {localization.InterpretText.Dashboard.posFeatureImportance}
              </span>
            </div>
            <div>
              <span className={classNames.negFeatureImportance}>A</span>
              <span>
                {" "}
                {localization.InterpretText.Dashboard.negFeatureImportance}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private setTopK(newNumber: number): void {
    /*
     * changes the state of K
     */
    this.setState({ topK: newNumber });
  }

  private changeRadioButton = (
    _event?: React.FormEvent,
    item?: IChoiceGroupOption
  ): void => {
    /*
     * changes the state of the radio button
     */
    if (item?.key !== undefined) {
      this.setState({ radio: item.key });
    }
  };
}
