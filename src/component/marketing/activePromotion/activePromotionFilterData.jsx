

  export const activePromotionSort = [
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
        value: 'usageLimit',
        label: 'Usage Limit',
      
      },
      {
        value: 'usageCount',
        label: 'Usage Count',
      
      },
      {
        value: 'minOrderValue',
        label: 'Min Order Value',
      
      },
      {
        value: 'maxOrderValue',
        label: 'Max Order Value',
      
      },
      {
        value: 'category',
        label: 'Category',
      
      },
      {
        value: 'expiryDate',
        label: 'expiryDate',
      
      },
      {
        value: 'isActive',
        label: 'Is Active',
      
      },
      {
        value: 'createdAt',
        label: 'Date',
      
      },
      
    ],
  
  
      
    
  }
  
];


  export const activePromotionFilter = [
  {
    label:"Category",
    value:"category",
    children: [
      {
        value: 'Custom',
        label: 'Custom',
      
      },
      {
        value: 'Customer',
        label: 'Customer',
      },
       {
        value: 'Birthday',
        label: 'Birthday',
      
      },
      {
        value: 'Anniversary',
        label: 'Anniversary',
      }
      
    ],
  },
   {
    label:"Type",
    value:"type",
    children: [
      {
        value: 'Flat',
        label: 'Flat',
      
      },
      {
        value: 'Percentage',
        label: 'Percentage',
      
      }
      
    ],
  
  
      
    
  },
  {
    label:"Is Active",
    value:"isActive",
    children: [
      {
        value: true,
        label: 'True',
      
      },
      {
        value: false,
        label: 'False',
      
      }
      
    ],
  
  
      
    
  }
  
];