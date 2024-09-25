import React from 'react';
import { X, Home, Leaf, Settings, BarChart2, Share, LogOut } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <Leaf size={20} />, label: 'Mis Cultivos' },
    { icon: <Leaf size={20} />, label: 'Nuevo Cultivo' },
    { icon: <Settings size={20} />, label: 'Green House Controle' },
    { icon: <BarChart2 size={20} />, label: 'Statistics' },
    { icon: <Share size={20} />, label: 'Share' },
    { icon: <LogOut size={20} />, label: 'Log out' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-400 mr-3"></div>
            <div>
              <p className="font-semibold">foulen ben foulen</p>
              <p className="text-sm text-gray-600">david@gmail.com</p>
            </div>
          </div>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <a href="#" className="flex items-center text-gray-700 hover:text-green-600">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
