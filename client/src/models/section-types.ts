import { SectionType } from "./section-model";

export interface SectionActions {
  sections: SectionType[];
  error?: string;
}
