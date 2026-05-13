import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { EmployeeWorkloadProfile } from '../types/workload';
import Select from './Select';
import { getStatus } from '../consts/status';
import { roles } from '../consts/roles';
import VerticalLine from './VerticalLine';

const displayFTEValue = (
  fteValue: number,
  inputValue: number,
  isChecked: boolean,
) => {
  if (fteValue !== inputValue) {
    return inputValue;
  }

  if (isChecked) {
    return 0;
  }

  return fteValue;
};

interface WorkloadFormProps {
  selectedWorkload: EmployeeWorkloadProfile;
  onChangeRoleAndNote: (
    workLoadId: string,
    projectId: string,
    key: 'actingAsRole' | 'notes',
    value: string,
  ) => void;
  onChangeInputValue: (
    workLoadId: string,
    projectId: string,
    month: string,
    value: string,
    previousValue: number,
    error: string,
  ) => void;
}

export default function WorkloadForm({
  selectedWorkload,
  onChangeRoleAndNote,
  onChangeInputValue,
}: WorkloadFormProps) {
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeRole =
    (workLoadId: string, projectId: string) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeRoleAndNote(
        workLoadId,
        projectId,
        'actingAsRole',
        event.target.value,
      );
    };

  const handleChangeNote =
    (workLoadId: string, projectId: string) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeRoleAndNote(workLoadId, projectId, 'notes', event.target.value);
    };

  const handleChangeInputValue =
    (
      workLoadId: string,
      projectId: string,
      month: string,
      previousValue: number,
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '') {
        return;
      }

      const input = event.target;
      const nums = Number(value);
      const isError = isNaN(nums) || nums < 0 || nums > 5;
      let error = '';

      if (isError) {
        if (isNaN(nums)) {
          error = 'Please enter a valid number.';
        } else if (nums < 0 || nums > 4) {
          error = 'Stuffing must be between number between 0 and 5.';
        }

        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          input.value = String(previousValue);
        }, 500);
      }

      onChangeInputValue(
        workLoadId,
        projectId,
        month,
        value,
        previousValue,
        error,
      );
    };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
      <h1 className="text-2xl font-bold">{selectedWorkload.employeeName}</h1>
      <p>Workload</p>
      <p>ID: {selectedWorkload.id}</p>
      <p>Employee id: {selectedWorkload.employeeId}</p>

      {selectedWorkload.projects.map((project) => (
        <div key={project.id} className="mt-8">
          <div className="mt-8 flex gap-2">
            {project.allocations.map((allocation) => (
              <div className="flex flex-col gap-2" key={allocation.month}>
                <p className="text-center text-gray-500">{allocation.month}</p>
                <p
                  className={twMerge(
                    getStatus(
                      displayFTEValue(
                        allocation.fteValue,
                        allocation.inputValue,
                        allocation.isChecked,
                      ),
                    ),
                    'rounded-md px-8 py-2',
                    'flex items-center justify-center',
                  )}
                >
                  {displayFTEValue(
                    allocation.fteValue,
                    allocation.inputValue,
                    allocation.isChecked,
                  )}
                </p>
              </div>
            ))}
          </div>

          <VerticalLine />

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-lg">{project.projectName}</p>
              <p className="text-gray-500 text-md">| {project.region}</p>
              <p className="text-gray-500 text-md">| {project.clientGroup}</p>
              <p className="text-gray-500 text-md">| {project.brand}</p>
            </div>

            <div className="flex gap-2 items-center mt-4">
              {project.allocations.map((allocation) => (
                <div key={allocation.month} className="flex flex-col gap-2">
                  <p className="text-center font-bold">{allocation.fteValue}</p>

                  <div className="flex gap-2 items-center justify-center rounded-md px-2 py-2 bg-gray-100">
                    <input
                      className="w-6"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      defaultValue={allocation.inputValue}
                      onChange={handleChangeInputValue(
                        selectedWorkload.id,
                        project.id,
                        allocation.month,
                        allocation.fteValue,
                      )}
                    />
                    <input
                      className="w-6"
                      type="checkbox"
                      defaultChecked={allocation.isChecked}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-start mt-4">
            <Select
              name="actingAsRole"
              id="actingAsRole"
              placeholder="Acting as"
              options={roles}
              defaultValue={project.actingAsRole}
              onChange={handleChangeRole(selectedWorkload.id, project.id)}
            />

            <textarea
              name="notes"
              id="notes"
              placeholder="Comments"
              defaultValue={project.notes}
              className="w-full h-10 rounded-md p-2 border border-gray-300 resize-none focus:h-24"
              onBlur={handleChangeNote(selectedWorkload.id, project.id)}
            />
          </div>

          <VerticalLine />
        </div>
      ))}
    </div>
  );
}
