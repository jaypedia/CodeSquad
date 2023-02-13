const data = [
  {
    id: 1,
    name: 'Yong',
    phone: '010-0000-0000',
    type1: 'sk',
    childnode: [
      {
        id: 11,
        name: 'echo',
        phone: '010-0000-1111',
        type: 'kt',
        childnode: [
          {
            id: 115,
            name: 'hary',
            phone: '211-1111-0000',
            type2: 'sk',
            childnode: [
              {
                id: 1159,
                name: 'pobi',
                phone: '010-444-000',
                type: 'kt',
                childnode: [
                  {
                    id: 11592,
                    name: 'cherry',
                    phone: '111-222-0000',
                    type: 'lg',
                    childnode: [],
                  },
                  {
                    id: 11595,
                    name: 'solvin',
                    phone: '010-000-3333',
                    type3: 'sk',
                    childnode: [],
                  },
                ],
              },
            ],
          },
          {
            id: 116,
            name: 'kim',
            phone: '444-111-0200',
            type: 'kt',
            childnode: [
              {
                id: 1168,
                name: 'hani',
                phone: '010-222-0000',
                type4: 'sk',
                childnode: [
                  {
                    id: 11689,
                    name: 'ho',
                    phone: '010-000-0000',
                    type: 'kt',
                    childnode: [
                      {
                        id: 116890,
                        name: 'wonsuk',
                        phone: '010-000-0000',
                        type: 'kt',
                        childnode: [],
                      },
                      {
                        id: 1168901,
                        name: 'chulsu',
                        phone: '010-0000-0000',
                        type5: 'sk',
                        childnode: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 117,
            name: 'hong',
            phone: '010-0000-0000',
            type: 'lg',
            childnode: [],
          },
        ],
      },
    ],
  },
];

const findTargetValue = (arr, keyName, targetValue, result = []) => {
  arr.forEach((obj) => {
    for (const key in obj) {
      if (obj[key] === targetValue) {
        result.push(obj[keyName]);
      }
      if (typeof obj[key] === 'object') {
        findTargetValue(obj[key], keyName, targetValue, result);
      }
    }
  });
  return result;
};

console.log(findTargetValue(data, 'name', 'sk'));
