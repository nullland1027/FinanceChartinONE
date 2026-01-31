import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Globe, Coins } from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: '首页' },
    { to: '/stocks', icon: Globe, label: '全球股市' },
    { to: '/commodities', icon: Coins, label: '大宗商品' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
          <span className="text-indigo-500">Finance</span>ONE
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2026 FinanceGraph
      </div>
    </aside>
  );
};
