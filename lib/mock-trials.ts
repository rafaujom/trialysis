import type { TrialRow } from "@/types/trial";

export const mockTrials: TrialRow[] = [
  { trial_id: "T001", drug_name: "DrugA", patient_age: 45, patient_sex: "F", dosage_mg: 100, outcome: "improved",  start_date: "2023-01-10", end_date: "2023-04-10" },
  { trial_id: "T002", drug_name: "DrugB", patient_age: 52, patient_sex: "M", dosage_mg: 200, outcome: "no_change", start_date: "2023-02-01", end_date: "2023-05-01" },
  { trial_id: "T003", drug_name: "DrugA", patient_age: 38, patient_sex: "M", dosage_mg: 150, outcome: "worsened",  start_date: "2023-03-15", end_date: "2023-06-15" },
  // add more rows as needed
];