import { useTheme } from '../context/ThemeContext';
import type { ThemeName } from '../context/ThemeContext';
import { Check } from 'lucide-react';

export const Settings = () => {
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeName; label: string; color: string }[] = [
    { id: 'purple', label: '默认紫', color: 'bg-indigo-600' },
    { id: 'orange', label: '活力橙', color: 'bg-orange-500' },
    { id: 'red', label: '热情红', color: 'bg-red-600' },
    { id: 'black', label: '极简黑', color: 'bg-gray-900' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">设置</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                  ${theme === t.id ? 'border-indigo-500 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className={`w-8 h-8 rounded-full ${t.color} shadow-sm`}></div>
                <span className="ml-3 font-medium text-gray-700">{t.label}</span>
                
                {theme === t.id && (
                  <div className="absolute top-2 right-2 text-indigo-500">
                    <Check size={16} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
