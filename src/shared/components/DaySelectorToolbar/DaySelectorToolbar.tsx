import React, { useMemo } from 'react';
import { DateTime } from 'luxon';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  days: string[];
  labelBuilder?: (value: string) => string;
  pastDaysDisabled?: boolean;
};

const splitByWeeks = (days: string[]) => {
  DateTime.fromISO(days[0]);
  return days.reduce<string[][]>((weeks, day) => {
    const weekday = DateTime.fromISO(day).weekday;

    if (weekday === 1 || weeks.length === 0) {
      return [...weeks, [day]];
    } else {
      return [...weeks.slice(0, -1), [...weeks[weeks.length - 1], day]];
    }
  }, []);
};

const DaySelectorToolbar = ({
  value,
  onChange,
  days,
  labelBuilder = (value) => value,
  pastDaysDisabled = false,
}: Props) => {
  const todayISO = DateTime.local().toISODate();

  const weeks = useMemo(() => splitByWeeks(days), [JSON.stringify(days)]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {weeks.map((week) => (
        <Tabs value={value} onChange={onChange} variant="fullWidth">
          {week.map((day) => (
            <Tab
              value={day}
              label={labelBuilder(day)}
              key={day}
              disabled={pastDaysDisabled && day < todayISO}
            />
          ))}
        </Tabs>
      ))}
    </Box>
  );
};

export default DaySelectorToolbar;
