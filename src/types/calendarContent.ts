// API response shapes consumed by the day detail modal

export type ScriptureReading = {
  label?: string;
  reference?: string;
  url?: string;
};

export type DayContentItem = {
  label?: string;
  type?: string;
  url?: string;
  access?: string;
};

export type DayContentSection = {
  title?: string;
  displayStyle?: "default" | "notice";
  items?: DayContentItem[];
};

export type DayContent = {
  title?: string;
  notes?: string;
  scriptureReadings?: ScriptureReading[];
  sections?: DayContentSection[];
};