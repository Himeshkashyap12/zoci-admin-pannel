  
 export const sortOption=[
    {label:"Price-High to Low",value:"priceDesc"},
    {label:"Price-Low to High",value:"priceAsc"},
     {label:"Rating",value:"rating"},
    {label:"Newest",value:"newest"},
     {label:"Oldest",value:"oldest"},
  ]
 
  
  export const filterOptions = [
  {
    label:"Availability",
    value:"availability",
  
    children: [
      {
        value: 'In Stock',
        label: 'In Stock',
      
      },
      {
        value: 'Out Of Stock',
        label: 'Out Of Stock',
      
      },
    ],
  },
   {
    label:"Metal Type",
    value:"metalType",
    children: [
      {
        value: 'Silver',
        label: 'Silver',
      
      },
      {
        value: 'Gold',
        label: 'Gold',
      
      },
      {
        value: 'Platinum',
        label: 'Platinum',
      
      },
    ],
  },
  {
    label:"Stone Type",
    value:"stoneType",
    children: [
      {
        value: 'Natural Diamond',
        label: 'Natural Diamond',
      
      },
      {
        value: 'Lab Grown Diamond',
        label: 'Lab Grown Diamond',
      
      },
      
    ],
  },
  {
    label:"Gender",
    value:"gender",
    children: [
      {
        value: 'Men',
        label: 'Men',
      
      },
      {
        value: 'Women',
        label: 'Women',
      
      },
      
    ],
  }
  
];