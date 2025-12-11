

  export const returningSort = [
  {
    label:"Sort By",
    value:"sortDir",
  
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
    label:"Sort By Order",
    value:"sortBy",
  
    children: [
      {
        value: 'lastPurchaseDate',
        label: 'Last PurchaseDate',
      
      },
      {
        value: 'totalOrders',
        label: 'Total Orders',
      },
      {
        value: 'totalSpends',
        label: 'Total Spends',
      }
      
    ],
  },
 
 
];
export const returningFilter=[
     {
    label:"Source",
    value:"source",
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
  }


 
]
