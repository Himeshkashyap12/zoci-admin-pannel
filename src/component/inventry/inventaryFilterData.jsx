  
 export const sortOption=[
    {label:"Price-Descending",value:"priceDesc"},
    {label:"Price-Ascending",value:"priceAsc"},
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
       {label:"Natural Diamond",value:"Natural Diamond"},
    {label:"Lab Grown Diamond",value:"Lab Grown Diamond"},
    {label:"Gemstone",value:"Gemstone"},
    {label:"Synthetic",value:"Synthetic"}
      
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





export const subCategoryOption = {
  Earrings: [
    { label: "Hoop", value: "Hoop" },
    { label: "Studs", value: "Studs" },
    { label: "Fashion", value: "Fashion" },
  ],

  Rings: [
    { label: "Signet", value: "Signet" },
    { label: "Bridal", value: "Bridal" },
    { label: "Bypass", value: "Bypass" },
    { label: "Cocktail", value: "Cocktail" },
    { label: "Band", value: "Band" },
    { label: "Fashion", value: "Fashion" },
  ],

  Pendant: [
    { label: "Mangalsutra", value: "Mangalsutra" },
    { label: "Bar", value: "Bar" },
    { label: "Solitaire", value: "Solitaire" },
    { label: "Fashion", value: "Fashion" },
  ],

  Necklaces: [
    { label: "Lariat", value: "Lariat" },
    { label: "Chains", value: "Chains" },
    { label: "Tennis", value: "Tennis" },
    { label: "Layered", value: "Layered" },
    { label: "Fashion", value: "Fashion" },
  ],

  Bracelets: [
    { label: "Tennis", value: "Tennis" },
    { label: "Bolo", value: "Bolo" },
    { label: "Fashion", value: "Fashion" },
  ]
};



export const metalColor=[
  {label:"Yellow",value:"yellow"},
  {label:"White",value:"White"},
  {label:"Rose",value:"Rose"}
]
