 export const makeToOrderSort=[
  {
    label:"Sort Order",
    value:"sortOrder",
    children: [
      {
        value: 'asc',
        label: 'Ascending',
      
      },
      {
        value: 'desc',
        label: 'Descending',
      
      },
    ],
  },
  {
    label:"Sort By",
    value:"sortBy",
    children: [
      {
        value: 'orderDate',
        label: 'Order Date',
      
      }
     
    ]
  },
  ];
 
export const makeToOrderFilter=[
  {
    label:"Status",
    value:"status",
    children: [
      {
        value: 'Processing',
        label: 'Processing',
      
      },
      {
        value: 'Ordered',
        label: 'Ordered',
      
      },
      {
        value: 'WIP Delivery',
        label: 'WIP Delivery',
      
      },
       {
        value: 'Returned',
        label: 'Returned',
      
      },
      {
        value: 'Delivered',
        label: 'Delivered',
      
      },
      {
        value: 'Exchanged',
        label: 'Exchanged',
      
      },
      {
        value: 'Cancelled',
        label: 'Cancelled',
      
      }
    ],
  }
  
  ]
 
  
