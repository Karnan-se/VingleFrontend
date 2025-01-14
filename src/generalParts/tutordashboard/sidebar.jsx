

import { NavLink } from "react-router-dom";
import { Card } from "@nextui-org/card";
import { LayoutDashboard, User, BookOpen, DollarSign, MessageSquare } from 'lucide-react';

// Navigation items
const navItems = [
  {
    name: 'Dashboard',
    href: '/tutor',
    icon: LayoutDashboard
  },
  {
    name: 'Profile',
    href: '/tutor/profile',
    icon: User
  },
  {
    name: 'photo',
    href: '/tutor/photo',
    icon: User
  },

  {
    name: 'Courses',
    href: '/tutor/courses',
    icon: BookOpen
  },
  {
    name: 'Revenue',
    href: '/tutor/revenue',
    icon: DollarSign
  },
  {
    name: 'Chat and Video call',
    href: '/tutor/chat',
    icon: MessageSquare
  }
];


export default function Sidebar() {
  return (
    <Card className="h-full  w-72 rounded-none border-r border-divider ">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/tutor"} 
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive 
                  ? 'bg-gray-100' 
                  : 'bg-primary text-primary-foreground'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </Card>
  );
}
