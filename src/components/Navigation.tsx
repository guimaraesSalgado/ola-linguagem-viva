
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Início',
      icon: Home
    },
    {
      path: '/planner',
      label: 'Meus Treinos',
      icon: Calendar
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 px-4 py-2 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive 
                    ? "text-orange-400 bg-orange-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
