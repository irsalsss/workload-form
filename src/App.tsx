import { useMemo, useState } from 'react';
import { data } from './consts/workload';
import { EmployeeWorkloadProfile } from './types/workload';
import WorkloadForm from './components/WorkloadForm';
import Select from './components/Select';

export default function App() {
  const [employeeWorkloadProfiles, setEmployeeWorkloadProfiles] =
    useState<EmployeeWorkloadProfile[]>(data);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = useMemo(
    () => [...new Set(employeeWorkloadProfiles.map((item) => item.year))],
    [employeeWorkloadProfiles],
  );

  const selectedEmployeeWorkloadByYear = useMemo(() => {
    if (!selectedYear) return [];

    return employeeWorkloadProfiles.filter(
      (item) => item.year === selectedYear,
    );
  }, [employeeWorkloadProfiles, selectedYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleChangeRole = (
    workLoadId: string,
    projectId: string,
    value: string,
  ) => {
    setEmployeeWorkloadProfiles((prev) =>
      prev.map((item) =>
        item.id === workLoadId
          ? {
              ...item,
              projects: item.projects.map((project) => {
                return project.id === projectId
                  ? { ...project, actingAsRole: value }
                  : project;
              }),
            }
          : item,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-4 p-8">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resource Allocation
        </h1>

        <div className="flex items-center gap-2">
          <label htmlFor="years">Year:</label>

          <Select
            name="years"
            id="years"
            placeholder="Choose Year"
            options={years}
            defaultValue={selectedYear ?? ''}
            onChange={handleYearChange}
          />
        </div>
      </div>

      {selectedEmployeeWorkloadByYear &&
        selectedEmployeeWorkloadByYear.map((workload) => (
          <WorkloadForm
            key={workload.id}
            selectedWorkload={workload}
            onChangeRole={handleChangeRole}
          />
        ))}
    </div>
  );
}
