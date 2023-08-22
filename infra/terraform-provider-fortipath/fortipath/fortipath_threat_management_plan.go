// fortipath_threat_management_plan Module
// Description: Module for creating and managing threat management plans.

package fortipath

import (
	"strings"
)

// ActionItem represents a specific action or countermeasure to address a threat.
type ActionItem struct {
    Description string
    ResponsibleParty string
    Deadline string
}

// ThreatManagementPlan represents the structure of a threat management plan.
type ThreatManagementPlan struct {
    PlanName string
    Date     string
    Threats  []string
    Actions  []ActionItem
}

// NewActionItem initializes a new action item.
func NewActionItem(description, responsibleParty, deadline string) *ActionItem {
    return &ActionItem{
        Description:     description,
        ResponsibleParty: responsibleParty,
        Deadline:        deadline,
    }
}

// NewThreatManagementPlan initializes a new threat management plan.
func NewThreatManagementPlan(planName, date string) *ThreatManagementPlan {
    return &ThreatManagementPlan{
        PlanName: planName,
        Date:     date,
    }
}

// AddThreat adds a threat to the threat management plan.
func (tmp *ThreatManagementPlan) AddThreat(threat string) {
    tmp.Threats = append(tmp.Threats, threat)
}

// AddActionItem adds an action item to the threat management plan.
func (tmp *ThreatManagementPlan) AddActionItem(action ActionItem) {
    tmp.Actions = append(tmp.Actions, action)
}

// GeneratePlanReport generates a report based on the threat management plan.
func (tmp *ThreatManagementPlan) GeneratePlanReport() string {
    report := "Threat Management Plan: " + tmp.PlanName + "\n"
    report += "Date: " + tmp.Date + "\n\n"
    report += "Identified Threats:\n"
    for _, threat := range tmp.Threats {
        report += "- " + threat + "\n"
    }
    report += "\nAction Items:\n"
    for _, action := range tmp.Actions {
        report += "- Description: " + action.Description + "\n"
        report += "  Responsible Party: " + action.ResponsibleParty + "\n"
        report += "  Deadline: " + action.Deadline + "\n\n"
    }
    return report
}
