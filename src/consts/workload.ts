import { EmployeeWorkloadProfile } from '../types/workload';

const allocations = [
  { month: 'Jan', monthIndex: 1, fteValue: 1, inputValue: 1, isChecked: false },
  { month: 'Feb', monthIndex: 2, fteValue: 1, inputValue: 1, isChecked: false },
  { month: 'Mar', monthIndex: 3, fteValue: 4, inputValue: 4, isChecked: false },
  {
    month: 'Apr',
    monthIndex: 4,
    fteValue: 0.3,
    inputValue: 0.3,
    isChecked: false,
  },
  { month: 'May', monthIndex: 5, fteValue: 1, inputValue: 1, isChecked: false },
  { month: 'Jun', monthIndex: 6, fteValue: 1, inputValue: 1, isChecked: false },
  { month: 'Jul', monthIndex: 7, fteValue: 1, inputValue: 1, isChecked: false },
  { month: 'Aug', monthIndex: 8, fteValue: 1, inputValue: 1, isChecked: false },
  { month: 'Sep', monthIndex: 9, fteValue: 1, inputValue: 1, isChecked: false },
  {
    month: 'Oct',
    monthIndex: 10,
    fteValue: 1,
    inputValue: 1,
    isChecked: false,
  },
  {
    month: 'Nov',
    monthIndex: 11,
    fteValue: 1,
    inputValue: 1,
    isChecked: false,
  },
  {
    month: 'Dec',
    monthIndex: 12,
    fteValue: 1,
    inputValue: 1,
    isChecked: false,
  },
];

export const data: EmployeeWorkloadProfile[] = [
  {
    id: '1',
    employeeId: 'EMP-9921',
    employeeName: 'BIANCHINI Thierry',
    year: 2024,
    projects: [
      {
        id: 'MR10R801',
        departmentCode: 'DE',
        projectName: 'Serial Life PSA',
        region: 'Europe',
        clientGroup: 'STELLANTIS',
        brand: 'PSA',
        actingAsRole: '',
        notes: 'test',
        allocations,
      },
    ],
  },
  {
    id: '2',
    employeeId: 'EMP-9921',
    employeeName: 'BIANCHINI Thierry',
    year: 2025,
    projects: [
      {
        id: 'MR10R802',
        departmentCode: 'DE',
        projectName: 'Serial Life PSA',
        region: 'Europe',
        clientGroup: 'STELLANTIS',
        brand: 'PSA',
        actingAsRole: '',
        notes: 'test',
        allocations,
      },
    ],
  },
  {
    id: '3',
    employeeId: 'EMP-9921',
    employeeName: 'BIANCHINI Thierry',
    year: 2025,
    projects: [
      {
        id: 'MR10R803',
        departmentCode: 'DE',
        projectName: 'Serial Life PSA',
        region: 'Europe',
        clientGroup: 'STELLANTIS',
        brand: 'PSA',
        actingAsRole: '',
        notes: 'test',
        allocations,
      },
    ],
  },
];
