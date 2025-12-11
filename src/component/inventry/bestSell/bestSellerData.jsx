 export const bestSellerSort=[
  {
    label:"Sort Order",
    value:"sortOrder",
    children: [
      {
        value: 'asc',
        label: 'Low To High',
      
      },
      {
        value: 'desc',
        label: 'High To Low',
      
      },
    ],
  },
  {
    label:"Sort By",
    value:"sortBy",
    children: [
      {
        value: 'sold',
        label: 'Sold',
      
      },
      {
        value: 'price',
        label: 'Price',
      
      },
      {
        value: 'title',
        label: 'Title',
      
      },
      {
        value: 'sku',
        label: 'SKU',
      
      },
      {
        value: 'category',
        label: 'Category',
      
      }
    ],
  },
  ];
 
export const bestSellerFilter=[
  {
    label:"Category",
    value:"category",
    children: [
      {
        value: 'Ring',
        label: 'Ring',
      
      },
      {
        value: 'Necklace',
        label: 'Necklace',
      
      },
      {
        value: 'Pendant',
        label: 'Pendant',
      
      }
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
      
      }
    ],
  }
  ]
 
  
