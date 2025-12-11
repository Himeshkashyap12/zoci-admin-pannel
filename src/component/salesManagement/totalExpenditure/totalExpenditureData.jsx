

  export const totalSaleSort = [
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
  },
   {
    label:"Sub Category",
    value:"subCategory",
    children: [
      {
        value: 'Stall',
        label: 'Stall',
      
      }
    ],
  }

 
]
