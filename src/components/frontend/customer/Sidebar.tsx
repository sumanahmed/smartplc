// import React from 'react'
// import { customerPanelTabs } from '@/data/customerTabs' 

// const Sidebar = () => {
//   return (
//    <>
//     <div className="lg:w-64">
//           <nav className="bg-white rounded-lg shadow-md p-4">
//             <ul className="space-y-2">
//                 { customerPanelTabs?.map((tab) => (
//                 <li key={tab.id}>
//                   <button
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                       activeTab === tab.id
//                         ? 'bg-blue-100 text-blue-600'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <tab.icon className="h-5 w-5" />
//                     <span>{tab.label}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//     </div>
//    </>
//   )
// }

// export default Sidebar