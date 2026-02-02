

  export const totalSaleSort = [
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
        value: 'totalAmount',
        label: 'Total Amount',
      
      },
     
      {
        value: 'createdAt',
        label: 'Date',
      
      }
     
      
    ],
  
  
      
    
  }
  
];

export const totalSaleFilter=[
     {
    label:"Category",
    value:"category",
    children: [
      {
        value: 'Exhibition',
        label: 'Exhibition',
      
      },
      {
        value: 'Event',
        label: 'Event',
      },
      {
        value: 'Online/Operational',
        label: 'Online/Operational',
      }
    ],
  }

 
]
