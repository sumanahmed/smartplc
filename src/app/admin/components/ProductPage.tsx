import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface TableData {
  id: number;
  name: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  status: 'In Stock' | 'Out of Stock' | 'Discontinued';
}

const DataTablePage = () => {
  // Sample data
  const data: TableData[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      buyingPrice: 45.00,
      sellingPrice: 79.99,
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Coffee Maker',
      category: 'Appliances',
      buyingPrice: 85.00,
      sellingPrice: 149.99,
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Running Shoes',
      category: 'Sports',
      buyingPrice: 60.00,
      sellingPrice: 99.99,
      status: 'Out of Stock'
    },
    {
      id: 4,
      name: 'Laptop Stand',
      category: 'Accessories',
      buyingPrice: 25.00,
      sellingPrice: 39.99,
      status: 'In Stock'
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      buyingPrice: 35.00,
      sellingPrice: 59.99,
      status: 'Discontinued'
    },
    {
      id: 6,
      name: 'Desk Lamp',
      category: 'Furniture',
      buyingPrice: 30.00,
      sellingPrice: 49.99,
      status: 'In Stock'
    },
    {
      id: 7,
      name: 'Water Bottle',
      category: 'Sports',
      buyingPrice: 12.00,
      sellingPrice: 19.99,
      status: 'In Stock'
    },
    {
      id: 8,
      name: 'Phone Case',
      category: 'Accessories',
      buyingPrice: 8.00,
      sellingPrice: 14.99,
      status: 'Out of Stock'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'In Stock': 'bg-green-100 text-green-800',
      'Out of Stock': 'bg-red-100 text-red-800',
      'Discontinued': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Product List</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Plus size={20} className="mr-2" />
                Add New
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buying Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Selling Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.buyingPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.sellingPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataTablePage;
