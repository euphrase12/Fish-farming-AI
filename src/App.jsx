import React, { useState } from 'react';

function App() {
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedOption, setSelectedOption] = useState('water-dashboard');
  const [placeholderMessage, setPlaceholderMessage] = useState('');

  const handleButtonClick = () => {
    setPlaceholderMessage('Results will appear here.');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="border-b-2 border-neon-green pb-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-neon-green text-center mb-2 drop-shadow-lg">
          🐠 Fish Farming AI
        </h1>
        <p className="text-center text-slate-400 text-sm md:text-base">
          Intelligent Aquaculture Management Platform
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Farmer Registration Section */}
        <section className="bg-slate-900 bg-opacity-50 border-2 border-neon-green rounded-lg p-6 md:p-8 shadow-lg shadow-neon-green/20">
          <h2 className="text-2xl font-bold text-neon-green mb-6 flex items-center gap-2">
            <span>👨‍🌾</span>
            Farmer Registration
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm md:text-base font-semibold mb-3">
                Farmer Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-neon-green rounded-lg text-slate-100 placeholder-slate-500 transition-all focus:border-amber-accent focus:shadow-lg focus:shadow-amber-accent/30"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm md:text-base font-semibold mb-3">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter your farm location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-neon-green rounded-lg text-slate-100 placeholder-slate-500 transition-all focus:border-amber-accent focus:shadow-lg focus:shadow-amber-accent/30"
              />
            </div>

            <button
              onClick={handleButtonClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-accent to-amber-dark text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-amber-accent/50 transition-all hover:scale-105"
            >
              Authorize
            </button>
          </div>
        </section>

        {/* Dashboard Selection Section */}
        <section className="bg-slate-900 bg-opacity-50 border-2 border-neon-green rounded-lg p-6 md:p-8 shadow-lg shadow-neon-green/20">
          <h2 className="text-2xl font-bold text-neon-green mb-6 flex items-center gap-2">
            <span>📊</span>
            Dashboard Selection
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm md:text-base font-semibold mb-3">
                Choose Dashboard
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-neon-green rounded-lg text-slate-100 cursor-pointer transition-all focus:border-amber-accent focus:shadow-lg focus:shadow-amber-accent/30"
              >
                <option value="water-dashboard">Water Measurement Dashboard</option>
                <option value="ai-lessons">Proceed AI Ventures Lessons</option>
              </select>
            </div>

            <button
              onClick={handleButtonClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-neon-dark-green text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all hover:scale-105"
            >
              Start
            </button>
          </div>
        </section>

        {/* Telemetry Dashboard Section */}
        <section className="bg-slate-900 bg-opacity-50 border-2 border-neon-green rounded-lg p-6 md:p-8 shadow-lg shadow-neon-green/20">
          <h2 className="text-2xl font-bold text-neon-green mb-6 flex items-center gap-2">
            <span>🌡️</span>
            Telemetry Dashboard
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800 border-2 border-neon-green rounded-lg p-6 text-center shadow-md">
              <p className="text-slate-400 text-sm mb-3">Temperature (°C)</p>
              <p className="text-3xl font-bold text-neon-green">--</p>
            </div>

            <div className="bg-slate-800 border-2 border-neon-green rounded-lg p-6 text-center shadow-md">
              <p className="text-slate-400 text-sm mb-3">pH Level</p>
              <p className="text-3xl font-bold text-neon-green">--</p>
            </div>

            <div className="bg-slate-800 border-2 border-neon-green rounded-lg p-6 text-center shadow-md">
              <p className="text-slate-400 text-sm mb-3">Dissolved Oxygen (mg/L)</p>
              <p className="text-3xl font-bold text-neon-green">--</p>
            </div>

            <div className="bg-slate-800 border-2 border-neon-green rounded-lg p-6 text-center shadow-md">
              <p className="text-slate-400 text-sm mb-3">Fish Health Status</p>
              <p className="text-3xl font-bold text-neon-green">--</p>
            </div>
          </div>

          <button
            onClick={handleButtonClick}
            className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-neon-dark-green text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all hover:scale-105"
          >
            Connect Sensor AI
          </button>
        </section>

        {/* AI Ventures Lessons Section */}
        <section className="bg-slate-900 bg-opacity-50 border-2 border-neon-green rounded-lg p-6 md:p-8 shadow-lg shadow-neon-green/20">
          <h2 className="text-2xl font-bold text-neon-green mb-6 flex items-center gap-2">
            <span>📚</span>
            AI Ventures Lessons
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Array.from({ length: 14 }, (_, i) => i + 1).map((lessonNumber) => (
              <button
                key={lessonNumber}
                onClick={handleButtonClick}
                className="px-4 py-4 bg-slate-800 border-2 border-neon-green rounded-lg text-neon-green font-bold hover:bg-neon-green hover:bg-opacity-20 hover:shadow-lg hover:shadow-neon-green/50 transition-all hover:scale-105"
              >
                L{lessonNumber}
              </button>
            ))}
          </div>
        </section>

        {/* Placeholder Message Area */}
        {placeholderMessage && (
          <section className="bg-slate-900 bg-opacity-50 border-2 border-neon-green rounded-lg p-6 md:p-8 shadow-lg shadow-neon-green/20">
            <h2 className="text-2xl font-bold text-neon-green mb-4 flex items-center gap-2">
              <span>💬</span>
              Status
            </h2>
            <div className="bg-slate-800 border-2 border-dashed border-neon-green rounded-lg p-6 text-center text-neon-green font-semibold">
              {placeholderMessage}
            </div>
          </section>
        )}
      </div>

      {/* Footer Spacing */}
      <div className="mt-12"></div>
    </div>
  );
}

export default App;
