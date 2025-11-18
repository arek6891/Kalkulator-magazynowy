
import { WarehouseData, CalculationResult } from '../types';

export const calculateWorkforce = (data: WarehouseData): CalculationResult => {
  const {
    deliveries,
    deliveriesPerHour,
    orders,
    itemsPerOrder,
    itemsPickedPerHour,
    ordersPackedPerHour,
    workHours,
    currentEmployees,
    breakTime = 30, // Default 30 min if not provided
    processEfficiency = 85 // Default 85% if not provided
  } = data;

  if (workHours <= 0) {
    return { receivers: 0, pickers: 0, packers: 0, total: 0, buffer: 0, needed: 0, effectiveWorkHours: 0 };
  }

  // 1. Calculate Net Available Time per Person (Logistics Standard)
  // Nominal Hours - Breaks = Net Hours
  const breakHours = breakTime / 60;
  const netAvailableHours = Math.max(0, workHours - breakHours);
  
  // 2. Apply Process Efficiency (OEE / Utilization)
  // Real capacity is lower than net hours due to fatigue, micro-stops, etc.
  const efficiencyFactor = processEfficiency / 100;
  const effectiveProductiveHoursPerPerson = netAvailableHours * efficiencyFactor;

  if (effectiveProductiveHoursPerPerson <= 0) {
      return { receivers: 0, pickers: 0, packers: 0, total: 0, buffer: 0, needed: 0, effectiveWorkHours: 0 };
  }

  // 3. Calculate Workload in Man-Hours (Standard Hours)
  const receivingManHours = deliveriesPerHour > 0 ? deliveries / deliveriesPerHour : 0;
  
  const totalItemsToPick = orders * itemsPerOrder;
  const pickingManHours = itemsPickedPerHour > 0 ? totalItemsToPick / itemsPickedPerHour : 0;
  
  const packingManHours = ordersPackedPerHour > 0 ? orders / ordersPackedPerHour : 0;

  // 4. Calculate FTE (Full Time Equivalent) Required
  // Formula: Workload Hours / Effective Productive Hours per Person
  const receiversRequired = receivingManHours / effectiveProductiveHoursPerPerson;
  const pickersRequired = pickingManHours / effectiveProductiveHoursPerPerson;
  const packersRequired = packingManHours / effectiveProductiveHoursPerPerson;

  // Rounding strategy: In logistics planning for headcount, we round up to ensure coverage.
  const finalReceivers = Math.ceil(receiversRequired);
  const finalPickers = Math.ceil(pickersRequired);
  const finalPackers = Math.ceil(packersRequired);

  const totalRequired = finalReceivers + finalPickers + finalPackers;
  
  // Calculate "Buffer" / Overhead
  // Comparison: How many people would be needed if they were robots (100% efficiency, no breaks)
  // vs how many are needed realistically.
  const rawReceivers = receivingManHours / workHours;
  const rawPickers = pickingManHours / workHours;
  const rawPackers = packingManHours / workHours;
  const totalRaw = Math.ceil(rawReceivers + rawPickers + rawPackers);
  
  const impliedBuffer = Math.max(0, totalRequired - totalRaw);
  const needed = Math.max(0, totalRequired - currentEmployees);

  return {
    receivers: finalReceivers,
    pickers: finalPickers,
    packers: finalPackers,
    total: totalRequired,
    buffer: impliedBuffer, // Represents staff added due to breaks and efficiency loss
    needed: needed,
    effectiveWorkHours: Number(effectiveProductiveHoursPerPerson.toFixed(2))
  };
};
