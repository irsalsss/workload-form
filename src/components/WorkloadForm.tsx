import { twMerge } from 'tailwind-merge';
import { EmployeeWorkloadProfile } from '../types/workload';
import Select from './Select';
import { getStatus } from '../consts/status';
import { roles } from '../consts/roles';
import VerticalLine from './VerticalLine';

interface WorkloadFormProps {
  selectedWorkload: EmployeeWorkloadProfile;
  onChangeRole: (workLoadId: string, projectId: string, value: string) => void;
}

export default function WorkloadForm({
  selectedWorkload,
  onChangeRole,
}: WorkloadFormProps) {
  const handleChangeRole =
    (workLoadId: string, projectId: string) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeRole(workLoadId, projectId, event.target.value);
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
                    getStatus(allocation.fteValue),
                    'rounded-md px-8 py-2',
                    'flex items-center justify-center',
                  )}
                >
                  {allocation.fteValue}
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
                      defaultValue={allocation.inputValue}
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
            />
          </div>

          <VerticalLine />
        </div>
      ))}
    </div>
  );
}
