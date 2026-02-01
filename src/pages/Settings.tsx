import { useTheme } from '../context/ThemeContext';
import type { ThemeName } from '../context/ThemeContext';
import { useMarketData } from '../context/MarketContext';
import { Check, Clock } from 'lucide-react';

export const Settings = () => {
  const { theme, setTheme, classes } = useTheme();
  const { refreshInterval, setRefreshInterval } = useMarketData();

  const themes: { id: ThemeName; label: string; color: string }[] = [
    { id: 'purple', label: '默认紫', color: 'bg-indigo-600' },
    { id: 'orange', label: '活力橙', color: 'bg-orange-500' },
    { id: 'red', label: '热情红', color: 'bg-red-600' },
    { id: 'black', label: '极简黑', color: 'bg-gray-900' },
  ];

  const intervals = [
    { value: 1000, label: '1 秒' },
    { value: 2000, label: '2 秒' },
    { value: 3000, label: '3 秒' },
    { value: 5000, label: '5 秒' },
    { value: 10000, label: '10 秒' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">设置</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">主题外观</h2>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">选择您喜欢的系统主题色：</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  relative flex items-center justify-center p-4 rounded-lg border-2 transition-all
                  ${theme === t.id ? `${classes.border} bg-gray-50` : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className={`w-8 h-8 rounded-full ${t.color} shadow-sm`}></div>
                <span className="ml-3 font-medium text-gray-700">{t.label}</span>
                
                {theme === t.id && (
                  <div className={`absolute top-2 right-2 ${classes.text}`}>
                    <Check size={16} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-gray-400" />
            <span>数据更新频率</span>
        </h2>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">设置前端请求后端 API 数据的间隔时间：</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {intervals.map((item) => (
              <button
                key={item.value}
                onClick={() => setRefreshInterval(item.value)}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                  ${refreshInterval === item.value ? `${classes.border} ${classes.primaryBg} text-white` : 'border-gray-200 hover:border-gray-300 text-gray-600'}
                `}
              >
                <span className="font-bold text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
