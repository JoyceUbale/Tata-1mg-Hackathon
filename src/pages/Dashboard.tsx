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

// Import icons
import { 
  Home as HomeIcon, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  BarChart, 
  ActivitySquare 
} from 'lucide-react';

// Component following Catalyst patterns
const Dashboard = () => {
  const { devices, toggleLight, toggleLock, setTemperature } = useSmartHome();
  const summaryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Use Catalyst state hook
  const [dashboardState, setDashboardState] = useCatalystState({
    animationComplete: false
  }, 'dashboardState');
  
  // Access global Catalyst state
  const { state: catalystState, dispatch: catalystDispatch } = useCatalyst();
  
  // Calculate device statistics
  const activeDevices = devices.filter(d => 
    d.status === 'on' || d.status === 'unlocked').length;
  
  const devicesByType = {
    lights: devices.filter(d => d.type === 'light'),
    thermostats: devices.filter(d => d.type === 'thermostat'),
    locks: devices.filter(d => d.type === 'lock'),
  };
  
  // Animation setup using GSAP
  useEffect(() => {
    if (!summaryRef.current || !statsRef.current) return;
    
    // Animate summary cards
    const timeline = gsap.timeline();
    
    timeline.from(summaryRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
    
    // Animate stat items
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
    
    // Track page load in Catalyst state
    catalystDispatch({ type: 'SET_LOADING', payload: false });
    
  }, []);
  
  // Render Dashboard UI
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

      {/* Status Summary */}
      {/* <div ref={summaryRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DeviceCard 
          device={{
            id: 'summary-1',
            name: 'Active Devices',
            type: 'summary',
            status: activeDevices > 0 ? 'on' : 'off',
            room: 'Home'
          }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{activeDevices}</p>
              <p className="text-sm text-muted-foreground">of {devices.length} devices</p>
            </div>
            <div className="h-16 w-16 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
              <ActivitySquare size={32} className="text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </DeviceCard>
        
        <DeviceCard 
          device={{
            id: 'summary-2',
            name: 'Energy Usage',
            type: 'summary',
            status: 'on',
            room: 'Home'
          }}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">4.3<span className="text-lg">kWh</span></p>
              <p className="text-sm text-muted-foreground">today's usage</p>
            </div>
            <div className="h-16 w-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center">
              <BarChart size={32} className="text-green-600 dark:text-green-300" />
            </div>
          </div>
        </DeviceCard>
        
        <DeviceCard 
          device={{
            id: 'summary-3',
            name: 'Home Status',
            type: 'summary',
            status: devicesByType.locks.every(lock => lock.status === 'locked') ? 'on' : 'off',
            room: 'Home'
          }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">
                {devicesByType.locks.every(lock => lock.status === 'locked') 
                  ? 'Secured' 
                  : 'Unsecured'}
              </p>
              <p className="text-sm text-muted-foreground">
                {devicesByType.locks.filter(lock => lock.status === 'locked').length} of {devicesByType.locks.length} locks active
              </p>
            </div>
            <div className="h-16 w-16 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center">
              <HomeIcon size={32} className="text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </DeviceCard>
      </div> */}
      
      {/* Device Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Device Overview</h2>
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Lightbulb size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-semibold">{devicesByType.lights.length}</div>
            <div className="text-xs text-muted-foreground">Lights</div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Thermometer size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-semibold">{devicesByType.thermostats.length}</div>
            <div className="text-xs text-muted-foreground">Thermostats</div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Lock size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-semibold">{devicesByType.locks.length}</div>
            <div className="text-xs text-muted-foreground">Locks</div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-semibold">{devices.filter(d => d.status === 'on').length}</div>
            <div className="text-xs text-muted-foreground">Devices On</div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-semibold">{devices.filter(d => d.status === 'off').length}</div>
            <div className="text-xs text-muted-foreground">Devices Off</div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-semibold">{Object.keys(devices.reduce((acc, device) => {
              acc[device.room] = true;
              return acc;
            }, {} as Record<string, boolean>)).length}</div>
            <div className="text-xs text-muted-foreground">Rooms</div>
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

// Add serverFetcher and clientFetcher following Catalyst patterns
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

// Using Catalyst HOC pattern
export default withCatalyst(Dashboard);
