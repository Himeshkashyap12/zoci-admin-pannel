 export const makeToOnlineOrderSort=[
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
        value: 'date',
        label: 'Date',
      
      },
      {
        value: 'price',
        label: 'Price',
      
      },
      {
        value: 'name',
        label: 'Name',
      
      },
     
    ]
  },
  ];
 
export const makeToOnlineOrderFilter=[
  {
    label:"Status",
    value:"status",
    children: [
      {
        value: 'Pending',
        label: 'Pending',
      
      },
      {
        value: 'Ordered',
        label: 'Ordered',
      
      },
      {
        value: 'Confirmed',
        label: 'Confirmed',
      
      },
       {
        value: 'Shipped',
        label: 'Shipped',
      
      },
      {
        value: 'Delivered',
        label: 'Delivered',
      
      }
    ],
  }
  
  ]
 
  
