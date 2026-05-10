import './style.css';

// Pipeline Data Structure
const initialStages = [
  { 
    id: 'build', 
    title: 'Build', 
    status: 'pending', 
    duration: '2m 14s', 
    logs: [
      'Checking out repository...',
      'Setting up Node.js v20...',
      'Installing dependencies...',
      'Running npm run build...',
      'Generating build artifacts...'
    ]
  },
  { 
    id: 'test', 
    title: 'Unit Tests', 
    status: 'pending', 
    duration: '1m 05s', 
    logs: [
      'Running Jest test suite...',
      'PASS: src/components/Header.test.js',
      'PASS: src/utils/api.test.js',
      'All tests passed (14/14).'
    ]
  },
  { 
    id: 'security', 
    title: 'Security Scan', 
    status: 'pending', 
    duration: '45s', 
    logs: [
      'Scanning dependencies for vulnerabilities...',
      'Found 0 critical, 0 high vulnerabilities.',
      'Snyk check passed.'
    ]
  },
  { 
    id: 'deploy-staging', 
    title: 'Staging Deploy', 
    status: 'pending', 
    duration: '3m 20s', 
    logs: [
      'Pushing container image to ECR...',
      'Updating Kubernetes deployment...',
      'Waiting for rollout to complete...',
      'Staging environment is healthy.'
    ]
  },
  { 
    id: 'deploy-prod', 
    title: 'Prod Deploy', 
    status: 'pending', 
    duration: '5m 12s', 
    logs: [
      'Approval received.',
      'Canary deployment initiated...',
      'Scaling up new version...',
      'Diverting 100% traffic...',
      'Production deployment successful.'
    ]
  }
];

let stages = [...initialStages];
let isRunning = false;
let activeStageIndex = -1;

// DOM Elements
const nodesContainer = document.getElementById('nodes-container');
const svgConnections = document.getElementById('svg-connections');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');
const detailsPanel = document.getElementById('details-panel');
const panelContent = document.getElementById('panel-content');
const closePanelBtn = document.getElementById('close-panel');
const globalStatus = document.getElementById('global-status');
const globalDuration = document.getElementById('global-duration');

// Initialize
function init() {
  renderPipeline();
  setupEventListeners();
  window.addEventListener('resize', () => drawConnections());
}

function renderPipeline() {
  nodesContainer.innerHTML = '';
  stages.forEach((stage, index) => {
    const node = document.createElement('div');
    node.className = `stage-node status-${stage.status}`;
    node.id = `node-${stage.id}`;
    node.innerHTML = `
      <div class="node-header">
        <span class="node-title">${stage.title}</span>
        <div class="status-indicator"></div>
      </div>
      <div class="node-status-text">${stage.status}</div>
      ${stage.status === 'success' ? `<div class="node-duration">${stage.duration}</div>` : ''}
    `;
    node.addEventListener('click', () => showDetails(stage));
    nodesContainer.appendChild(node);
  });
  
  // Wait for DOM to update before drawing connections
  setTimeout(drawConnections, 50);
}

function drawConnections() {
  svgConnections.innerHTML = '';
  const nodes = document.querySelectorAll('.stage-node');
  
  for (let i = 0; i < nodes.length - 1; i++) {
    const startNode = nodes[i];
    const endNode = nodes[i+1];
    
    const startRect = startNode.getBoundingClientRect();
    const endRect = endNode.getBoundingClientRect();
    const canvasRect = svgConnections.getBoundingClientRect();

    const x1 = startRect.right - canvasRect.left;
    const y1 = startRect.top + startRect.height / 2 - canvasRect.top;
    const x2 = endRect.left - canvasRect.left;
    const y2 = endRect.top + endRect.height / 2 - canvasRect.top;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}`;
    
    path.setAttribute('d', d);
    path.setAttribute('class', 'connection-path');
    
    const currentStageStatus = stages[i].status;
    const nextStageStatus = stages[i+1].status;

    if (currentStageStatus === 'success') {
      path.classList.add('completed');
    }
    if (currentStageStatus === 'running' || (currentStageStatus === 'success' && nextStageStatus === 'running')) {
      path.classList.add('active');
    }

    svgConnections.appendChild(path);
  }
}

function showDetails(stage) {
  detailsPanel.classList.remove('hidden');
  panelContent.innerHTML = `
    <h3 style="color: var(--accent-primary); margin-bottom: 1rem;">${stage.title}</h3>
    <div class="logs-container">
      ${stage.logs.map(log => `
        <div class="log-line">
          <span class="timestamp">[${new Date().toLocaleTimeString()}]</span> ${log}
        </div>
      `).join('')}
      ${stage.status === 'running' ? '<div class="log-line active">_</div>' : ''}
    </div>
  `;
}

async function runPipeline() {
  if (isRunning) return;
  isRunning = true;
  runBtn.disabled = true;
  runBtn.textContent = 'Running...';
  globalStatus.textContent = 'Running';
  globalStatus.style.color = 'var(--accent-primary)';

  for (let i = 0; i < stages.length; i++) {
    activeStageIndex = i;
    stages[i].status = 'running';
    renderPipeline();
    
    // Auto-scroll/show details if panel is open or first stage
    if (!detailsPanel.classList.contains('hidden')) {
      showDetails(stages[i]);
    }

    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    stages[i].status = 'success';
    renderPipeline();
  }

  isRunning = false;
  runBtn.textContent = 'Pipeline Finished';
  globalStatus.textContent = 'Success';
  globalStatus.style.color = 'var(--accent-success)';
}

function resetPipeline() {
  if (isRunning) return;
  stages = JSON.parse(JSON.stringify(initialStages));
  activeStageIndex = -1;
  isRunning = false;
  runBtn.disabled = false;
  runBtn.textContent = 'Run Pipeline';
  globalStatus.textContent = 'Idle';
  globalStatus.style.color = 'var(--text-muted)';
  renderPipeline();
  detailsPanel.classList.add('hidden');
}

function setupEventListeners() {
  runBtn.addEventListener('click', runPipeline);
  resetBtn.addEventListener('click', resetPipeline);
  closePanelBtn.addEventListener('click', () => detailsPanel.classList.add('hidden'));
}

// Start the app
init();
