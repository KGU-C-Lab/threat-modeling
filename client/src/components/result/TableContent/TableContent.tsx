import { useCallback, useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/common/Tooltip/Tooltip';
import { TableCell, TableRow } from '@components/common/Table/Table';
import type {
  AttackFlowResultType,
  DefendTechniqueType,
  ThreatModelType,
} from '@type/model';
import { cn } from '@utils/component';
import { Link, useLocation } from 'react-router-dom';

interface TableContentProps {
  data?: ThreatModelType;
}

interface TooltipComponentProps {
  mitigationId: string;
  mitigationUrl: string;
  relatedDefendTechniques: DefendTechniqueType[];
}

const TooltipComponent = ({
  mitigationId,
  mitigationUrl,
  relatedDefendTechniques,
}: TooltipComponentProps) => (
  <Tooltip>
    <TooltipTrigger className="text-gray-600 cursor-default hover:underline hover:text-black dark:text-gray-300">
      {mitigationId}
    </TooltipTrigger>
    <TooltipContent>
      <Link
        to={mitigationUrl}
        target="_blank"
        className="text-base font-semibold text-red-500 hover:underline"
      >
        {mitigationId}
      </Link>
      {relatedDefendTechniques.length > 0 && (
        <div className="mt-1 divide-x">
          {relatedDefendTechniques.map(({ defendId, defendUrl }) => (
            <Link
              key={defendId}
              to={defendUrl}
              target="_blank"
              className="px-2 hover:underline"
            >
              {defendId}
            </Link>
          ))}
        </div>
      )}
    </TooltipContent>
  </Tooltip>
);

const TableContent = ({ data }: TableContentProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  const state = location.state as { data: AttackFlowResultType };

  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);

  if (!state?.data || !data) throw new Error('Invalid state');

  const controlsToShow = open
    ? data.relatedControls
    : data.relatedControls.slice(0, 1);

  return controlsToShow.map((control, index) => (
    <TableRow key={control.controlId}>
      {/* Level.6 */}
      {index === 0 && (
        <TableCell
          rowSpan={open ? controlsToShow.length : 1}
          className="border-r "
        >
          {state.data[data.attack.attackId] || '-'}
        </TableCell>
      )}
      {/* Technique ID */}
      {index === 0 && (
        <TableCell rowSpan={open ? controlsToShow.length : 1}>
          <Link
            to={data.attack.attackUrl}
            target="_blank"
            className="text-gray-600 hover:underline hover:text-black dark:text-gray-300"
          >
            {data.attack.attackId}
          </Link>
        </TableCell>
      )}
      {/* Control ID */}
      <TableCell className="border-l">{control.controlId}</TableCell>
      {/* Control Name */}
      <TableCell>{control.controlName}</TableCell>
      {/* Mitigation */}
      <TooltipProvider>
        {index === 0 && (
          <TableCell rowSpan={open ? controlsToShow.length : 1}>
            <div className="grid grid-cols-3 gap-2 min-w-[190px]">
              {data.relatedMitigations.map(
                ({ mitigationId, mitigationUrl, relatedDefendTechniques }) => (
                  <TooltipComponent
                    key={mitigationId}
                    mitigationId={mitigationId}
                    mitigationUrl={mitigationUrl}
                    relatedDefendTechniques={relatedDefendTechniques}
                  />
                ),
              )}
            </div>
          </TableCell>
        )}
      </TooltipProvider>
      {/* CVE */}
      {index === 0 && (
        <TableCell
          rowSpan={open ? controlsToShow.length : 1}
          className="min-w-[280px]"
        >
          <div
            className={cn(
              'grid text-nowrap overflow-auto scrollbar-hide text-xs',
              { 'grid-cols-2 gap-2': data.relatedCves.length > 0 },
              { 'max-h-12': !open },
            )}
          >
            {data.relatedCves.length > 0
              ? data.relatedCves.map(({ cveId, cvss }) => (
                  <Link
                    key={cveId}
                    to={`https://nvd.nist.gov/vuln/detail/${cveId}`}
                    className="text-gray-600 hover:underline hover:text-black dark:text-gray-300"
                    target="_blank"
                  >{`${cveId} ${`(${cvss || 'N/A'})`}`}</Link>
                ))
              : '-'}
          </div>
        </TableCell>
      )}
      {/* Action */}
      <TableCell>
        <button onClick={handleOpen}>
          {open === false ? (
            <MdOutlineExpandMore size={24} />
          ) : index === 0 ? (
            <MdOutlineExpandMore size={24} className="rotate-180" />
          ) : (
            <div className="text-xs text-gray-400">{data.attack.attackId}</div>
          )}
        </button>
      </TableCell>
    </TableRow>
  ));
};

export default TableContent;
