


 export const birthdayCrmSort = [
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
        value: 'birthday',
        label: 'Birthday',
      
      },
      {
        value: 'anniversary',
        label: 'Anniversary',
      
      },
      {
        value: 'date',
        label: 'Date',
      
      }
      
    ],
  }
  
];
