

  export const birthdaySort = [
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
        value: 'firstname',
        label: 'First Name',
      
      },
      {
        value: 'lastname',
        label: 'Last Name',
      
      },
      {
        value: 'createdAt',
        label: 'Date',
      
      },
      {
        value: 'anniversary.date',
        label: 'Anniversary Date',
      
      }
      
    ] 
  }
  
];


