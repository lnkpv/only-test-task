export interface EventItem {
  title: string;
  yearFrom: string;
  yearTo: string;
  data: EventItemData[];
}

export interface EventItemData {
  year: number;
  description: string;
}
