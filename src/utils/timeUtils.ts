export interface Period {
  start: string;
  end: string;
}

export const getBeijingPeriods = (localPeriods: Period[] | undefined, timezone: number): Period[] => {
  if (!localPeriods) return [];

  const beijingPeriods: Period[] = [];

  localPeriods.forEach(p => {
    const [sh, sm] = p.start.split(':').map(Number);
    const [eh, em] = p.end.split(':').map(Number);
    
    let startVal = sh + sm / 60;
    let endVal = eh + em / 60;
    
    // Handle local wrapping (e.g. 18:00 to 17:00 next day)
    let duration = endVal - startVal;
    if (duration < 0) {
      duration += 24;
    }

    // Convert Start to Beijing Time
    // Local = UTC + TZ
    // UTC = Local - TZ
    // Beijing = UTC + 8 = Local - TZ + 8
    let beijingStart = startVal - timezone + 8;
    
    // Normalize start to 0-24 range initially to find "Day Start"
    // We use modulo but need to handle negative results from subtraction
    beijingStart = (beijingStart % 24 + 24) % 24;

    const beijingEnd = beijingStart + duration;

    // Check for wrapping in Beijing Time
    if (beijingEnd > 24) {
      // Split into two parts
      // Part 1: Start to 24
      beijingPeriods.push({
        start: formatTime(beijingStart),
        end: '24:00'
      });
      // Part 2: 0 to (End - 24)
      beijingPeriods.push({
        start: '00:00',
        end: formatTime(beijingEnd - 24)
      });
    } else {
      beijingPeriods.push({
        start: formatTime(beijingStart),
        end: formatTime(beijingEnd)
      });
    }
  });

  return beijingPeriods;
};

const formatTime = (val: number): string => {
  // Fix floating point precision issues (e.g. 4.9999999)
  val = Math.round(val * 100) / 100;
  
  if (val >= 24) val = 0; // Should handle 24 as 0 if needed, but usually we map to 24:00 for "end"
  
  const h = Math.floor(val);
  const m = Math.round((val - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};
