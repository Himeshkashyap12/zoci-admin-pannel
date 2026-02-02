

  export const totalOrderSort = [
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
        value: 'online',
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
