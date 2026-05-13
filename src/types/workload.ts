export interface MonthlyAllocation {
  month: string;
  monthIndex: number;
  fteValue: number;
  inputValue: number;
  isChecked: boolean;
}

export interface ProjectWorkload {
  id: string;
  departmentCode: string;
  actingAsRole: string;
  notes: string;
  projectName: string;
  region: string;
  clientGroup: string;
  brand: string;
  allocations: MonthlyAllocation[];
}

export interface EmployeeWorkloadProfile {
  id: string;
  employeeId: string;
  employeeName: string;
  year: number;
  projects: ProjectWorkload[];
}
