import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  WEIGHT_CLASSES_GUIDE,
  SAFE_WATER_CUT_PROTOCOL,
  REHYDRATION_PROTOCOL
} from '../data/mmaData';
import {
  Scale,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Activity,
  HeartPulse,
  Info,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export const WeightCutCalculator: React.FC = () => {
  const { profile, updateProfile, showToast } = useApp();

  const [selectedClassIndex, setSelectedClassIndex] = useState(4); // Default Lightweight (155)
  const [currentWeight, setCurrentWeight] = useState(172);
  const [daysUntilWeighIn, setDaysUntilWeighIn] = useState(6);

  const selectedClass = WEIGHT_CLASSES_GUIDE[selectedClassIndex] || WEIGHT_CLASSES_GUIDE[4];
  const targetWeight = selectedClass.limitLbs;

  // Total pounds to drop
  const poundsToLose = Math.max(0, currentWeight - targetWeight);
  const percentageCut = currentWeight > 0 ? (poundsToLose / currentWeight) * 100 : 0;

  // Risk Classification
  const getRiskClassification = () => {
    if (percentageCut <= 8) {
      return {
        level: 'Safe Zone (Professional Standard)',
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
        badge: 'Safe Cut (<8%)',
        advice: 'Within recommended athletic commission guidelines. Minimal risk of renal stress or cognitive impairment if rehydration protocol is followed.'
      };
    } else if (percentageCut <= 11) {
      return {
        level: 'Moderate Risk (Severe Water Taper)',
        color: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
        badge: 'Caution (8-11%)',
        advice: 'High fluid cut. Requires strict electrolyte monitoring, hot baths instead of excessive sauna, and medical supervision.'
      };
    } else {
      return {
        level: 'Extreme Danger (Excessive Dehydration)',
        color: 'text-rose-400 bg-rose-950/40 border-rose-800/60',
        badge: 'High Danger (>11%)',
        advice: 'Exceeds CSAC/NSAC safe guidelines. Severe risk of kidney failure, heat stroke, and reduced cerebrospinal fluid protecting the brain from concussions. Strongly consider moving up a weight class.'
      };
    }
  };

  const risk = getRiskClassification();

  const handleApplyToProfile = () => {
    updateProfile({
      weightClass: `${selectedClass.name} (${selectedClass.limitLbs} lbs)`
    });
    showToast(`Weight division updated to ${selectedClass.name} in your fighter profile!`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#10131d] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest">
          <Droplets className="w-4 h-4" />
          <span>Combat Sports Sports Medicine & Physiology</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-wide mt-1">
          Fighter Weight Cut & Hydration Protocol
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Calculate safe water cut thresholds, manage water loading schedules, and execute medical-grade post-weigh-in rehydration to enter the cage at peak strength and cardio.
        </p>
      </div>

      {/* Input Parameters Card */}
      <div className="bg-[#12151f] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Weight Division */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Target Weight Class
            </label>
            <select
              value={selectedClassIndex}
              onChange={(e) => setSelectedClassIndex(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#0a0b0e] border border-slate-800 rounded-xl text-xs sm:text-sm text-white font-semibold"
            >
              {WEIGHT_CLASSES_GUIDE.map((wc, idx) => (
                <option key={wc.name} value={idx}>
                  {wc.name} ({wc.limitLbs} lbs / {wc.limitKg} kg)
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400">
              Typical Walk Weight: {selectedClass.typicalWalkWeightLbs}
            </div>
          </div>

          {/* Current Walking Weight */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Walking Weight (lbs)
            </label>
            <div className="relative">
              <input
                type="number"
                min="100"
                max="320"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#0a0b0e] border border-slate-800 rounded-xl text-base text-white font-mono font-bold"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-bold">
                LBS
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Scale weigh-in morning of competition
            </div>
          </div>

          {/* Days until weigh-in */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Days to Official Weigh-In
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={daysUntilWeighIn}
              onChange={(e) => setDaysUntilWeighIn(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#0a0b0e] border border-slate-800 rounded-xl text-base text-white font-mono font-bold"
            />
            <div className="text-[11px] text-slate-400">
              {daysUntilWeighIn <= 2 ? 'Active sweat extraction phase' : 'Water loading & diet prep phase'}
            </div>
          </div>
        </div>

        {/* Calculation Summary Bar */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-[#141824] rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Total Deficit Required</div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-white mt-1 tabular-nums">
              {poundsToLose.toFixed(1)} <span className="text-sm font-normal text-slate-400">lbs</span>
            </div>
          </div>

          <div className="p-4 bg-[#141824] rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Body Mass Percentage</div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-rose-500 mt-1 tabular-nums">
              {percentageCut.toFixed(1)}%
            </div>
          </div>

          <div className="p-4 bg-[#141824] rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Daily Loss Needed</div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-white mt-1 tabular-nums">
              {(poundsToLose / Math.max(1, daysUntilWeighIn)).toFixed(1)} <span className="text-sm font-normal text-slate-400">lbs/day</span>
            </div>
          </div>

          <div className="p-4 bg-[#141824] rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Championship Scale Limit</div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-400 mt-1 tabular-nums">
              {targetWeight} <span className="text-sm font-normal text-slate-400">lbs</span>
            </div>
          </div>
        </div>

        {/* Risk Classification Alert */}
        <div className={`p-5 rounded-2xl border ${risk.color} space-y-2`}>
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <HeartPulse className="w-4 h-4" />
              <span>Medical Safety Tier: {risk.level}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-black/40">
              {risk.badge}
            </span>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            {risk.advice}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleApplyToProfile}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            Apply Weight Class to Profile
          </button>
        </div>
      </div>

      {/* 5-Day Water Loading & Depletion Schedule */}
      <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
          <Droplets className="w-4 h-4" />
          <span>Scientific 5-Day Water Loading & Depletion Protocol</span>
        </div>
        <p className="text-xs text-slate-400">
          Hyper-hydrating forces your adrenal system into flushing excess water. When fluid intake is cut 24 hours prior to weigh-in, your kidneys continue excreting water at the accelerated rate.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#141824] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Water Target</th>
                <th className="py-3 px-4">Sodium Level</th>
                <th className="py-3 px-4">Carbohydrates</th>
                <th className="py-3 px-4">Physiological Objective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {SAFE_WATER_CUT_PROTOCOL.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#141824]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.day}</td>
                  <td className="py-3 px-4 text-cyan-400 font-semibold">{row.waterIntake}</td>
                  <td className="py-3 px-4">{row.sodium}</td>
                  <td className="py-3 px-4">{row.carbs}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immediate Post-Weigh-in Rehydration Guide */}
      <div className="bg-[#10131d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Post-Scale Rehydration & Glycogen Replenishment Guide</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REHYDRATION_PROTOCOL.map((step, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#141824] border border-slate-800 rounded-xl space-y-1.5"
            >
              <div className="text-xs font-bold text-rose-400 uppercase">
                {step.step}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {step.action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
