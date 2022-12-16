export const data = {
  result: 'SUCCESS',
  tasks: [
    {
      id: 103,
      complete: true,
      priority: 'high',
      dueDate: '2013-11-27',
      username: 'Scott',
      title: 'Do something early',
      created: '7/22/2013',
    },
    {
      id: 104,
      complete: false,
      priority: 'high',
      dueDate: '2013-11-29',
      username: 'Scott',
      title: 'Do something',
      created: '9/22/2013',
    },
    {
      id: 105,
      complete: false,
      priority: 'medium',
      dueDate: '2013-11-22',
      username: 'Lena',
      title: 'Do something else',
      created: '9/22/2013',
    },
    {
      id: 107,
      complete: true,
      priority: 'high',
      dueDate: '2013-11-22',
      username: 'Mike',
      title: 'Fix the foo',
      created: '9/22/2013',
    },
    {
      id: 108,
      complete: false,
      priority: 'low',
      dueDate: '2013-11-15',
      username: 'Punam',
      title: 'Adjust the bar',
      created: '9/25/2013',
    },
    {
      id: 110,
      complete: false,
      priority: 'medium',
      dueDate: '2013-11-15',
      username: 'Scott',
      title: 'Rename everything',
      created: '10/2/2013',
    },
    {
      id: 112,
      complete: true,
      priority: 'high',
      dueDate: '2013-11-27',
      username: 'Lena',
      title: 'Alter all quuxes',
      created: '10/5/2013',
    },
  ],
};

export type Data = typeof data;
export type Item = Data['tasks'][number];
export type FilterItem = Omit<Item, 'complete' | 'created' | 'username'>
