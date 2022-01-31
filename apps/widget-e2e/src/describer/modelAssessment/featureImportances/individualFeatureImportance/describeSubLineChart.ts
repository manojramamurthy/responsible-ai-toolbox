// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { localization } from "@responsible-ai/localization";

import { selectRow } from "../../../../util/Table";
import { Locators } from "../../Constants";
import { IModelAssessmentData } from "../../IModelAssessmentData";

export function describeSubLineChart(dataShape: IModelAssessmentData): void {
  describe("Sub line chart", () => {
    before(() => {
      selectRow("Index", "4");

      cy.get(Locators.ICEPlot).click();
    });
    after(() => {
      selectRow("Index", "4");
    });
    it("should have more than one point", () => {
      cy.get(Locators.ICENoOfPoints).its("length").should("be.gte", 1);
    });

    it("should update x-axis value when 'Feature' dropdown is changed", () => {
      cy.get(Locators.ICEFeatureDropdown).click();
      cy.get(".ms-Callout")
        .should("be.visible")
        .contains(
          dataShape.featureImportanceData?.newFeatureDropdownValue || ""
        )
        .scrollIntoView()
        .focus()
        .click({ force: true });
      cy.get(Locators.ICEXAxisNewValue).should(
        "contain",
        dataShape.featureImportanceData?.newFeatureDropdownValue || ""
      );
    });

    it("Should have tooltip 'How to read this chart'", () => {
      cy.get(Locators.ICEToolTipButton).should("exist");
      cy.get(Locators.ICEToolTipButton)
        .trigger("mouseover")
        .then(($btn) => {
          $btn.trigger("click");
        });
      cy.get(Locators.ICECalloutTitle)
        .scrollIntoView()
        .should("exist")
        .should("contain", localization.Interpret.WhatIfTab.icePlot);
      cy.get(Locators.ICECalloutBody)
        .scrollIntoView()
        .should("exist")
        .should("contain", localization.Interpret.WhatIfTab.icePlotHelperText);
    });
  });
}
