import { X, BookOpen, Scale, HelpCircle } from 'lucide-react';
import type { MarketInfo } from '../data/marketEncyclopedia';
import { useTheme } from '../context/ThemeContext';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: MarketInfo;
  symbol: string;
}

export const InfoModal = ({ isOpen, onClose, info, symbol }: InfoModalProps) => {
  const { classes } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className={`sticky top-0 z-10 flex justify-between items-start p-6 border-b border-gray-100 bg-white/95 backdrop-blur-sm`}>
          <div>
             <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500`}>
                    {symbol}
                </span>
                <span className={`flex items-center gap-1 text-xs font-medium ${classes.text}`}>
                    <BookOpen size={14} />
                    百科
                </span>
             </div>
             <h2 className="text-2xl font-bold text-gray-800">{info.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
            {/* Description */}
            <section>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {info.description}
                </p>
            </section>

            {/* Specs Grid */}
            <section className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Scale size={16} className={classes.text} />
                    合约规格 / 基础信息
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">交易所 / 市场</span>
                        <div className="text-sm font-medium text-gray-800">{info.specs.exchange}</div>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">标的物</span>
                        <div className="text-sm font-medium text-gray-800">{info.specs.underlying}</div>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">合约规模 / 单位</span>
                        <div className="text-sm font-medium text-gray-800">{info.specs.contractSize}</div>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">报价单位</span>
                        <div className="text-sm font-medium text-gray-800">{info.specs.quoteUnit}</div>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">最小变动价位</span>
                        <div className="text-sm font-medium text-gray-800">{info.specs.minFluctuation}</div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            {info.faq.length > 0 && (
                <section>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <HelpCircle size={16} className={classes.text} />
                        常见问题
                    </h3>
                    <div className="space-y-4">
                        {info.faq.map((item, idx) => (
                            <div key={idx} className="border-l-2 pl-4 py-1 hover:bg-gray-50 transition-colors rounded-r-lg border-gray-200 hover:border-indigo-400">
                                <h4 className="text-sm font-semibold text-gray-800 mb-1">{item.question}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400">
            * 仅供科普参考，不构成投资建议
        </div>
      </div>
    </div>
  );
};
