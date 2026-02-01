import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Globe, Coins, Star, Bitcoin, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

export const Sidebar = () => {
  const { classes } = useTheme();
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: '首页' },
    { to: '/core', icon: Star, label: '核心关注' },
    { to: '/stocks', icon: Globe, label: '全球股市' },
    { to: '/commodities', icon: Coins, label: '大宗商品' },
    { to: '/crypto', icon: Bitcoin, label: '数字货币' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
          <span className={classes.text}>Finance</span>ONE
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
                  ? `${classes.primary} text-white`
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
        
        {/* Settings Link */}
        <div className="pt-4 mt-4 border-t border-gray-800">
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                    isActive
                    ? `${classes.primary} text-white`
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )
                }
            >
                <Settings size={20} />
                <span className="font-medium">设置</span>
            </NavLink>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2026 FinanceGraph
      </div>
    </aside>
  );
};
