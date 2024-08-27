import React from "react";
import {
  ChartBarSquareIcon,
  ChartPieIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";

const Sidebar = ({ onScroll, refs }) => {
  return (
    <div className="w-20 bg-[#151414] min-h-screen text-white border-r border-gray-800 hidden lg:block">
      <ul className="space-y-9 grid place-items-center mt-10">
        <li onClick={() => onScroll(refs.barChartRef)} className="cursor-pointer grid mx-auto place-items-center">
          <ChartBarSquareIcon className="h-6 w-6 text-sky-400" />
          <label className="text-[10px] text-gray-400 text-center hidden lg:block py-3">Bars</label>
        </li>
        <li onClick={() => onScroll(refs.donutChartRef)} className="cursor-pointer grid mx-auto place-items-center">
          <ChartPieIcon className="h-6 w-6 text-yellow-300" />
          <label className="text-[10px] text-gray-400 text-center hidden lg:block py-3">Doughnut</label>
        </li>
        <li onClick={() => onScroll(refs.tabDataRef)} className="cursor-pointer grid mx-auto place-items-center">
          <TableCellsIcon className="h-6 w-6 text-purple-400" />
          <label className="text-[10px] text-gray-400 text-center hidden lg:block py-3">Tabular</label>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;