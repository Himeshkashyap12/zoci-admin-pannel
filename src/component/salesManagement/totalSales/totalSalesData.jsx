

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
 
 
];
export const totalSaleFilter=[
     {
    label:"Type",
    value:"type",
    children: [
      {
        value: 'Online',
        label: 'Online',
      
      },
      {
        value: 'Offline',
        label: 'Offline',
      },
      {
        value: 'MakeToOrder',
        label: 'MakeToOrder',
      }
    ],
  }


 
]
