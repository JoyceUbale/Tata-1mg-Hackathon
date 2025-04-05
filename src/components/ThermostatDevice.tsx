import React, { useEffect, useRef, useState } from 'react';
import { Thermometer } from 'lucide-react';
import DeviceCard from './DeviceCard';
import { Device } from '@/lib/api';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface ThermostatDeviceProps {
  device: Device;
  onTemperatureChange: (temp: number) => void;
  className?: string;
}

const ThermostatDevice = ({ device, onTemperatureChange, className }: ThermostatDeviceProps) => {
  const [temperature, setTemperature] = useState(device.temperature || 22);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      delay: Math.random() * 0.3,
    });
  }, []);

  const handleIncrease = () => {
    const newTemp = temperature + 1;
    setTemperature(newTemp);
    onTemperatureChange(newTemp);
  };

  const handleDecrease = () => {
    const newTemp = temperature - 1;
    setTemperature(newTemp);
    onTemperatureChange(newTemp);
  };

  return (
    <div
      ref={cardRef}
      className={cn("transform overflow-hidden rounded-xl", className)}
      style={{
        transition: 'transform 0.3s ease',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative overflow-hidden rounded-xl h-[280px] bg-white">
        {/* Background gradient or placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-200" />

        {/* Overlay to darken or add polish */}
        <div className="absolute inset-0 bg-white/80 dark:bg-white/90 z-0" />

        <DeviceCard
          device={device}
          onToggle={() => {}}
          className="bg-transparent border-0 shadow-none relative z-10 text-black dark:text-black"
        >
          <div className="flex flex-col items-center justify-center h-full gap-4 text-black dark:text-black">
            <Thermometer size={48} className="text-red-600 dark:text-red-600" />
            <div className="text-4xl font-bold">{temperature}°C</div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrease}
                className="text-lg px-3 py-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                –
              </button>
              <button
                onClick={handleIncrease}
                className="text-lg px-3 py-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <div className="text-base font-medium">{device.name}</div>
            <div className="text-sm text-black/70 dark:text-black/70">{device.room}</div>
          </div>
        </DeviceCard>
      </div>
    </div>
  );
};

export default ThermostatDevice;
