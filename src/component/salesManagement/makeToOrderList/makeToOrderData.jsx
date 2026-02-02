

  export const makeToOrderSaleSort = [
   {
    label:"Sort By",
    value:"sortBy",
    children: [
      {
        value: 'totalAmount',
        label: 'TotalAmount',
      
      },
      {
        value: 'orderStatus',
        label: 'OrderStatus',
      
      },
      {
        value: 'createdAt',
        label: 'Date',
      
      },
      {
        value: 'customerName',
        label: 'CustomerName',
      
      }
     
      
    ],
  
  
      
    
  },
    {
    label:"Order",
    value:"order",
    children: [
      {
        value: 'asc',
        label: 'Ascending',
      
      },
      {
        value: 'desc',
        label: 'Descending',
      }
      
    ],
  }

  
];


export const makeToOrderSalesFilter=[
     {
    label:"Status",
    value:"status",
    children: [
      {
        value: 'Processing',
        label: 'Processing',
      
      },
      {
        value: 'Pending',
        label: 'Pending',
      },
      {
        value: 'Ordered',
        label: 'Ordered',
      },
      {
        value: 'Completed',
        label: 'Completed',
      }
      
    ],
  }

 
]
