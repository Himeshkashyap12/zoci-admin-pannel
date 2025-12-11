

  export const offlineSaleSort = [
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
    value:"sortField",
    children: [
      {
        value: 'quantity',
        label: 'Quantity',
      
      },
      {
        value: 'price',
        label: 'Price',
      
      },
      {
        value: 'createdAt',
        label: 'Date',
      
      },
      {
        value: 'totalSales',
        label: 'TotalSales',
      
      }
     
      
    ],
  
  
      
    
  }
  
];


export const offlineSalesFilter=[
     {
    label:"Category",
    value:"category",
    children: [
      {
        value: 'Rings',
        label: 'Rings',
      
      },
      {
        value: 'Necklace',
        label: 'Necklace',
      }
      
    ],
  }

 
]
