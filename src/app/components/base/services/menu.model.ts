export interface Menu {
  children_count: number;
  depth: number;
  id: number;
  lft: number;
  menu_icon: string;
  menu_label: string;
  menu_url: string;
  name: string;
  page: number;
  parent_id: number;
  rgt: number;
  title: string;
  view_id: number;
  submenu?: Menu[];
}
