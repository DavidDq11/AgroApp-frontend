import React from 'react';
import { X, Home, Leaf, Settings, BarChart2, Share, LogOut, PlusCircle } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, user }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/dashboard' },
    { icon: <Leaf size={20} />, label: 'Mis Cultivos', href: '/cultivos' },
    { icon: <PlusCircle size={20} />, label: 'Nuevo Cultivo', href: '/nuevo-cultivo' },
    { icon: <Settings size={20} />, label: 'Green House Control', href: '/control' },
    { icon: <BarChart2 size={20} />, label: 'Statistics', href: '/statistics' },
    { icon: <Share size={20} />, label: 'Share', href: '/share' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      )}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex flex-col h-full">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-400 mr-3"></div>
                <div>
                  <p className="font-semibold">{user?.name || 'User Name'}</p>
                  <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <nav>
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index} className="mb-4">
                    <a 
                      href={item.href} 
                      className="flex items-center text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg p-2 transition-colors duration-200"
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <button 
              onClick={() => {/* Implement logout logic */}} 
              className="flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg p-2 w-full transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="ml-3">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;