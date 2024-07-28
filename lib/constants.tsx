import { LayoutDashboard, Shapes, Tag, LogIn, LogOut } from "lucide-react";

export const navLinks = [
  {
    url: "/dashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/dashboard/categories",
    icon: <Shapes />,
    label: "Categories",
  },
  {
    url: "/dashboard/products",
    icon: <Tag />,
    label: "Products",
  },
];
