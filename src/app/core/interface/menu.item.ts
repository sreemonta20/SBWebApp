export interface MenuItem {
    id: string;
    name: string;
    isHeader: boolean;
    class: string;
    routeLink: string;
    routeLinkClass: string;
    icon: string;
    remark: string;
    parentId: string;
    dropdownIcon: string;
    children?: MenuItem[];
  }