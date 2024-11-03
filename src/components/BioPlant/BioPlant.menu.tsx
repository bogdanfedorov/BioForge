import { CircularProgress, Progress } from '@nextui-org/progress';
import { FC, useEffect, useState } from 'react';
import { useEntity } from '../../context/Entity.context';
import { BaseEntityTypeProps } from '../../types';
import { BioPlantEntiry } from './BioPlant.entity';

export const BioPlantMenu: FC<BaseEntityTypeProps<BioPlantEntiry>> = () => {
  const { entity } = useEntity();
  const [energyPercentage, setEnergyPercentage] = useState(
    entity.energy?.percentage() || 0,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPercentage(entity.energy?.percentage() || 0);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [entity]);

  return (
    <div className="p-3 rounded-tr-md bg-white">
      <h1>Bio Plant</h1>
      <section>
        <Progress
          label="Energy"
          showValueLabel={true}
          color="success"
          size="md"
          value={energyPercentage}
        />
      </section>

      {entity.pcf && (
        <section>
          <h1>Stats</h1>
          <section className="grid grid-cols-2 justify-center gap-1">
            {Array.from(entity.pcf.entries()).map(([key, val]) => (
              <CircularProgress
                className="max-w-full"
                key={key}
                aria-label={key}
                label={key}
                size="lg"
                color="warning"
                showValueLabel={true}
                value={val.percentage()}
              />
            ))}
          </section>
        </section>
      )}

      <section>
        <h1>Organels</h1>
        <ul>
          <li className="flex ">
            <p>Chloroformus</p>
            <p>100 atf</p>
          </li>
        </ul>
      </section>
    </div>
  );
};
