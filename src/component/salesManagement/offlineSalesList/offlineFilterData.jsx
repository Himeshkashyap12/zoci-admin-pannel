

  export const offlineSaleSort = [
  {
    label:"Sort By Order",
    value:"sortOrder",
  
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
        value: 'Necklaces',
        label: 'Necklaces',
      
      },
      {
        value: 'Bracelets',
        label: 'Bracelets',
      
      },
      {
        value: 'Earrings',
        label: 'Earrings',
      
      },
      {
        value: '',
        label: 'Others',
      
      }
      
    ],
  }

 
]
