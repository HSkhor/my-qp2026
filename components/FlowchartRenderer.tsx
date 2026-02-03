import React from 'react';
import { FlowchartStep } from '../types';
import { ArrowDown } from 'lucide-react';

interface FlowchartRendererProps {
  steps: FlowchartStep[];
}

export const FlowchartRenderer: React.FC<FlowchartRendererProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-8 font-sans">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex flex-col items-center w-full relative">
            
            {/* Shape Rendering */}
            <div className="relative z-10 group">
              
              {/* START / END NODES */}
              {(step.type === 'start' || step.type === 'end') && (
                <div className="border-2 border-black bg-white px-8 py-3 rounded-full shadow-sm text-center min-w-[150px] font-bold uppercase tracking-wider text-sm">
                  {step.label}
                </div>
              )}

              {/* PROCESS NODES */}
              {step.type === 'process' && (
                <div className="border-2 border-black bg-white px-6 py-4 text-center min-w-[200px] max-w-[300px] shadow-sm font-medium text-sm">
                  {step.label}
                </div>
              )}

              {/* DECISION NODES */}
              {step.type === 'decision' && (
                <div className="relative w-40 h-40 flex items-center justify-center my-4">
                  {/* Diamond Shape via Rotate */}
                  <div className="absolute inset-0 border-2 border-black bg-white transform rotate-45 shadow-sm"></div>
                  {/* Content (Counter-Rotated if needed, but flex center handles text) */}
                  <div className="relative z-10 text-center text-xs font-bold px-2 transform w-32">
                    {step.label}
                  </div>
                  
                  {/* Decision Branches Visuals (Static representation for linear flow) */}
                  {step.secondaryLabel && (
                    <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 italic w-20 text-left print:text-black">
                      → {step.secondaryLabel}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Connecting Arrow */}
            {!isLast && (
              <div className="h-10 w-px bg-black my-0.5 relative">
                 <ArrowDown size={16} className="absolute -bottom-2 -left-2 text-black fill-black" />
              </div>
            )}
            
          </div>
        );
      })}
    </div>
  );
};