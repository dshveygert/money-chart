export interface BarChart {
  data: ReadonlyArray<readonly number[]>;
  labelX: ReadonlyArray<string | null>;
  labelY: readonly string[];
  color: string;
  max: number;
  min: number;
}
