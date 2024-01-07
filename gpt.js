document.addEventListener('DOMContentLoaded', function () {
    const clocks = [];
  
    // Function to create a clock element and controls for each clock
    function createClock(id) {
      const clockContainer = document.getElementById('clockContainer');
  
      const clockDiv = document.createElement('div');
      clockDiv.className = 'clock';
      clockDiv.id = `clock${id}`;
      clockDiv.textContent = '00:00:00';
  
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'controls';
      
      const startButton = document.createElement('button');
      startButton.textContent = 'Start';
      startButton.addEventListener('click', () => startClock(id));
  
      const stopButton = document.createElement('button');
      stopButton.textContent = 'Stop';
      stopButton.addEventListener('click', () => stopClock(id));
  
      const pauseButton = document.createElement('button');
      pauseButton.textContent = 'Pause';
      pauseButton.addEventListener('click', () => pauseClock(id));
  
      controlsDiv.appendChild(startButton);
      controlsDiv.appendChild(stopButton);
      controlsDiv.appendChild(pauseButton);
  
      clockContainer.appendChild(clockDiv);
      clockContainer.appendChild(controlsDiv);
  
      clocks.push({ id, time: 0, intervalId: null });
    }
  
    // Function to update the clock's time on the page
    function updateClock(clock) {
      const hours = Math.floor(clock.time / 3600);
      const minutes = Math.floor((clock.time % 3600) / 60);
      const seconds = clock.time % 60;
      const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      document.getElementById(`clock${clock.id}`).textContent = timeString;
    }
  
    // Function to start the clock
    function startClock(id) {
      const clock = clocks.find(c => c.id === id);
      if (clock) {
        clock.intervalId = setInterval(() => {
          clock.time++;
          updateClock(clock);
        }, 1000);
      }
    }
  
    // Function to stop the clock
    function stopClock(id) {
      const clock = clocks.find(c => c.id === id);
      if (clock) {
        clearInterval(clock.intervalId);
        clock.time = 0;
        updateClock(clock);
      }
    }
  
    // Function to pause the clock
    function pauseClock(id) {
      const clock = clocks.find(c => c.id === id);
      if (clock) {
        clearInterval(clock.intervalId);
      }
    }
  
    // Function to start all clocks
    function startAllClocks() {
      clocks.forEach(clock => startClock(clock.id));
    }
  
    // Function to stop all clocks
    function stopAllClocks() {
      clocks.forEach(clock => stopClock(clock.id));
    }
  
    // Create 5 clocks
    for (let i = 1; i <= 5; i++) {
      createClock(i);
    }
  
    // Set up event listeners for Start All and Stop All buttons
    document.getElementById('startAll').addEventListener('click', startAllClocks);
    document.getElementById('stopAll').addEventListener('click', stopAllClocks);
  });
  