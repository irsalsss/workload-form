import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { EmployeeWorkloadProfile } from '../types/workload';
import Select from './Select';
import { getStatus } from '../consts/status';
import { roles } from '../consts/roles';
import Separator from './Separator';

const INPUT_RESET_DELAY_MS = 500;

const displayFTEValue = (
  previousValue: number,
  currentValue: number,
  isChecked: boolean,
) => {
  if (isChecked) {
    return 0;
  }

  if (previousValue !== currentValue) {
    return currentValue;
  }

  return previousValue;
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
  onChangeCheckbox: (
    workLoadId: string,
    projectId: string,
    month: string,
    isChecked: boolean,
  ) => void;
}

export default function WorkloadForm({
  selectedWorkload,
  onChangeRoleAndNote,
  onChangeInputValue,
  onChangeCheckbox,
}: WorkloadFormProps) {
  const resetTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const [localValues, setLocalValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const project of selectedWorkload.projects) {
      for (const allocation of project.allocations) {
        initial[`${project.id}:${allocation.month}`] = String(
          allocation.inputValue,
        );
      }
    }
    return initial;
  });

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
      const localKey = `${projectId}:${month}`;

      setLocalValues((prev) => ({ ...prev, [localKey]: value }));

      if (value === '') return;

      const nums = Number(value);
      const isError = isNaN(nums) || nums < 0 || nums > 5;
      let error = '';

      if (isError) {
        error = isNaN(nums)
          ? 'Please enter a valid number.'
          : 'Value must be a number between 0 and 5.';

        const timerKey = `${workLoadId}:${projectId}:${month}`;
        const existing = resetTimersRef.current.get(timerKey);

        if (existing) clearTimeout(existing);
        const timer = setTimeout(() => {
          resetTimersRef.current.delete(timerKey);
          setLocalValues((prev) => ({
            ...prev,
            [localKey]: String(previousValue),
          }));
        }, INPUT_RESET_DELAY_MS);

        resetTimersRef.current.set(timerKey, timer);
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

  const handleChangeCheckbox =
    (workLoadId: string, projectId: string, month: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeCheckbox(workLoadId, projectId, month, event.target.checked);
    };

  const handleOnBlurInputValue =
    (projectId: string, month: string, previousValue: number) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setLocalValues((prev) => ({
          ...prev,
          [`${projectId}:${month}`]: String(previousValue),
        }));
      }
    };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
      <h1 className="text-2xl font-bold">{selectedWorkload.employeeName}</h1>
      <p>Workload</p>

      {selectedWorkload.projects.map((project) => (
        <div key={project.id} className="mt-8">
          <div className="flex gap-2 mt-8">
            <div className="w-[120px]" />
            <div className="grid grid-cols-12 gap-2 w-full">
              {project.allocations.map((allocation) => {
                const fte = displayFTEValue(
                  allocation.fteValue,
                  allocation.inputValue,
                  allocation.isChecked,
                );
                return (
                  <div className="flex flex-col gap-2" key={allocation.month}>
                    <p className="text-center text-gray-500">
                      {allocation.month}
                    </p>
                    <p
                      className={twMerge(
                        getStatus(fte),
                        'rounded-md px-2 py-2',
                        'flex items-center justify-center',
                      )}
                    >
                      {fte}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-lg">{project.projectName}</p>
              <p className="text-gray-500 text-md">| {project.region}</p>
              <p className="text-gray-500 text-md">| {project.clientGroup}</p>
              <p className="text-gray-500 text-md">| {project.brand}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="flex flex-col gap-2 w-[120px]">
                <p className="text-md text-gray-400 text-right">Total</p>
                <div className="h-full flex gap-2">
                  <span className="w-1 h-8 bg-blue-800 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <p className="text-md">{project.departmentCode} |</p>
                    <p className="text-md">{project.id}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-12 gap-2 w-full">
                  {project.allocations.map((allocation) => (
                    <div key={allocation.month} className="flex flex-col gap-2">
                      <p className="text-center font-bold">
                        {displayFTEValue(
                          allocation.fteValue,
                          allocation.inputValue,
                          allocation.isChecked,
                        )}
                      </p>

                      <div
                        className={twMerge(
                          'flex gap-2 items-center justify-center rounded-md px-2 py-2 bg-gray-100',
                          allocation.isChecked &&
                            'bg-orange-100 text-orange-800',
                        )}
                      >
                        <input
                          className="w-6 text-center"
                          type="text"
                          value={
                            localValues[`${project.id}:${allocation.month}`] ??
                            String(allocation.inputValue)
                          }
                          onChange={handleChangeInputValue(
                            selectedWorkload.id,
                            project.id,
                            allocation.month,
                            allocation.fteValue,
                          )}
                          onBlur={handleOnBlurInputValue(
                            project.id,
                            allocation.month,
                            allocation.fteValue,
                          )}
                        />
                        <input
                          className="w-6"
                          type="checkbox"
                          checked={allocation.isChecked}
                          onChange={handleChangeCheckbox(
                            selectedWorkload.id,
                            project.id,
                            allocation.month,
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 items-start">
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
                    className="w-full h-10 rounded-md p-2 border border-gray-200 resize-none focus:h-24 bg-gray-200 outline-none overflow-y-hidden"
                    onBlur={handleChangeNote(selectedWorkload.id, project.id)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />
        </div>
      ))}
    </div>
  );
}
