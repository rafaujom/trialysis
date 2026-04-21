export type Outcome = "improved" | "no_change" | "worsened";

export type TrialRow = {
  trial_id: string;
  drug_name: string;
  patient_age: number;
  patient_sex: "M" | "F";
  dosage_mg: number;
  outcome: Outcome;
  start_date: string;
  end_date: string;
};