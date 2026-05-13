import { useMemo, useState } from 'react';
import { data } from './consts/workload';
import { EmployeeWorkloadProfile } from './types/workload';
import WorkloadForm from './components/WorkloadForm';
import Select from './components/Select';
import { useNotification } from './hooks/useNotification';

export default function App() {
  const { showError, notification } = useNotification();
  const [employeeWorkloadProfiles, setEmployeeWorkloadProfiles] =
    useState<EmployeeWorkloadProfile[]>(data);
  const [selectedYear, setSelectedYear] = useState(
    () => [...new Set(data.map((d) => d.year))][0] ?? null,
  );

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

  const handleChangeRoleAndNote = (
    workLoadId: string,
    projectId: string,
    key: 'actingAsRole' | 'notes',
    value: string,
  ) => {
    setEmployeeWorkloadProfiles((prev) =>
      prev.map((item) =>
        item.id === workLoadId
          ? {
              ...item,
              projects: item.projects.map((project) => {
                return project.id === projectId
                  ? { ...project, [key]: value }
                  : project;
              }),
            }
          : item,
      ),
    );
  };

  const handleChangeInputValue = (
    workLoadId: string,
    projectId: string,
    month: string,
    value: string,
    previousValue: number,
    error: string,
  ) => {
    if (error) {
      showError(error);
    }

    setEmployeeWorkloadProfiles((prev) =>
      prev.map((item) => {
        if (item.id !== workLoadId) {
          return item;
        }

        return {
          ...item,
          projects: item.projects.map((project) => {
            if (project.id !== projectId) {
              return project;
            }

            return {
              ...project,
              allocations: project.allocations.map((allocation) => {
                if (allocation.month !== month) {
                  return allocation;
                }

                return {
                  ...allocation,
                  inputValue: error ? previousValue : Number(value),
                };
              }),
            };
          }),
        };
      }),
    );
  };

  const handleChangeCheckbox = (
    workLoadId: string,
    projectId: string,
    month: string,
    isChecked: boolean,
  ) => {
    setEmployeeWorkloadProfiles((prev) =>
      prev.map((item) =>
        item.id === workLoadId
          ? {
              ...item,
              projects: item.projects.map((project) =>
                project.id === projectId
                  ? {
                      ...project,
                      allocations: project.allocations.map((allocation) =>
                        allocation.month === month
                          ? { ...allocation, isChecked: isChecked }
                          : allocation,
                      ),
                    }
                  : project,
              ),
            }
          : item,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-4 lg:p-8 p-4 relative">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resource Allocation
        </h1>

        <div className="flex items-center gap-2">
          <label htmlFor="years">Year:</label>

          <Select
            name="years"
            id="years"
            options={years}
            value={selectedYear ?? ''}
            onChange={handleYearChange}
          />
        </div>
      </div>

      {selectedEmployeeWorkloadByYear &&
        selectedEmployeeWorkloadByYear.map((workload) => (
          <WorkloadForm
            key={workload.id}
            selectedWorkload={workload}
            onChangeRoleAndNote={handleChangeRoleAndNote}
            onChangeInputValue={handleChangeInputValue}
            onChangeCheckbox={handleChangeCheckbox}
          />
        ))}

      {notification}
    </div>
  );
}
