


 export const customerListSort = [
  {
    label:"Sort By Order",
    value:"sortOrder",
  
    children: [
      {
        value: 'asc',
        label: 'Low To High',
      
      },
      {
        value: 'desc',
        label: 'High To Low',
      }
      
    ],
  },

   {
    label:"Sort By",
    value:"sortBy",
    children: [
      {
        value: 'createdAt',
        label: 'Date',
      
      },
      {
        value: 'birthday',
        label: 'Birthday',
      
      },
      {
        value: 'lastPurchaseDate',
        label: 'Last Purchase Date',
      
      },
      {
        value: 'totalOrders',
        label: 'Total Orders',
      
      },
      {
        value: 'totalSpends',
        label: 'Total Spends',
      
      }
    ],
  }
  
];
