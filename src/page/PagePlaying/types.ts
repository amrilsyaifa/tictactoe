import { SelectedDataProps } from "../../types";

export interface PagePlayingProps {
  data: number[];
  selectedData: SelectedDataProps;
  onSelectCard: (dt: number, status: any) => void;
}
