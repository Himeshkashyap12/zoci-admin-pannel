

  export const totalOrderSort = [
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
      
      }
      
    ],
  },
 
 
];

export const totalOrderFilter=[
     {
    label:"Source",
    value:"source",
    children: [
      {
        value: 'Online',
        label: 'Online',
      
      },
      {
        value: 'Exhibition',
        label: 'Exhibition',
      },
      {
        value: 'Event',
        label: 'Event',
      }
    ],
  }


 
]
