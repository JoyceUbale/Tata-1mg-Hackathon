import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/MainLayout';
import { useSmartHome } from '@/contexts/SmartHomeContext';
import DeviceCard from '@/components/DeviceCard';
import LightDevice from '@/components/LightDevice';
import ThermostatDevice from '@/components/ThermostatDevice';
import LockDevice from '@/components/LockDevice';
import { gsap } from 'gsap';
import { Device } from '@/lib/api';
import { useCatalystState } from '@/catalyst/hooks/useCatalystState';
import { useCatalyst } from '@/catalyst/providers/CatalystProvider';
import { withCatalyst } from '@/catalyst/HOC/withCatalyst';

import { 
  Home as HomeIcon, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  BarChart, 
  ActivitySquare 
} from 'lucide-react';

const Dashboard = () => {
  const { devices, toggleLight, toggleLock, setTemperature } = useSmartHome();
  const summaryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [dashboardState, setDashboardState] = useCatalystState({
    animationComplete: false
  }, 'dashboardState');

  const { state: catalystState, dispatch: catalystDispatch } = useCatalyst();

  const activeDevices = devices.filter(d => 
    d.status === 'on' || d.status === 'unlocked').length;

  const devicesByType = {
    lights: devices.filter(d => d.type === 'light'),
    thermostats: devices.filter(d => d.type === 'thermostat'),
    locks: devices.filter(d => d.type === 'lock'),
  };

  useEffect(() => {
    if (!summaryRef.current || !statsRef.current) return;

    const timeline = gsap.timeline();

    timeline.from(summaryRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });

    timeline.from(statsRef.current.children, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, '-=0.3');

    timeline.then(() => {
      setDashboardState((prev) => ({ ...prev, animationComplete: true }));
    });

    catalystDispatch({ type: 'SET_LOADING', payload: false });

  }, []);

  return (
    <MainLayout title="Smart Home Dashboard">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome Home</h1>
        <p className="text-xl opacity-90 mb-6">Your smart home is running efficiently today</p>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
            <div className="mr-2">⚡</div>
            <span>39.4% Energy Savings</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
            <div className="mr-2">⟳</div>
            <span>Optimizing</span>
          </div>
        </div>
      </div>
     {/* Device Stats */}
<div className="mb-12">
  <h2 className="text-3xl font-bold text-center mb-10 text-primary">Device Overview</h2>
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
      ref={statsRef}
      className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center"
    >
      {/* Lights */}
      <div className="bg-secondary/50 p-6 rounded-3xl text-center w-full max-w-sm transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-blue-100/40 dark:hover:bg-blue-900/40 group cursor-pointer">
        <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:ring-4 group-hover:ring-blue-400 dark:group-hover:ring-blue-600 transition-all duration-300">
          <Lightbulb size={28} className="text-blue-600 dark:text-blue-300" />
        </div>
        <div className="text-4xl font-extrabold text-white-700 dark:text-blue-300">{devicesByType.lights.length}</div>
        <div className="text-sm font-bold text-muted-foreground">Lights</div>
      </div>

      {/* Thermostats */}
      <div className="bg-secondary/50 p-6 rounded-3xl text-center w-full max-w-sm transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-red-100/40 dark:hover:bg-red-900/40 group cursor-pointer">
        <div className="rounded-full bg-red-100 dark:bg-red-900 w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:ring-4 group-hover:ring-red-400 dark:group-hover:ring-red-600 transition-all duration-300">
          <Thermometer size={28} className="text-red-600 dark:text-red-300" />
        </div>
        <div className="text-4xl font-extrabold text-white-700 dark:text-red-300">{devicesByType.thermostats.length}</div>
        <div className="text-sm font-bold text-muted-foreground">Thermostats</div>
      </div>

      {/* Locks */}
      <div className="bg-secondary/50 p-6 rounded-3xl text-center w-full max-w-sm transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-green-100/40 dark:hover:bg-green-900/40 group cursor-pointer">
        <div className="rounded-full bg-green-100 dark:bg-green-900 w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:ring-4 group-hover:ring-green-400 dark:group-hover:ring-green-600 transition-all duration-300">
          <Lock size={28} className="text-green-600 dark:text-green-300" />
        </div>
        <div className="text-4xl font-extrabold text--700 dark:text-green-300">{devicesByType.locks.length}</div>
        <div className="text-sm font-bold text-muted-foreground">Locks</div>
      </div>
    </div>
  </div>
</div>

      {/* Featured Devices */}
      <h2 className="text-xl font-semibold mb-4">Featured Devices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {devicesByType.thermostats.slice(0, 1).map(device => (
          <ThermostatDevice
            key={device.id}
            device={device}
            onTemperatureChange={(temp) => setTemperature(device.id, temp)}
          />
        ))}

        {devicesByType.lights.slice(0, 1).map(device => (
          <LightDevice
            key={device.id}
            device={device}
            onToggle={() => toggleLight(device.id)}
          />
        ))}

        {devicesByType.locks.slice(0, 1).map(device => (
          <LockDevice
            key={device.id}
            device={device}
            onToggle={() => toggleLock(device.id)}
          />
        ))}
      </div>
    </MainLayout>
  );
};

Dashboard.serverFetcher = () => {
  return Promise.resolve({
    initialData: {
      pageTitle: "Smart Home Dashboard"
    }
  });
};

Dashboard.clientFetcher = () => {
  return Promise.resolve({
    clientData: {
      pageUpdated: new Date().toISOString()
    }
  });
};

export default withCatalyst(Dashboard);
