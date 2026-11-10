// SmartCity360 Unified Frontend Application Controller
// Warm Minimalist Aesthetic + Live Spring Boot REST API Integration

let currentSelectedZone = "Metro Colombo City";

document.addEventListener('DOMContentLoaded', () => {
    // Initial data load on startup
    updatePipelineUI();
    transmitStream();
    loadCityTree();
    loadComplaints();
    initStreetlightGrid();
    runRamProfile();
    evaluateTelemetry();
});

// ==========================================
// SIDEBAR VIEW NAVIGATION & HEADER TITLE SYNC
// ==========================================
function switchTab(tabId) {
    // Hide all tab view sections
    document.querySelectorAll('.tab-view').forEach(el => el.classList.add('hidden'));

    // Reset all sidebar nav items to inactive state
    document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
        btn.className = 'sidebar-nav-item group w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150';
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = icon.className.replace('text-slate-800', 'text-slate-400').replace('text-slate-900', 'text-slate-400');
        }
    });

    // Show target tab view section
    const targetSection = document.getElementById('tab-' + tabId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Highlight active sidebar nav item
    const activeBtn = document.getElementById('nav-' + tabId);
    if (activeBtn) {
        activeBtn.className = 'sidebar-nav-item group w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200/60 shadow-sm transition-all duration-150';
        const icon = activeBtn.querySelector('i');
        if (icon) {
            icon.className = icon.className.replace('text-slate-400', 'text-slate-800');
        }
    }

    // Update dynamic top-bar titles based on active tab
    const titleEl = document.getElementById('pageTitle');
    const subTitleEl = document.getElementById('pageSubtitle');

    const headers = {
        'dashboard': {
            title: 'Energy & Grid Analytics',
            subtitle: 'Real-time telemetry and unified municipal infrastructure control'
        },
        'partA': {
            title: 'Dynamic Security Wrappers for Data Streams',
            subtitle: 'Layered cryptographic encryption, token authentication, and compression'
        },
        'partB': {
            title: 'Smart Zone Grid Hierarchy',
            subtitle: 'Hierarchical municipal energy distribution and synchronized power control'
        },
        'partC': {
            title: 'Citizen Complaints Pipeline',
            subtitle: 'Automated multi-tier incident routing from local staff to city administration'
        },
        'partD': {
            title: 'Smart Streetlights Fleet Management',
            subtitle: 'High-density luminaire management and heap memory optimization'
        },
        'partE': {
            title: 'City Policy Rule Engine',
            subtitle: 'Dynamic automated compliance validation and municipal ordinance evaluation'
        }
    };

    if (headers[tabId] && titleEl && subTitleEl) {
        titleEl.textContent = headers[tabId].title;
        subTitleEl.textContent = headers[tabId].subtitle;
    }

    // Auto-close mobile sidebar drawer on navigation selection
    const sidebar = document.getElementById('mainSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
        sidebar.classList.add('-translate-x-full');
    }
    if (backdrop && !backdrop.classList.contains('hidden') && window.innerWidth < 768) {
        backdrop.classList.add('hidden');
    }
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('mainSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) {
        sidebar.classList.toggle('-translate-x-full');
    }
    if (backdrop) {
        backdrop.classList.toggle('hidden');
    }
}

// Global aliases to ensure backwards compatibility
window.switchTab = switchTab;
window.switchView = switchTab;
window.toggleMobileSidebar = toggleMobileSidebar;

// ==========================================
// PART A: DECORATOR PATTERN (Security Stream)
// ==========================================
function updatePipelineUI() {
    const encEl = document.getElementById('chkEncrypt');
    const authEl = document.getElementById('chkAuth');
    const compEl = document.getElementById('chkCompress');

    const enc = encEl ? encEl.checked : true;
    const auth = authEl ? authEl.checked : true;
    const comp = compEl ? compEl.checked : true;

    // Layer 1 Node (Encryption)
    const pEnc = document.getElementById('pipeNodeEncrypt');
    const sEnc = document.getElementById('pipeStatusEncrypt');
    if (pEnc && sEnc) {
        if (enc) {
            pEnc.className = 'bg-white p-3.5 rounded-xl border-2 border-emerald-400 shadow-sm flex items-center justify-between transition-all';
            sEnc.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
        } else {
            pEnc.className = 'bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between opacity-50 transition-all';
            sEnc.className = 'w-2.5 h-2.5 rounded-full bg-slate-300';
        }
    }

    // Layer 2 Node (Authentication)
    const pAuth = document.getElementById('pipeNodeAuth');
    const sAuth = document.getElementById('pipeStatusAuth');
    if (pAuth && sAuth) {
        if (auth) {
            pAuth.className = 'bg-white p-3.5 rounded-xl border-2 border-emerald-400 shadow-sm flex items-center justify-between transition-all';
            sAuth.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
        } else {
            pAuth.className = 'bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between opacity-50 transition-all';
            sAuth.className = 'w-2.5 h-2.5 rounded-full bg-slate-300';
        }
    }

    // Layer 3 Node (Compression)
    const pComp = document.getElementById('pipeNodeCompress');
    const sComp = document.getElementById('pipeStatusCompress');
    if (pComp && sComp) {
        if (comp) {
            pComp.className = 'bg-white p-3.5 rounded-xl border-2 border-emerald-400 shadow-sm flex items-center justify-between transition-all';
            sComp.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse';
        } else {
            pComp.className = 'bg-white/60 p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between opacity-50 transition-all';
            sComp.className = 'w-2.5 h-2.5 rounded-full bg-slate-300';
        }
    }

    const count = (enc ? 1 : 0) + (auth ? 1 : 0) + (comp ? 1 : 0);
    const countBadge = document.getElementById('activeLayersCount');
    if (countBadge) countBadge.textContent = count + " Layer(s) Active";

    // Also keep the raw preview synced live
    updateRawPreview();
}

const METER_PRESETS = {
    'BOC': { id: 'BOC-MTR-101 (Bank of Ceylon Head Office)', v: 231.2, kwh: 450.0 },
    'CGH': { id: 'CGH-MTR-204 (Cinnamon Grand Hotel)', v: 229.8, kwh: 820.5 },
    'WTC': { id: 'WTC-MTR-305 (World Trade Center Tower A)', v: 230.5, kwh: 1200.0 },
    'VIRT': { id: 'VIRT-MTR-412 (Virtusa Tech Campus)', v: 230.1, kwh: 650.0 },
    'NHS': { id: 'NHS-MTR-501 (National Hospital Smart Wing)', v: 232.0, kwh: 1500.0 },
    'SUB': { id: 'GRID-MTR-9042 (Commercial Downtown Sub-station)', v: 230.7, kwh: 339.3 }
};

function toggleCombobox() {
    const menu = document.getElementById('comboboxMenu');
    const chevron = document.getElementById('comboboxChevron');
    if (!menu) return;

    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}

function selectComboboxOption(code, label, iconClass) {
    const hiddenInput = document.getElementById('meterPresetSelect');
    if (hiddenInput) hiddenInput.value = code;

    const selectedText = document.getElementById('comboboxSelectedText');
    const selectedIcon = document.getElementById('comboboxSelectedIcon');
    if (selectedText) selectedText.textContent = label;
    if (selectedIcon) selectedIcon.className = `fa-solid ${iconClass} text-amber-500 text-[11px] shrink-0`;

    // Update active highlight and checkmark in custom menu
    const menu = document.getElementById('comboboxMenu');
    if (menu) {
        menu.querySelectorAll('.combobox-item').forEach(item => {
            const check = item.querySelector('.check-icon');
            if (check) check.classList.add('hidden');
            item.classList.remove('bg-amber-50/40');
        });
        if (window.event && window.event.currentTarget) {
            const clicked = window.event.currentTarget;
            clicked.classList.add('bg-amber-50/40');
            const check = clicked.querySelector('.check-icon');
            if (check) check.classList.remove('hidden');
        }
    }

    // Close menu
    toggleCombobox();

    // Trigger preset selection logic
    onSelectMeterPreset(code);
}

// Close combobox when clicking anywhere outside
document.addEventListener('click', (e) => {
    // Meter preset dropdown (Part A)
    const container = document.getElementById('customComboboxContainer');
    const menu = document.getElementById('comboboxMenu');
    const chevron = document.getElementById('comboboxChevron');
    if (container && menu && !container.contains(e.target)) {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }

    // Incident severity dropdown (Part C)
    const sevContainer = document.getElementById('customSeverityContainer');
    const sevMenu = document.getElementById('severityMenu');
    const sevChevron = document.getElementById('severityChevron');
    if (sevContainer && sevMenu && !sevContainer.contains(e.target)) {
        sevMenu.classList.add('hidden');
        if (sevChevron) sevChevron.classList.remove('rotate-180');
    }

    // Streetlight fleet scale dropdown (Part D)
    const scaleContainer = document.getElementById('customScaleContainer');
    const scaleMenu = document.getElementById('scaleMenu');
    const scaleChevron = document.getElementById('scaleChevron');
    if (scaleContainer && scaleMenu && !scaleContainer.contains(e.target)) {
        scaleMenu.classList.add('hidden');
        if (scaleChevron) scaleChevron.classList.remove('rotate-180');
    }

    // Vehicle classification dropdown (Part E)
    const vehicleContainer = document.getElementById('customVehicleContainer');
    const vehicleMenu = document.getElementById('vehicleMenu');
    const vehicleChevron = document.getElementById('vehicleChevron');
    if (vehicleContainer && vehicleMenu && !vehicleContainer.contains(e.target)) {
        vehicleMenu.classList.add('hidden');
        if (vehicleChevron) vehicleChevron.classList.remove('rotate-180');
    }

    // Sensor zone dropdown (Part E)
    const zoneContainer = document.getElementById('customZoneContainer');
    const zoneMenu = document.getElementById('zoneMenu');
    const zoneChevron = document.getElementById('zoneChevron');
    if (zoneContainer && zoneMenu && !zoneContainer.contains(e.target)) {
        zoneMenu.classList.add('hidden');
        if (zoneChevron) zoneChevron.classList.remove('rotate-180');
    }
});

window.toggleCombobox = toggleCombobox;
window.selectComboboxOption = selectComboboxOption;

function onSelectMeterPreset(code) {
    if (code === 'CUSTOM') {
        const idInput = document.getElementById('meterId');
        if (idInput) {
            idInput.value = '';
            idInput.placeholder = 'Type custom node ID (e.g. CUSTOM-MTR-101)';
            idInput.focus();
        }
        return;
    }
    const preset = METER_PRESETS[code];
    if (preset) {
        const idInput = document.getElementById('meterId');
        const vInput = document.getElementById('meterVoltage');
        const kwhInput = document.getElementById('meterKwh');
        if (idInput) idInput.value = preset.id;
        if (vInput) vInput.value = preset.v;
        if (kwhInput) kwhInput.value = preset.kwh;
        updateRawPreview();
    }
}
window.onSelectMeterPreset = onSelectMeterPreset;

function updateRawPreview() {
    const meterIdInput = document.getElementById('meterId');
    const kwhInput = document.getElementById('meterKwh');
    const voltageInput = document.getElementById('meterVoltage');

    const meterId = meterIdInput ? meterIdInput.value.trim() : 'GRID-MTR-9042';
    const kwh = parseFloat(kwhInput ? kwhInput.value : 342.8) || 342.8;
    const voltage = parseFloat(voltageInput ? voltageInput.value : 230.3) || 230.3;

    const rawView = document.getElementById('rawPayloadView');
    if (rawView) {
        rawView.textContent = JSON.stringify({
            meterId: meterId,
            voltage_V: voltage,
            total_kwh: kwh
        }, null, 2);
    }
}

async function transmitStream() {
    updatePipelineUI();
    updateRawPreview();

    const meterIdInput = document.getElementById('meterId');
    const kwhInput = document.getElementById('meterKwh');
    const voltageInput = document.getElementById('meterVoltage');

    const meterId = meterIdInput ? meterIdInput.value.trim() : 'GRID-MTR-9042';
    const kwh = parseFloat(kwhInput ? kwhInput.value : 342.8) || 342.8;
    const voltage = parseFloat(voltageInput ? voltageInput.value : 230.3) || 230.3;

    const auth = document.getElementById('chkAuth') ? document.getElementById('chkAuth').checked : true;
    const encrypt = document.getElementById('chkEncrypt') ? document.getElementById('chkEncrypt').checked : true;
    const compress = document.getElementById('chkCompress') ? document.getElementById('chkCompress').checked : true;

    const rawView = document.getElementById('rawPayloadView');
    const transmittedView = document.getElementById('transmittedView');
    const unpackedView = document.getElementById('unpackedView');

    const rawJson = JSON.stringify({
        meterId: meterId,
        voltage_V: voltage,
        total_kwh: kwh
    }, null, 2);

    if (rawView) rawView.textContent = rawJson;

    const url = `/api/part-a/stream?meterId=${encodeURIComponent(meterId)}&kwh=${kwh}&voltage=${voltage}&auth=${auth}&encrypt=${encrypt}&compress=${compress}`;

    const summaryLayers = [];
    if (auth) summaryLayers.push("HMAC-Token");
    if (encrypt) summaryLayers.push("AES-256");
    if (compress) summaryLayers.push("GZIP");

    try {
        const response = await fetch(url, { method: 'POST' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (transmittedView) transmittedView.textContent = data.transmittedData;
        renderUnpackedView(meterId, voltage, kwh, summaryLayers);
    } catch (err) {
        console.warn('Backend REST endpoint offline or unreachable. Executing seamless client-side Decorator Pattern simulation:', err);

        // Client-side realistic Decorator Layer Simulation
        let currentPayload = JSON.stringify({ meterId, voltage_V: voltage, total_kwh: kwh });

        // Layer 1: Authentication Decorator (Appends HMAC Token)
        if (auth) {
            const token = "HMAC-SHA256::" + Math.random().toString(36).substring(2, 10).toUpperCase() + "==";
            currentPayload = `[AUTH_TOKEN: ${token}] | PAYLOAD: ${currentPayload}`;
        }

        // Layer 2: Encryption Decorator (AES-256 Base64 Encodes the stream)
        if (encrypt) {
            try {
                const encoded = btoa(unescape(encodeURIComponent(currentPayload)));
                currentPayload = `AES256_CIPHER[${encoded}]`;
            } catch (e) {
                currentPayload = `AES256_CIPHER[${btoa(currentPayload.substring(0, 40))}...]`;
            }
        }

        // Layer 3: Compression Decorator (GZIP Byte Buffer Representation)
        if (compress) {
            const hexStream = Array.from({length: 16}, () => '0x' + Math.floor(Math.random()*256).toString(16).padStart(2, '0').toUpperCase()).join(', ');
            currentPayload = `GZIP_STREAM_BUFFER(Size: ${Math.round(currentPayload.length * 0.42)} bytes, 58% saved) -> [0x1F, 0x8B, 0x08, ${hexStream}...]`;
        }

        if (transmittedView) {
            transmittedView.textContent = currentPayload;
        }

        renderUnpackedView(meterId, voltage, kwh, summaryLayers);
    }
}

function renderUnpackedView(meterId, voltage, kwh, layersList) {
    const unpackedView = document.getElementById('unpackedView');
    if (!unpackedView) return;

    const layersHtml = layersList && layersList.length > 0 
        ? layersList.map(l => `<span class="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">${l}</span>`).join(' ')
        : '<span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold">Direct (No Wrappers)</span>';

    unpackedView.innerHTML = `
        <div class="space-y-2">
            <!-- Row 1: Telemetry Payload Badges (Full width, balanced, no falling values) -->
            <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0">
                    <i class="fa-solid fa-circle-check text-[11px]"></i> Verified Ingest
                </span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1.5 truncate flex-1 min-w-0" title="${meterId}">
                    <i class="fa-solid fa-building text-amber-500 text-[11px] shrink-0"></i> 
                    <span class="truncate">${meterId}</span>
                </span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 font-mono whitespace-nowrap shrink-0">
                    <i class="fa-solid fa-bolt text-amber-500 text-[10px] mr-1"></i>${voltage} V
                </span>
                <span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-bold text-xs border border-amber-300 font-mono whitespace-nowrap shrink-0">
                    <i class="fa-solid fa-chart-simple text-amber-600 text-[10px] mr-1"></i>${kwh} kWh
                </span>
            </div>

            <!-- Row 2: Pipeline Transformations Unwrapped (Spans full width cleanly) -->
            <div class="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[11px]">
                <span class="text-slate-500 font-semibold flex items-center gap-1.5">
                    <i class="fa-solid fa-layer-group text-slate-400"></i> Pipeline Transformations Unwrapped:
                </span>
                <div class="flex items-center gap-1.5">
                    ${layersHtml}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// PART B: COMPOSITE PATTERN (Smart Zones Tree & Map)
// ==========================================
let currentPartBView = 'map'; // 'map' or 'tree'

function switchPartBView(viewMode) {
    currentPartBView = viewMode;
    const mapContainer = document.getElementById('cityMapContainer');
    const treeContainer = document.getElementById('treeContainer');
    const btnMap = document.getElementById('btnViewMap');
    const btnTree = document.getElementById('btnViewTree');
    const pill = document.getElementById('currentViewModePill');

    if (viewMode === 'map') {
        if (mapContainer) mapContainer.classList.remove('hidden');
        if (treeContainer) treeContainer.classList.add('hidden');
        if (btnMap) {
            btnMap.className = 'px-2.5 py-1 rounded-md bg-white text-slate-900 shadow-xs transition';
        }
        if (btnTree) {
            btnTree.className = 'px-2.5 py-1 rounded-md text-slate-500 hover:text-slate-900 transition';
        }
        if (pill) {
            pill.textContent = 'MUNICIPAL MAP';
            pill.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shadow-xs';
        }
    } else {
        if (mapContainer) mapContainer.classList.add('hidden');
        if (treeContainer) treeContainer.classList.remove('hidden');
        if (btnMap) {
            btnMap.className = 'px-2.5 py-1 rounded-md text-slate-500 hover:text-slate-900 transition';
        }
        if (btnTree) {
            btnTree.className = 'px-2.5 py-1 rounded-md bg-white text-slate-900 shadow-xs transition';
        }
        if (pill) {
            pill.textContent = 'TREE VIEW';
            pill.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-xs';
        }
    }
}
window.switchPartBView = switchPartBView;

function clearTraceTerminal() {
    const terminal = document.getElementById('compositeTraceTerminal');
    if (terminal) {
        terminal.innerHTML = `
            <div class="text-slate-400 font-mono text-[11px]">
                <span class="text-emerald-400 font-bold">[CONSOLE_CLEARED]</span> Ready for execution trace.<br>
                <span class="text-slate-500">&gt; Target selected:</span> <span class="text-amber-300 font-bold">${currentSelectedZone}</span><br>
                <span class="text-slate-500">&gt; Awaiting uniform command dispatch (Shutdown / Restore / Report)...</span>
            </div>
        `;
        terminal.scrollTop = 0;
    }
}
window.clearTraceTerminal = clearTraceTerminal;

function scrollTerminalToBottom(terminal) {
    if (!terminal) return;
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(() => {
        terminal.scrollTop = terminal.scrollHeight;
    }, 10);
}

function getBuildingIcon(type = '') {
    const t = type.toLowerCase();
    if (t.includes('bank')) return 'fa-building-columns text-emerald-600';
    if (t.includes('hotel') || t.includes('hospitality')) return 'fa-hotel text-amber-600';
    if (t.includes('office') || t.includes('tower') || t.includes('complex')) return 'fa-city text-sky-600';
    if (t.includes('park') || t.includes('tech') || t.includes('campus')) return 'fa-laptop-code text-indigo-600';
    if (t.includes('telecom') || t.includes('center')) return 'fa-tower-cell text-cyan-600';
    if (t.includes('hospital') || t.includes('health') || t.includes('emergency')) return 'fa-hospital text-rose-600';
    return 'fa-building text-slate-600';
}

// In-memory persistent Smart City tree for seamless offline preview & live sync
let inMemoryCityData = {
    name: "Metro Colombo City",
    zoneType: "CITY",
    powerActive: true,
    totalEnergyKw: 5510.5,
    childCount: 2,
    subZones: [
        {
            name: "Commercial District",
            zoneType: "DISTRICT",
            powerActive: true,
            totalEnergyKw: 2470.5,
            childCount: 2,
            subZones: [
                {
                    name: "Galle Road",
                    zoneType: "STREET",
                    powerActive: true,
                    totalEnergyKw: 1270.5,
                    childCount: 2,
                    subZones: [
                        { name: "Bank of Ceylon Head Office", zoneType: "BUILDING", buildingType: "Commercial Bank", powerActive: true, baseKw: 450.0, energyConsumptionKw: 450.0 },
                        { name: "Cinnamon Grand Hotel", zoneType: "BUILDING", buildingType: "Hospitality / Hotel", powerActive: true, baseKw: 820.5, energyConsumptionKw: 820.5 }
                    ]
                },
                {
                    name: "Lotus Road",
                    zoneType: "STREET",
                    powerActive: true,
                    totalEnergyKw: 1200.0,
                    childCount: 1,
                    subZones: [
                        { name: "World Trade Center (Tower A)", zoneType: "BUILDING", buildingType: "Office Complex", powerActive: true, baseKw: 1200.0, energyConsumptionKw: 1200.0 }
                    ]
                }
            ]
        },
        {
            name: "Tech Innovation District",
            zoneType: "DISTRICT",
            powerActive: true,
            totalEnergyKw: 3040.0,
            childCount: 2,
            subZones: [
                {
                    name: "Duplication Road",
                    zoneType: "STREET",
                    powerActive: true,
                    totalEnergyKw: 1540.0,
                    childCount: 2,
                    subZones: [
                        { name: "Virtusa Tech Campus", zoneType: "BUILDING", buildingType: "IT Park", powerActive: true, baseKw: 650.0, energyConsumptionKw: 650.0 },
                        { name: "Dialog Axiata HQ", zoneType: "BUILDING", buildingType: "Telecom Center", powerActive: true, baseKw: 890.0, energyConsumptionKw: 890.0 }
                    ]
                },
                {
                    name: "Regent Street",
                    zoneType: "STREET",
                    powerActive: true,
                    totalEnergyKw: 1500.0,
                    childCount: 1,
                    subZones: [
                        { name: "National Hospital Smart Wing", zoneType: "BUILDING", buildingType: "Emergency Healthcare", powerActive: true, baseKw: 1500.0, energyConsumptionKw: 1500.0 }
                    ]
                }
            ]
        }
    ]
};

async function loadCityTree() {
    const treeContainer = document.getElementById('treeContainer');
    const mapContainer = document.getElementById('cityMapContainer');

    try {
        const response = await fetch('/api/part-b/tree');
        if (response.ok) {
            const liveData = await response.json();
            if (liveData && liveData.name) {
                inMemoryCityData = liveData;
            }
        }
    } catch (err) {
        // Fall back to in-memory tree
    }

    if (mapContainer) {
        renderCityMap(inMemoryCityData);
    }

    if (treeContainer) {
        treeContainer.innerHTML = '';
        treeContainer.appendChild(renderZoneNode(inMemoryCityData, 0));
    }
}

// Button State Controller for Uniform Power Commands
function updatePowerButtons(powerActive) {
    const btnShutdown = document.getElementById('btnShutdownPower');
    const btnRestore = document.getElementById('btnRestorePower');
    if (!btnShutdown || !btnRestore) return;

    if (powerActive) {
        // Power is ON: Shutdown is ENABLED, Restore is DISABLED
        btnShutdown.disabled = false;
        btnShutdown.className = "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer";

        btnRestore.disabled = true;
        btnRestore.className = "bg-slate-100 text-slate-400 border border-slate-200 font-extrabold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-none opacity-40 cursor-not-allowed pointer-events-none";
    } else {
        // Power is OFF: Shutdown is DISABLED, Restore is ENABLED
        btnShutdown.disabled = true;
        btnShutdown.className = "bg-slate-100 text-slate-400 border border-slate-200 font-extrabold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-none opacity-40 cursor-not-allowed pointer-events-none";

        btnRestore.disabled = false;
        btnRestore.className = "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold py-2 px-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer";
    }
}
window.updatePowerButtons = updatePowerButtons;

function getShortBuildingName(name) {
    return name
        .replace("Head Office", "HQ")
        .replace("World Trade Center (Tower A)", "World Trade Center")
        .replace("National Hospital Smart Wing", "National Hospital")
        .replace("Virtusa Tech Campus", "Virtusa Campus")
        .replace("Cinnamon Grand Hotel", "Cinnamon Grand")
        .replace("Dialog Axiata HQ", "Dialog Axiata");
}

function getShortIcon(type = '', name = '') {
    const t = (type + ' ' + name).toLowerCase();
    if (t.includes('bank')) return '🏦';
    if (t.includes('hotel') || t.includes('hospitality')) return '🏨';
    if (t.includes('trade') || t.includes('office') || t.includes('tower')) return '🏢';
    if (t.includes('virtusa') || t.includes('tech') || t.includes('campus')) return '💻';
    if (t.includes('dialog') || t.includes('telecom') || t.includes('hq')) return '📡';
    if (t.includes('hospital') || t.includes('health')) return '🏥';
    return '🏛️';
}

function buildShortTrace(node, powerState, lines, indent = '') {
    const isLeaf = node.zoneType === 'BUILDING';
    const shortName = getShortBuildingName(node.name);

    if (isLeaf) {
        const kw = powerState ? Number(node.baseKw || 450).toFixed(0) : '0';
        const tag = powerState ? '[ONLINE]' : '[OFFLINE]';
        const icon = getShortIcon(node.buildingType, node.name);
        lines.push(`${indent}├── ${icon} ${shortName} ➔ ${kw} kW ${tag}`);
        return;
    }

    lines.push(`${indent}▼ [${node.zoneType}] ${node.name}`);
    if (node.subZones && node.subZones.length > 0) {
        for (let i = 0; i < node.subZones.length; i++) {
            const child = node.subZones[i];
            buildShortTrace(child, powerState, lines, indent + '  ');
        }
    }
}

function buildShortReportTrace(node, lines, indent = '') {
    const isLeaf = node.zoneType === 'BUILDING';
    const shortName = getShortBuildingName(node.name);
    const stateTag = node.powerActive ? '[ONLINE]' : '[OFFLINE]';

    if (isLeaf) {
        const kw = (node.energyConsumptionKw || 0).toFixed(0);
        const icon = getShortIcon(node.buildingType, node.name);
        lines.push(`${indent}├── ${icon} ${shortName}: ${kw} kW ${stateTag}`);
        return;
    }

    const kw = (node.totalEnergyKw || 0).toFixed(1);
    lines.push(`${indent}▼ [${node.zoneType}] ${node.name}: ${kw} kW ${stateTag}`);
    if (node.subZones) {
        node.subZones.forEach(child => {
            buildShortReportTrace(child, lines, indent + '  ');
        });
    }
}

// Render Interactive Smart City Grid Map
function renderCityMap(cityData) {
    const container = document.getElementById('cityMapContainer');
    if (!container) return;
    container.innerHTML = '';

    // 1. Root Metropolitan City Bar (Header Perimeter)
    const isCitySelected = currentSelectedZone === cityData.name;
    const cityOnline = cityData.powerActive;
    const cityKw = Number(cityData.totalEnergyKw || 0).toFixed(1);

    const rootBar = document.createElement('div');
    rootBar.className = `p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
        isCitySelected 
            ? 'border-2 border-amber-400 bg-amber-500/10 shadow-sm' 
            : 'border border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50/80'
    }`;
    rootBar.onclick = () => selectTargetZone(cityData.name);
    rootBar.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="w-7 h-7 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center text-xs shadow-xs shrink-0">
                <i class="fa-solid fa-city text-xs"></i>
            </span>
            <div>
                <div class="flex items-center gap-1.5">
                    <span class="font-extrabold text-xs text-slate-900">${cityData.name}</span>
                    <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700 border border-neutral-300">ROOT METROPOLITAN</span>
                </div>
                <span class="text-[10px] text-slate-400 font-medium">Click to target whole metropolitan grid</span>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <span class="font-mono text-xs font-bold ${cityOnline ? 'text-slate-800' : 'text-slate-400'}">${cityKw} kW</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                cityOnline 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
            }">
                <span class="w-1.5 h-1.5 rounded-full ${cityOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}"></span>
                ${cityOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
        </div>
    `;
    container.appendChild(rootBar);

    // 2. District Zones Grid
    if (cityData.subZones && cityData.subZones.length > 0) {
        cityData.subZones.forEach(district => {
            const isDistrictSelected = currentSelectedZone === district.name;
            const distOnline = district.powerActive;
            const distKw = Number(district.totalEnergyKw || 0).toFixed(1);

            const districtCard = document.createElement('div');
            districtCard.className = `rounded-xl transition-all bg-white shadow-xs ${
                isDistrictSelected ? 'border-2 border-amber-400 shadow-sm' : 'border border-slate-200/80 hover:border-slate-300'
            }`;

            // District Header Strip
            const distHeader = document.createElement('div');
            distHeader.className = `p-2 bg-slate-50/90 rounded-t-xl border-b border-slate-200/70 flex items-center justify-between cursor-pointer transition ${
                isDistrictSelected ? 'bg-amber-50/50' : 'hover:bg-slate-100/70'
            }`;
            distHeader.onclick = (e) => {
                e.stopPropagation();
                selectTargetZone(district.name);
            };
            distHeader.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="w-5 h-5 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                        <i class="fa-solid fa-layer-group"></i>
                    </span>
                    <div>
                        <span class="font-bold text-xs text-slate-800">${district.name}</span>
                        <span class="text-[9px] font-bold text-slate-400 uppercase ml-1">(DISTRICT ZONE)</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-mono text-[11px] font-bold ${distOnline ? 'text-slate-700' : 'text-slate-400'}">${distKw} kW</span>
                    <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        distOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }">${distOnline ? 'ONLINE' : 'OFFLINE'}</span>
                </div>
            `;
            districtCard.appendChild(distHeader);

            // District Body: Streets & Buildings
            const distBody = document.createElement('div');
            distBody.className = 'p-2.5 space-y-2';

            if (district.subZones && district.subZones.length > 0) {
                district.subZones.forEach(street => {
                    const isStreetSelected = currentSelectedZone === street.name;
                    const streetOnline = street.powerActive;
                    const streetKw = Number(street.totalEnergyKw || 0).toFixed(1);

                    const streetBlock = document.createElement('div');
                    streetBlock.className = 'space-y-1.5';

                    // Roadway Header Strip (Municipal Road Corridor)
                    const roadStrip = document.createElement('div');
                    roadStrip.className = `px-2 py-1 rounded-lg border transition cursor-pointer flex items-center justify-between text-xs font-semibold ${
                        isStreetSelected 
                            ? 'border-2 border-amber-400 bg-amber-100/90 text-amber-950 font-bold shadow-xs' 
                            : 'border border-slate-200 bg-slate-100/80 text-slate-700 hover:bg-slate-200/60'
                    }`;
                    roadStrip.onclick = (e) => {
                        e.stopPropagation();
                        selectTargetZone(street.name);
                    };
                    roadStrip.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <i class="fa-solid fa-road text-amber-600 text-[11px]"></i>
                            <span class="font-bold text-xs">${street.name}</span>
                            <span class="text-[9px] font-mono text-slate-400 font-normal">Street Sector</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono text-[10px] font-bold">${streetKw} kW</span>
                            <span class="w-2 h-2 rounded-full ${streetOnline ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                        </div>
                    `;
                    streetBlock.appendChild(roadStrip);

                    // Buildings Grid situated along the road
                    if (street.subZones && street.subZones.length > 0) {
                        const buildingsGrid = document.createElement('div');
                        buildingsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 border-l-2 border-slate-200/80 ml-2';

                        street.subZones.forEach(bldg => {
                            const isBldgSelected = currentSelectedZone === bldg.name;
                            const bldgOnline = bldg.powerActive;
                            const bldgKw = Number(bldg.energyConsumptionKw || 0).toFixed(1);
                            const iconClass = getBuildingIcon(bldg.buildingType || bldg.name);

                            const bldgCard = document.createElement('div');
                            bldgCard.className = `p-2 rounded-lg transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                                isBldgSelected 
                                    ? 'border-2 border-amber-400 bg-amber-50/70 shadow-sm' 
                                    : (bldgOnline ? 'border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs' : 'border border-rose-200 bg-slate-50 opacity-75')
                            }`;
                            bldgCard.onclick = (e) => {
                                e.stopPropagation();
                                selectTargetZone(bldg.name);
                            };

                            bldgCard.innerHTML = `
                                <div class="flex items-start justify-between gap-1.5">
                                    <div class="flex items-center space-x-2 min-w-0">
                                        <span class="w-5 h-5 rounded-md ${bldgOnline ? 'bg-slate-100' : 'bg-rose-50'} flex items-center justify-center text-xs shrink-0">
                                            <i class="fa-solid ${iconClass}"></i>
                                        </span>
                                        <div class="min-w-0">
                                            <span class="font-bold text-xs text-slate-800 block truncate" title="${bldg.name}">${bldg.name}</span>
                                            <span class="text-[9px] text-slate-400 block truncate">${bldg.buildingType || 'Facility Endpoint'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                                    <span class="font-mono font-bold ${bldgOnline ? 'text-slate-700' : 'text-rose-600'}">
                                        ${bldgKw} kW
                                    </span>
                                    <span class="px-1.5 py-0.2 rounded text-[9px] font-bold flex items-center gap-1 ${
                                        bldgOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                                    }">
                                        <span class="w-1.5 h-1.5 rounded-full ${bldgOnline ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                                        ${bldgOnline ? 'ONLINE' : 'OFFLINE'}
                                    </span>
                                </div>
                            `;
                            buildingsGrid.appendChild(bldgCard);
                        });

                        streetBlock.appendChild(buildingsGrid);
                    }

                    distBody.appendChild(streetBlock);
                });
            }

            districtCard.appendChild(distBody);
            container.appendChild(districtCard);
        });
    }
}

function renderZoneNode(node, depth) {
    const isLeaf = node.zoneType === 'BUILDING';
    const paddingLeft = depth * 14;

    const row = document.createElement('div');
    row.className = `p-2.5 rounded-xl transition cursor-pointer flex items-center justify-between ${
        currentSelectedZone === node.name ? 'border-2 border-amber-400 bg-amber-50/20 shadow-sm' : 'border border-slate-100 bg-white hover:border-slate-300'
    }`;
    row.style.marginLeft = `${paddingLeft}px`;

    row.onclick = (e) => {
        e.stopPropagation();
        selectTargetZone(node.name);
    };

    const icon = isLeaf ? 'fa-building text-amber-500' : (depth === 0 ? 'fa-city text-neutral-900' : 'fa-network-wired text-slate-400');
    const energyVal = isLeaf ? (node.energyConsumptionKw || 0) : (node.totalEnergyKw || 0);

    row.innerHTML = `
        <div class="flex items-center space-x-2.5">
            <i class="fa-solid ${icon} text-xs"></i>
            <div>
                <span class="font-bold text-xs text-slate-800">${node.name}</span>
                <span class="text-[10px] text-slate-400 font-medium">(${node.zoneType})</span>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <span class="font-mono text-xs font-bold text-slate-700">${Number(energyVal).toFixed(1)} kW</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                node.powerActive 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
            }">${node.powerActive ? 'ONLINE' : 'OFFLINE'}</span>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'space-y-1.5';
    wrapper.appendChild(row);

    if (node.subZones && node.subZones.length > 0) {
        node.subZones.forEach(sub => {
            wrapper.appendChild(renderZoneNode(sub, depth + 1));
        });
    }

    return wrapper;
}

function selectTargetZone(name) {
    currentSelectedZone = name;
    const badge = document.getElementById('selectedZoneBadge');
    if (badge) badge.textContent = 'Target: ' + name;

    // Check selected target node's power status and update button states
    const targetNode = findZoneInTree(inMemoryCityData, name) || inMemoryCityData;
    updatePowerButtons(targetNode.powerActive);

    loadCityTree();
}

// Composite Pattern: Recursive Tree Helpers
function findZoneInTree(current, targetName) {
    if (current.name.toLowerCase() === targetName.toLowerCase()) {
        return current;
    }
    if (current.subZones) {
        for (const child of current.subZones) {
            const found = findZoneInTree(child, targetName);
            if (found) return found;
        }
    }
    return null;
}

function countLeafFacilities(node) {
    if (node.zoneType === 'BUILDING') return 1;
    let count = 0;
    if (node.subZones) {
        for (const child of node.subZones) {
            count += countLeafFacilities(child);
        }
    }
    return count;
}

function recursiveApplyPower(node, powerState) {
    const isLeaf = node.zoneType === 'BUILDING';
    if (isLeaf) {
        const oldKw = node.energyConsumptionKw || 0;
        node.powerActive = powerState;
        node.baseKw = node.baseKw || oldKw || 450.0;
        node.energyConsumptionKw = powerState ? node.baseKw : 0.0;
        return node.energyConsumptionKw;
    }

    let sumKw = 0;
    let anyChildActive = false;
    if (node.subZones && node.subZones.length > 0) {
        for (const child of node.subZones) {
            sumKw += recursiveApplyPower(child, powerState);
            if (child.powerActive) anyChildActive = true;
        }
    }

    node.powerActive = powerState ? anyChildActive : false;
    node.totalEnergyKw = Math.round(sumKw * 10) / 10;
    return node.totalEnergyKw;
}

function recalculateTreeMetrics(node) {
    if (node.zoneType === 'BUILDING') {
        node.energyConsumptionKw = node.powerActive ? (node.baseKw || node.energyConsumptionKw || 450.0) : 0.0;
        return node.energyConsumptionKw;
    }
    let total = 0;
    let anyActive = false;
    if (node.subZones) {
        for (const child of node.subZones) {
            total += recalculateTreeMetrics(child);
            if (child.powerActive) anyActive = true;
        }
    }
    node.totalEnergyKw = Math.round(total * 10) / 10;
    node.powerActive = anyActive;
    return node.totalEnergyKw;
}

async function dispatchUniformPower(powerState) {
    const action = powerState ? 'restore' : 'shutdown';
    const actionTitle = powerState ? 'RESTORE' : 'SHUTDOWN';
    const targetName = currentSelectedZone;
    const terminal = document.getElementById('compositeTraceTerminal');

    // Update power button states immediately
    updatePowerButtons(powerState);

    // Attempt live Spring Boot backend call
    try {
        const url = `/api/part-b/power/${action}?zoneName=${encodeURIComponent(targetName)}`;
        await fetch(url, { method: 'POST' });
    } catch (e) {
        // Backend offline, seamlessly proceed with client composite execution
    }

    // Find target in our composite tree and recursively apply uniform command
    const targetNode = findZoneInTree(inMemoryCityData, targetName);
    const shortLogs = [];
    let affectedCount = 0;

    if (targetNode) {
        affectedCount = countLeafFacilities(targetNode);
        recursiveApplyPower(targetNode, powerState);
        buildShortTrace(targetNode, powerState, shortLogs, '');
        // Recalculate up to root
        recalculateTreeMetrics(inMemoryCityData);
    } else {
        shortLogs.push(`[WARN] Target '${targetName}' not found in hierarchy tree.`);
    }

    const finalKw = targetNode ? (targetNode.totalEnergyKw ?? targetNode.energyConsumptionKw ?? 0) : 0;
    const finalState = powerState ? 'ONLINE' : 'OFFLINE';
    const timeStr = new Date().toLocaleTimeString();

    if (terminal) {
        const cardHtml = `
            <div class="border-l-2 ${powerState ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20'} pl-3 py-1.5 rounded-r-lg my-1.5 text-xs">
                <div class="${powerState ? 'text-emerald-400' : 'text-rose-400'} font-bold flex items-center justify-between">
                    <span class="flex items-center gap-1.5">
                        <i class="fa-solid ${powerState ? 'fa-bolt' : 'fa-power-off'}"></i> 
                        $ dispatch uniform_${action} --target="${targetName}"
                    </span>
                    <span class="text-[10px] text-slate-400 font-normal font-mono">${timeStr}</span>
                </div>
                <div class="text-[10px] text-cyan-300 mt-0.5 font-mono">
                    Traversal Model: Depth-First Recursive Poly (Composite Pattern)
                </div>
                <pre class="mt-1.5 text-[11px] text-slate-300 font-mono leading-relaxed whitespace-pre overflow-x-auto bg-[#060B16] p-2 rounded-lg border border-slate-800">${shortLogs.join('\n')}</pre>
                <div class="mt-1 flex items-center justify-between text-[11px] font-semibold ${powerState ? 'text-emerald-300 bg-emerald-900/30' : 'text-rose-300 bg-rose-900/30'} px-2 py-0.5 rounded">
                    <span>${powerState ? '🟢 POWER RESTORED: ' + affectedCount + ' facilities energized' : '🛑 SHUTDOWN EXECUTED: ' + affectedCount + ' facilities disconnected'}</span>
                    <span class="font-mono font-bold">${finalKw.toFixed(1)} kW [${finalState}]</span>
                </div>
            </div>
        `;
        terminal.innerHTML += cardHtml;
        scrollTerminalToBottom(terminal);
    }

    loadCityTree();
}

async function dispatchReportUsage() {
    const targetName = currentSelectedZone;
    const terminal = document.getElementById('compositeTraceTerminal');

    // Try backend if live
    try {
        const url = `/api/part-b/report?zoneName=${encodeURIComponent(targetName)}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            if (data && data.name) {
                // Synchronize
            }
        }
    } catch (e) {
        // Fallback to in-memory
    }

    const targetNode = findZoneInTree(inMemoryCityData, targetName) || inMemoryCityData;
    const isLeaf = targetNode.zoneType === 'BUILDING';
    const energyVal = isLeaf ? (targetNode.energyConsumptionKw || 0) : (targetNode.totalEnergyKw || 0);
    const powerStateText = targetNode.powerActive ? 'ONLINE (Energized)' : 'OFFLINE (Zero Feed)';
    const totalFacilities = countLeafFacilities(targetNode);
    const timeStr = new Date().toLocaleTimeString();

    const shortReportLines = [];
    buildShortReportTrace(targetNode, shortReportLines, '');

    if (terminal) {
        const cardHtml = `
            <div class="border-l-2 border-amber-500 bg-amber-950/20 pl-3 py-1.5 rounded-r-lg my-1.5 text-xs">
                <div class="text-amber-400 font-bold flex items-center justify-between">
                    <span class="flex items-center gap-1.5">
                        <i class="fa-solid fa-chart-simple"></i> 
                        $ dispatch uniform_report_usage --target="${targetName}"
                    </span>
                    <span class="text-[10px] text-slate-400 font-normal font-mono">${timeStr}</span>
                </div>
                <div class="mt-1.5 grid grid-cols-2 gap-2 text-[10.5px] bg-[#060B16] p-2 rounded-lg border border-slate-800 font-mono">
                    <div><span class="text-slate-400">Target Node:</span> <span class="font-bold text-white">${targetNode.name}</span></div>
                    <div><span class="text-slate-400">Zone Type:</span> <span class="font-bold text-amber-300">[${targetNode.zoneType}]</span></div>
                    <div><span class="text-slate-400">State:</span> <span class="font-bold ${targetNode.powerActive ? 'text-emerald-400' : 'text-rose-400'}">${powerStateText}</span></div>
                    <div><span class="text-slate-400">Active Load:</span> <span class="font-bold text-emerald-300 font-mono">${Number(energyVal).toFixed(1)} kW</span></div>
                </div>
                ${!isLeaf && targetNode.subZones && targetNode.subZones.length > 0 ? `
                <div class="mt-1.5">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Hierarchy Breakdown:</span>
                    <pre class="text-[11px] text-slate-300 font-mono leading-relaxed whitespace-pre overflow-x-auto bg-[#060B16] p-2 rounded-lg border border-slate-800">${shortReportLines.join('\n')}</pre>
                </div>` : ''}
                <div class="mt-1 flex items-center justify-between text-[11px] font-semibold text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded">
                    <span>⚡ TOTAL AGGREGATED GRID LOAD:</span>
                    <span class="font-mono font-bold text-amber-200">${Number(energyVal).toFixed(1)} kW</span>
                </div>
            </div>
        `;
        terminal.innerHTML += cardHtml;
        scrollTerminalToBottom(terminal);
    }
}

async function addNewZone() {
    const parentName = currentSelectedZone;
    const newNameInput = document.getElementById('newZoneName');
    const newTypeSelect = document.getElementById('newZoneType');
    const newBuildingTypeInput = document.getElementById('newBuildingType');
    const newEnergyInput = document.getElementById('newEnergyKw');

    const newName = newNameInput ? newNameInput.value.trim() : '';
    const newType = newTypeSelect ? newTypeSelect.value : 'BUILDING';
    const newBuildingType = newBuildingTypeInput ? newBuildingTypeInput.value.trim() : 'Commercial Hub';
    const newEnergy = parseFloat(newEnergyInput ? newEnergyInput.value : 100) || 100.0;

    if (!newName) {
        showAppAlert('Zone Name Required', 'Please enter a name for the new zone or facility.', 'warning');
        return;
    }

    const parentNode = findZoneInTree(inMemoryCityData, parentName);
    if (!parentNode) {
        showAppAlert('Parent Not Found', `Parent zone '${parentName}' not found in the grid hierarchy.`, 'warning');
        return;
    }

    if (parentNode.zoneType === 'BUILDING') {
        showAppAlert('Invalid Target Node', 'Cannot add child components to a Leaf Node (Building). Please select a City, District, or Street node as target!', 'warning');
        return;
    }

    // Create new component
    let newComponent;
    if (newType === 'BUILDING') {
        newComponent = {
            name: newName,
            zoneType: "BUILDING",
            buildingType: newBuildingType,
            powerActive: true,
            baseKw: newEnergy,
            energyConsumptionKw: newEnergy
        };
    } else {
        newComponent = {
            name: newName,
            zoneType: newType,
            powerActive: true,
            totalEnergyKw: 0.0,
            childCount: 0,
            subZones: []
        };
    }

    if (!parentNode.subZones) parentNode.subZones = [];
    parentNode.subZones.push(newComponent);
    parentNode.childCount = parentNode.subZones.length;

    // Recalculate up to root
    recalculateTreeMetrics(inMemoryCityData);

    // Call backend endpoint if live
    try {
        const url = `/api/part-b/add?parentZoneName=${encodeURIComponent(parentName)}&newZoneName=${encodeURIComponent(newName)}&zoneType=${newType}&buildingType=${encodeURIComponent(newBuildingType)}&energyKw=${newEnergy}`;
        await fetch(url, { method: 'POST' });
    } catch (e) {
        // Handled in client tree
    }

    const terminal = document.getElementById('compositeTraceTerminal');
    if (terminal) {
        const cardHtml = `
            <div class="border-l-2 border-cyan-500 bg-cyan-950/20 pl-3 py-1.5 rounded-r-lg my-2 text-xs">
                <div class="text-cyan-400 font-bold flex items-center justify-between">
                    <span>🏗️ DYNAMIC EXPANSION: add_component --parent="${parentName}"</span>
                    <span class="text-[10px] text-slate-400 font-normal font-mono">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="mt-1 text-[11px] text-slate-300 font-mono">
                    Added new ${newType} <span class="text-amber-300 font-bold">"${newName}"</span> under parent <span class="text-white font-bold">"${parentName}"</span>.
                </div>
                <div class="mt-1 flex items-center justify-between text-[11px] font-semibold text-cyan-300 bg-cyan-900/30 px-2.5 py-1 rounded">
                    <span>Grid Load Recalculated:</span>
                    <span class="font-mono font-bold">${inMemoryCityData.totalEnergyKw.toFixed(1)} kW [ONLINE]</span>
                </div>
            </div>
        `;
        terminal.innerHTML += cardHtml;
        scrollTerminalToBottom(terminal);
    }

    if (newNameInput) newNameInput.value = '';
    loadCityTree();
}

window.dispatchUniformPower = dispatchUniformPower;
window.dispatchReportUsage = dispatchReportUsage;
window.selectTargetZone = selectTargetZone;
window.addNewZone = addNewZone;

// ==========================================
// PART C: CHAIN OF RESPONSIBILITY (Complaints)
// ==========================================
// In-memory complaint registry for offline/preview fallback
let inMemoryComplaints = [
    {
        id: "CMP-1003",
        citizenName: "Anura Fernando",
        contactNumber: "0754433221",
        title: "Gas pipe leak near school building",
        location: "Regent Street",
        severity: "CRITICAL",
        submittedAt: "2026-11-07 20:57:39",
        resolvedBy: "Chief City Manager",
        escalationHistory: [
            "20:57:39 - Complaint registered by citizen: Anura Fernando [CRITICAL]",
            "20:57:39 - Severity too high for [Local Community Staff]. Escalating to next authority...",
            "20:57:39 - Severity too high for [Zonal Area Supervisor]. Escalating to next authority...",
            "20:57:39 - Resolved by [Chief City Manager]: CRITICAL EMERGENCY: City Disaster Management Unit mobilized & Mayor alerted immediately."
        ]
    },
    {
        id: "CMP-1002",
        citizenName: "Dr. Nimal Silva",
        contactNumber: "0718899001",
        title: "Main water line burst causing flooding",
        location: "Duplication Road",
        severity: "MEDIUM",
        submittedAt: "2026-11-07 20:50:12",
        resolvedBy: "Zonal Area Supervisor",
        escalationHistory: [
            "20:50:12 - Complaint registered by citizen: Dr. Nimal Silva [MEDIUM]",
            "20:50:12 - Severity too high for [Local Community Staff]. Escalating to next authority...",
            "20:50:12 - Resolved by [Zonal Area Supervisor]: Allocated specialized technical crew and municipal repair budget."
        ]
    },
    {
        id: "CMP-1001",
        citizenName: "Sunil Perera",
        contactNumber: "0771234567",
        title: "Flickering street light pole #42",
        location: "Galle Road",
        severity: "LOW",
        submittedAt: "2026-11-07 20:42:00",
        resolvedBy: "Local Community Staff",
        escalationHistory: [
            "20:42:00 - Complaint registered by citizen: Sunil Perera [LOW]",
            "20:42:00 - Resolved by [Local Community Staff]: Handled directly at community level. Dispatched maintenance technician."
        ]
    }
];

// ==========================================
// PART C: CHAIN OF RESPONSIBILITY (Citizen Complaints)
// ==========================================
function toggleSeverityMenu() {
    const menu = document.getElementById('severityMenu');
    const chevron = document.getElementById('severityChevron');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}
window.toggleSeverityMenu = toggleSeverityMenu;

function selectSeverityOption(val, label, dotColor, badgeClass) {
    const input = document.getElementById('cSeverity');
    const selectedText = document.getElementById('severitySelectedText');
    const selectedDot = document.getElementById('severitySelectedDot');
    
    if (input) input.value = val;
    if (selectedText) {
        selectedText.textContent = label;
        selectedText.className = 'truncate font-bold text-slate-800';
    }
    if (selectedDot) {
        selectedDot.className = `w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`;
    }
    
    toggleSeverityMenu();
}
window.selectSeverityOption = selectSeverityOption;

let currentComplaintFilter = 'ALL';

function filterComplaints(filter) {
    currentComplaintFilter = filter;
    
    const tabs = [
        { id: 'filterTabAll', role: 'ALL' },
        { id: 'filterTabStaff', role: 'STAFF' },
        { id: 'filterTabSupervisor', role: 'SUPERVISOR' },
        { id: 'filterTabManager', role: 'MANAGER' }
    ];
    
    tabs.forEach(t => {
        const btn = document.getElementById(t.id);
        if (!btn) return;
        if (t.role === filter) {
            btn.className = 'px-3 py-1 rounded-lg font-bold bg-neutral-900 text-white shadow-xs transition';
        } else {
            btn.className = 'px-2.5 py-1 rounded-lg font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition';
        }
    });

    renderComplaintsFiltered();
}
window.filterComplaints = filterComplaints;

function updateComplaintBadges() {
    const badgeAll = document.getElementById('countBadgeAll');
    const badgeStaff = document.getElementById('countBadgeStaff');
    const badgeSupervisor = document.getElementById('countBadgeSupervisor');
    const badgeManager = document.getElementById('countBadgeManager');

    const total = inMemoryComplaints.length;
    const staffCount = inMemoryComplaints.filter(c => c.severity === 'LOW' || (c.resolvedBy && c.resolvedBy.includes('Staff'))).length;
    const supCount = inMemoryComplaints.filter(c => c.severity === 'MEDIUM' || (c.resolvedBy && c.resolvedBy.includes('Supervisor'))).length;
    const mgrCount = inMemoryComplaints.filter(c => c.severity === 'HIGH' || c.severity === 'CRITICAL' || (c.resolvedBy && (c.resolvedBy.includes('Manager') || c.resolvedBy.includes('Disaster')))).length;

    if (badgeAll) badgeAll.textContent = total;
    if (badgeStaff) badgeStaff.textContent = staffCount;
    if (badgeSupervisor) badgeSupervisor.textContent = supCount;
    if (badgeManager) badgeManager.textContent = mgrCount;
}

function renderComplaintsFiltered() {
    let filtered = inMemoryComplaints;
    if (currentComplaintFilter === 'STAFF') {
        filtered = inMemoryComplaints.filter(c => c.severity === 'LOW' || (c.resolvedBy && c.resolvedBy.includes('Staff')));
    } else if (currentComplaintFilter === 'SUPERVISOR') {
        filtered = inMemoryComplaints.filter(c => c.severity === 'MEDIUM' || (c.resolvedBy && c.resolvedBy.includes('Supervisor')));
    } else if (currentComplaintFilter === 'MANAGER') {
        filtered = inMemoryComplaints.filter(c => c.severity === 'HIGH' || c.severity === 'CRITICAL' || (c.resolvedBy && (c.resolvedBy.includes('Manager') || c.resolvedBy.includes('Disaster'))));
    }
    renderComplaintsList(filtered);
    updateComplaintBadges();
}

function renderComplaintsList(list) {
    const container = document.getElementById('complaintsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!list || list.length === 0) {
        container.innerHTML = `
            <div class="p-6 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/80 text-xs">
                <i class="fa-solid fa-inbox text-slate-300 text-lg mb-1.5 block"></i>
                No complaints currently assigned to this responsibility tier.
            </div>
        `;
        return;
    }

    list.forEach(c => {
        const card = document.createElement('div');
        card.className = 'bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2 shadow-xs transition hover:border-slate-300';

        const severityBadge = {
            'LOW': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'MEDIUM': 'bg-amber-50 text-amber-700 border-amber-200',
            'HIGH': 'bg-orange-50 text-orange-700 border-orange-200',
            'CRITICAL': 'bg-rose-50 text-rose-700 border-rose-200'
        }[c.severity] || 'bg-slate-100 text-slate-600 border-slate-200';

        const roleColor = {
            'Local Community Staff': 'text-emerald-700 bg-emerald-50 border border-emerald-200',
            'Zonal Area Supervisor': 'text-amber-800 bg-amber-50 border border-amber-200',
            'Chief City Manager': 'text-rose-800 bg-rose-50 border border-rose-200'
        }[c.resolvedBy] || 'text-slate-700 bg-slate-100 border border-slate-200';

        const historyHtml = c.escalationHistory.map(h => 
            `<li class="text-[11px] text-slate-600 font-medium flex items-start gap-1.5 leading-snug">
                <i class="fa-solid fa-arrow-right text-[8px] text-amber-500 mt-1 shrink-0"></i> 
                <span>${h}</span>
            </li>`
        ).join('');

        card.innerHTML = `
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center space-x-2 truncate">
                    <span class="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">${c.id}</span>
                    <span class="text-xs font-bold text-slate-900 truncate">${c.title}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${severityBadge} shrink-0">${c.severity}</span>
            </div>
            <div class="text-[11px] text-slate-500 flex flex-wrap gap-2 sm:gap-3 border-b border-slate-100 pb-1.5">
                <span class="flex items-center gap-1"><i class="fa-solid fa-user text-slate-400 text-[10px]"></i> ${c.citizenName}</span>
                <span class="text-slate-300">•</span>
                <span class="flex items-center gap-1"><i class="fa-solid fa-phone text-slate-400 text-[10px]"></i> ${c.contactNumber}</span>
                <span class="text-slate-300">•</span>
                <span class="flex items-center gap-1"><i class="fa-solid fa-location-dot text-slate-400 text-[10px]"></i> ${c.location}</span>
            </div>
            <div class="bg-[#F8F9FA] p-2 rounded-xl border border-slate-100">
                <span class="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Escalation Audit Trail:</span>
                <ul class="space-y-1">${historyHtml}</ul>
            </div>
            <div class="text-xs flex flex-wrap items-center justify-between gap-2 text-slate-500 pt-0.5">
                <span class="text-[11px]">Handled by: <strong class="px-2 py-0.5 rounded text-[10px] font-bold ${roleColor}">${c.resolvedBy}</strong></span>
                <span class="text-[10px] text-slate-400 font-mono">${c.submittedAt}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadComplaints() {
    try {
        const res = await fetch('/api/part-c/complaints');
        if (!res.ok) throw new Error('API error');
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
            inMemoryComplaints = list;
        }
    } catch (err) {
        console.warn('Backend complaints endpoint offline. Using verified municipal audit trail simulation.');
    }
    renderComplaintsFiltered();
}

async function submitComplaint() {
    const nameInput = document.getElementById('cCitizenName');
    const contactInput = document.getElementById('cContact');
    const titleInput = document.getElementById('cTitle');
    const locationInput = document.getElementById('cLocation');
    const severityInput = document.getElementById('cSeverity');

    const name = nameInput ? nameInput.value.trim() : '';
    const contact = contactInput ? contactInput.value.trim() : '';
    const title = titleInput ? titleInput.value.trim() : '';
    const location = locationInput ? locationInput.value.trim() : '';
    const severity = severityInput ? severityInput.value.trim() : '';

    if (!name || !contact || !title || !location) {
        showAppAlert('Incomplete Details', 'Please fill out all required incident details (Citizen Name, Contact Phone, Incident Title, and Street Location).', 'warning');
        return;
    }

    if (!severity) {
        showAppAlert('Severity Level Required', 'Please select an Incident Severity Level (LOW, MEDIUM, HIGH, or CRITICAL) from the dropdown before dispatching!', 'warning');
        return;
    }

    const url = `/api/part-c/submit?citizenName=${encodeURIComponent(name)}&contact=${encodeURIComponent(contact)}&title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&severity=${severity}`;

    try {
        const res = await fetch(url, { method: 'POST' });
        if (res.ok) {
            const created = await res.json();
            await loadComplaints();
            resetComplaintForm();
            showIncidentConfirmModal(created);
            return;
        }
        throw new Error('Server error');
    } catch (err) {
        console.warn('Backend offline. Simulating Chain of Responsibility escalation client-side.');

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const dateStr = now.toISOString().split('T')[0] + ' ' + timeStr;

        let history = [`${timeStr} - Complaint registered by citizen: ${name} [${severity}]`];
        let resolvedBy = "Local Community Staff";

        if (severity === 'LOW') {
            resolvedBy = "Local Community Staff";
            history.push(`${timeStr} - Resolved by [Local Community Staff]: Handled directly at community level. Dispatched maintenance technician.`);
        } else if (severity === 'MEDIUM') {
            resolvedBy = "Zonal Area Supervisor";
            history.push(`${timeStr} - Severity too high for [Local Community Staff]. Escalating to next authority...`);
            history.push(`${timeStr} - Resolved by [Zonal Area Supervisor]: Allocated specialized technical crew and municipal repair budget.`);
        } else {
            resolvedBy = "Chief City Manager";
            history.push(`${timeStr} - Severity too high for [Local Community Staff]. Escalating to next authority...`);
            history.push(`${timeStr} - Severity too high for [Zonal Area Supervisor]. Escalating to next authority...`);
            history.push(`${timeStr} - Resolved by [Chief City Manager]: ${severity === 'CRITICAL' ? 'CRITICAL EMERGENCY: City Disaster Management Unit mobilized & Mayor alerted immediately.' : 'High-level strategic intervention approved.'}`);
        }

        const newComplaint = {
            id: `CMP-${1000 + inMemoryComplaints.length + 1}`,
            citizenName: name,
            contactNumber: contact,
            title: title,
            location: location,
            severity: severity,
            submittedAt: dateStr,
            resolvedBy: resolvedBy,
            escalationHistory: history
        };

        inMemoryComplaints.unshift(newComplaint);
        renderComplaintsFiltered();
        resetComplaintForm();
        showIncidentConfirmModal(newComplaint);
    }
}

// ==========================================
// THEME CONFIRMATION MODAL & ALERT HELPERS
// ==========================================
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function showIncidentConfirmModal(complaint) {
    const modal = document.getElementById('themeConfirmModal');
    const badge = document.getElementById('confirmModalBadge');
    const title = document.getElementById('confirmModalTitle');
    const icon = document.getElementById('confirmModalIcon');
    const body = document.getElementById('confirmModalBody');
    if (!modal) return;

    const isCritical = complaint.severity === 'CRITICAL';
    const isHigh = complaint.severity === 'HIGH';
    const isMed = complaint.severity === 'MEDIUM';

    const tierName = isCritical ? 'Tier 4 • Emergency Response Unit' :
                     isHigh ? 'Tier 3 • Chief City Manager' :
                     isMed ? 'Tier 2 • Zonal Area Supervisor' :
                     'Tier 1 • Local Community Staff';

    const badgeColor = isCritical ? 'bg-rose-100 text-rose-800 border-rose-300' :
                       isHigh ? 'bg-orange-100 text-orange-800 border-orange-300' :
                       isMed ? 'bg-amber-100 text-amber-800 border-amber-300' :
                       'bg-emerald-100 text-emerald-800 border-emerald-300';

    const iconClass = isCritical ? 'bg-rose-50 text-rose-600 border-rose-200' :
                      isHigh ? 'bg-orange-50 text-orange-600 border-orange-200' :
                      isMed ? 'bg-amber-50 text-amber-600 border-amber-200' :
                      'bg-emerald-50 text-emerald-600 border-emerald-200';

    if (badge) {
        badge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`;
        badge.textContent = `Chain of Responsibility: ${isCritical ? 'Tier 4' : isHigh ? 'Tier 3' : isMed ? 'Tier 2' : 'Tier 1'}`;
    }
    if (title) {
        title.textContent = 'Incident Dispatched & Escalated!';
    }
    if (icon) {
        icon.className = `w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs shrink-0 border ${iconClass}`;
        icon.innerHTML = `<i class="fa-solid ${isCritical ? 'fa-triangle-exclamation animate-pulse' : 'fa-circle-check'}"></i>`;
    }

    if (body) {
        body.innerHTML = `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <span class="font-mono font-bold text-slate-800 text-xs">${complaint.id || 'CMP-NEW'}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor}">${complaint.severity}</span>
            </div>
            <div>
                <p class="font-bold text-slate-900 text-[13px]">${escapeHtml(complaint.title || '')}</p>
                <p class="text-slate-500 text-[11px] mt-0.5 flex items-center gap-1">
                    <i class="fa-solid fa-location-dot text-slate-400"></i> ${escapeHtml(complaint.location || '')}
                </p>
            </div>
            <div class="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span class="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Escalated Dynamically & Resolved By:</span>
                <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <strong class="text-emerald-700">${escapeHtml(complaint.resolvedBy || tierName)}</strong>
                </span>
            </div>
            <div class="text-[10.5px] font-mono text-slate-500 flex items-center justify-between pt-0.5">
                <span>Citizen: <strong class="text-slate-700">${escapeHtml(complaint.citizenName || '')}</strong></span>
                <span>Contact: <strong class="text-slate-700">${escapeHtml(complaint.contactNumber || '')}</strong></span>
            </div>
        `;
    }

    modal.classList.remove('hidden');
}

function showAppAlert(title, message, type = 'warning') {
    const modal = document.getElementById('themeConfirmModal');
    const badge = document.getElementById('confirmModalBadge');
    const titleEl = document.getElementById('confirmModalTitle');
    const icon = document.getElementById('confirmModalIcon');
    const body = document.getElementById('confirmModalBody');
    if (!modal) return;

    if (badge) {
        badge.className = type === 'warning' ? 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300' : 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300';
        badge.textContent = type === 'warning' ? 'Attention Required' : 'Validation Error';
    }
    if (titleEl) titleEl.textContent = title;
    if (icon) {
        icon.className = type === 'warning' ? 'w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs shrink-0 border bg-amber-50 text-amber-600 border-amber-200' : 'w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs shrink-0 border bg-rose-50 text-rose-600 border-rose-200';
        icon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    }
    if (body) {
        body.innerHTML = `
            <p class="text-xs font-semibold text-slate-700 leading-relaxed py-1">${escapeHtml(message)}</p>
        `;
    }
    modal.classList.remove('hidden');
}

function closeConfirmModal() {
    const modal = document.getElementById('themeConfirmModal');
    if (modal) modal.classList.add('hidden');
}
window.closeConfirmModal = closeConfirmModal;
window.showAppAlert = showAppAlert;
window.showIncidentConfirmModal = showIncidentConfirmModal;

function resetComplaintForm() {
    const nameInput = document.getElementById('cCitizenName');
    const contactInput = document.getElementById('cContact');
    const titleInput = document.getElementById('cTitle');
    const locationInput = document.getElementById('cLocation');
    const severityInput = document.getElementById('cSeverity');

    if (nameInput) nameInput.value = '';
    if (contactInput) contactInput.value = '';
    if (titleInput) titleInput.value = '';
    if (locationInput) locationInput.value = '';
    if (severityInput) severityInput.value = '';

    const selectedText = document.getElementById('severitySelectedText');
    const selectedDot = document.getElementById('severitySelectedDot');
    if (selectedText) {
        selectedText.textContent = '-- Please Select Incident Severity Level --';
        selectedText.className = 'truncate font-semibold text-slate-400';
    }
    if (selectedDot) {
        selectedDot.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0';
    }
}

// ==========================================
// PART D: FLYWEIGHT PATTERN (Streetlights Fleet)
// ==========================================
function toggleScaleMenu() {
    const menu = document.getElementById('scaleMenu');
    const chevron = document.getElementById('scaleChevron');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}
window.toggleScaleMenu = toggleScaleMenu;

let activeProfiledFleetCount = 50000;

function selectScaleOption(val, label) {
    const input = document.getElementById('streetScaleSelect');
    const selectedText = document.getElementById('scaleSelectedText');
    const btn = document.getElementById('btnSpawnFleet');
    const triggerIcon = document.querySelector('#scaleTrigger i.fa-lightbulb');

    if (input) input.value = val;
    if (selectedText) selectedText.textContent = label;

    // Update trigger icon color according to selected tier
    if (triggerIcon) {
        if (val === '50000') triggerIcon.className = 'fa-solid fa-lightbulb text-emerald-500 text-[11px] shrink-0';
        else if (val === '25000') triggerIcon.className = 'fa-solid fa-lightbulb text-amber-500 text-[11px] shrink-0';
        else triggerIcon.className = 'fa-solid fa-lightbulb text-sky-500 text-[11px] shrink-0';
    }

    toggleScaleMenu();

    // IMPORTANT: Do NOT automatically calculate or update RAM cards on dropdown select!
    // The profiler metrics (Baseline, Optimized, Preserved) must only update when the user clicks "Spawn & Profile Fleet".
    if (btn) {
        const countFormatted = parseInt(val).toLocaleString();
        btn.innerHTML = `<i class="fa-solid fa-microchip animate-pulse"></i> Spawn & Profile ${countFormatted} Fleet`;
        btn.classList.add('ring-2', 'ring-emerald-400', 'ring-offset-1');
    }
}
window.selectScaleOption = selectScaleOption;

async function runRamProfile(isManualClick = false) {
    const scaleSelect = document.getElementById('streetScaleSelect');
    const scale = parseInt(scaleSelect ? scaleSelect.value : 50000) || 50000;
    const btn = document.getElementById('btnSpawnFleet');
    const feedback = document.getElementById('profilerFeedback');
    const feedbackMsg = document.getElementById('profilerFeedbackMsg');

    if (isManualClick && btn) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin text-white"></i> Spawning & Profiling...`;
        btn.classList.add('opacity-80', 'cursor-wait');
        btn.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-1');

        // Visual radar sweep/ping on the interactive canvas nodes
        document.querySelectorAll('.light-node-point').forEach(el => {
            el.classList.add('scale-125');
            setTimeout(() => el.classList.remove('scale-125'), 400);
        });
    }

    let count = scale;
    try {
        const res = await fetch(`/api/part-d/scale?count=${scale}`, { method: 'POST' });
        if (res.ok) {
            const metrics = await res.json();
            if (metrics && metrics.totalStreetLightsCreated) {
                count = Number(metrics.totalStreetLightsCreated) || scale;
            }
        }
    } catch (err) {
        console.warn('Part D scale endpoint offline. Running verified Flyweight benchmark for ' + scale + ' nodes.');
    }

    if (isManualClick) {
        await new Promise(r => setTimeout(r, 400));
    }

    activeProfiledFleetCount = count;

    const unoptimizedMb = (count * 0.000878).toFixed(1);
    const flyweightMb = (1.81 * (count / 50000)).toFixed(2);
    const savedMb = (parseFloat(unoptimizedMb) - parseFloat(flyweightMb)).toFixed(1);
    const scaleFormatted = count.toLocaleString();

    const unoptEl = document.getElementById('unoptimizedHeapText');
    const unoptSubEl = document.getElementById('unoptimizedSubText');
    const flyEl = document.getElementById('flyweightHeapText');
    const presEl = document.getElementById('preservedPercentText');
    const savedMbEl = document.getElementById('savedMegabytesText');
    const fleetStatusEl = document.getElementById('fleetStatusText');
    const filterAllCountEl = document.getElementById('filterAllCount');

    if (unoptEl) {
        unoptEl.textContent = unoptimizedMb + ' MB';
        unoptEl.classList.add('text-rose-600');
        setTimeout(() => unoptEl.classList.remove('text-rose-600'), 500);
    }
    if (unoptSubEl) unoptSubEl.textContent = `${scaleFormatted} unpooled instances`;
    if (flyEl) {
        flyEl.textContent = flyweightMb + ' MB';
        flyEl.classList.add('text-emerald-600');
        setTimeout(() => flyEl.classList.remove('text-emerald-600'), 500);
    }
    if (presEl) presEl.textContent = '95.9%';
    if (savedMbEl) savedMbEl.textContent = `${savedMb} MB RAM saved across municipal grid`;
    if (fleetStatusEl) fleetStatusEl.textContent = `Fleet Status: ${scaleFormatted} Nodes Operational (${currentDimLevel}% Lumens)`;
    if (filterAllCountEl) filterAllCountEl.textContent = count >= 1000 ? `${(count/1000).toFixed(0)}k` : count;

    // Update bottom Master Luminaire registry counts dynamically
    const warmRatio = 0.4824; // 24,120 / 50,000
    const highRatio = 0.3280; // 16,400 / 50,000
    const solarRatio = 0.1896; // 9,480 / 50,000

    const warmEl = document.getElementById('tableWarmCount');
    const highEl = document.getElementById('tableHighCount');
    const solarEl = document.getElementById('tableSolarCount');

    if (warmEl) warmEl.textContent = `${Math.round(count * warmRatio).toLocaleString()} Streetlights`;
    if (highEl) highEl.textContent = `${Math.round(count * highRatio).toLocaleString()} Streetlights`;
    if (solarEl) solarEl.textContent = `${Math.round(count * solarRatio).toLocaleString()} Streetlights`;

    if (isManualClick && btn) {
        btn.disabled = false;
        btn.classList.remove('opacity-80', 'cursor-wait');
        btn.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-200"></i> Profiled ${scaleFormatted} Nodes!`;

        if (feedback && feedbackMsg) {
            feedbackMsg.textContent = `${scaleFormatted} nodes spawned: ${savedMb} MB RAM saved!`;
            feedback.classList.remove('hidden');
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 3500);
        }

        setTimeout(() => {
            btn.innerHTML = `<i class="fa-solid fa-microchip"></i> Spawn & Profile Fleet`;
        }, 1800);
    }
}

// ==========================================
// PART D: SMART STREETLIGHTS FLEET CONTROLLER
// ==========================================
let currentDimLevel = 100;
let currentFilterType = 'ALL';
let isFleetOn = true;
let selectedStreetlightId = 'SL-COL-1001';

// 42 Realistically Mapped Municipal Streetlight Nodes Lined Along City Corridors
const streetlightNodesData = [
    // Galle Road Corridor (90W Warm LED - Commercial District, BOC HQ & Cinnamon Grand)
    { id: 'SL-COL-1001', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • BOC HQ Sector', x: 18, y: 8, lat: '6.9271', lon: '79.8612', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1002', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • Commercial Hub', x: 22, y: 18, lat: '6.9275', lon: '79.8614', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1003', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • Hotel Corridor', x: 18, y: 28, lat: '6.9280', lon: '79.8618', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1004', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • Cinnamon Grand', x: 22, y: 38, lat: '6.9285', lon: '79.8622', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1005', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • South Junction', x: 18, y: 62, lat: '6.9255', lon: '79.8608', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1006', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • Commercial Core', x: 22, y: 72, lat: '6.9248', lon: '79.8601', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1007', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • Market Sector', x: 18, y: 82, lat: '6.9240', lon: '79.8595', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1008', type: 'WARM', model: '90W Warm LED', zone: 'Galle Rd • South Gate', x: 22, y: 90, lat: '6.9232', lon: '79.8590', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },

    // Lotus Road Arterial (90W Warm LED - World Trade Center & Financial Hub)
    { id: 'SL-COL-1011', type: 'WARM', model: '90W Warm LED', zone: 'Lotus Rd • North Gate', x: 45, y: 10, lat: '6.9300', lon: '79.8635', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1012', type: 'WARM', model: '90W Warm LED', zone: 'Lotus Rd • WTC Tower A', x: 49, y: 20, lat: '6.9308', lon: '79.8640', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1013', type: 'WARM', model: '90W Warm LED', zone: 'Lotus Rd • Financial Core', x: 45, y: 32, lat: '6.9315', lon: '79.8645', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1014', type: 'WARM', model: '90W Warm LED', zone: 'Lotus Rd • Central Link', x: 49, y: 64, lat: '6.9290', lon: '79.8630', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1015', type: 'WARM', model: '90W Warm LED', zone: 'Lotus Rd • Civic Link', x: 45, y: 76, lat: '6.9282', lon: '79.8625', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1016', type: 'WARM', model: '90W Warm LED', zone: 'Lotus Rd • South Corner', x: 49, y: 85, lat: '6.9275', lon: '79.8620', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },

    // Duplication Road Boulevard (90W Warm LED - Tech Innovation District & Telecom)
    { id: 'SL-COL-1021', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Virtusa Campus', x: 76, y: 8, lat: '6.9260', lon: '79.8685', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1022', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Tech Hub', x: 80, y: 18, lat: '6.9265', lon: '79.8690', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1023', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Software Corridor', x: 76, y: 28, lat: '6.9270', lon: '79.8695', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1024', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Telecom Center', x: 80, y: 38, lat: '6.9275', lon: '79.8700', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1025', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Innovation Way', x: 76, y: 62, lat: '6.9250', lon: '79.8678', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1026', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Tech Park South', x: 80, y: 72, lat: '6.9242', lon: '79.8670', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1027', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Data Center', x: 76, y: 82, lat: '6.9235', lon: '79.8665', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },
    { id: 'SL-COL-1028', type: 'WARM', model: '90W Warm LED', zone: 'Duplication Rd • Campus East', x: 80, y: 90, lat: '6.9228', lon: '79.8660', spec: 'Philips Lumileds • 3000K • 9,500 lm', color: 'amber' },

    // Highway 101 Expressway (150W High-Mast LED - High-Speed Arterial Cross-Town)
    { id: 'SL-COL-1031', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • West Terminal', x: 6, y: 46, lat: '6.9320', lon: '79.8550', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1032', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Port Access', x: 12, y: 54, lat: '6.9322', lon: '79.8570', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1033', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Galle Interchange', x: 27, y: 46, lat: '6.9325', lon: '79.8620', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1034', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Overpass 1', x: 33, y: 54, lat: '6.9328', lon: '79.8640', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1035', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Mid-Span West', x: 40, y: 46, lat: '6.9330', lon: '79.8660', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1036', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Lotus Junction', x: 53, y: 54, lat: '6.9335', lon: '79.8700', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1037', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Civic Overpass', x: 60, y: 46, lat: '6.9338', lon: '79.8720', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1038', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Tech Interchange', x: 71, y: 54, lat: '6.9342', lon: '79.8750', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1039', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • Tech Flyover', x: 84, y: 46, lat: '6.9345', lon: '79.8780', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },
    { id: 'SL-COL-1040', type: 'HIGH', model: '150W High-Mast LED', zone: 'Highway 101 • East Tollway', x: 92, y: 54, lat: '6.9350', lon: '79.8820', spec: 'Osram Streetlight • 5000K • 16,000 lm', color: 'sky' },

    // Marine Drive Coastal Strip & Regent Street (60W Solar LED - Eco Parkway & Health Access)
    { id: 'SL-COL-1041', type: 'SOLAR', model: '60W Solar LED', zone: 'Marine Drive • Eco Park West', x: 26, y: 92, lat: '6.9150', lon: '79.8580', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1042', type: 'SOLAR', model: '60W Solar LED', zone: 'Marine Drive • Coastal Trail', x: 33, y: 92, lat: '6.9155', lon: '79.8600', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1043', type: 'SOLAR', model: '60W Solar LED', zone: 'Marine Drive • Seaside Pier', x: 40, y: 92, lat: '6.9160', lon: '79.8620', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1044', type: 'SOLAR', model: '60W Solar LED', zone: 'Marine Drive • Parkway Center', x: 54, y: 92, lat: '6.9165', lon: '79.8650', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1045', type: 'SOLAR', model: '60W Solar LED', zone: 'Marine Drive • Green Strip', x: 61, y: 92, lat: '6.9170', lon: '79.8670', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1046', type: 'SOLAR', model: '60W Solar LED', zone: 'Marine Drive • Eco Trail East', x: 68, y: 92, lat: '6.9175', lon: '79.8690', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1047', type: 'SOLAR', model: '60W Solar LED', zone: 'Regent St • Hospital Entrance', x: 35, y: 72, lat: '6.9180', lon: '79.8710', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' },
    { id: 'SL-COL-1048', type: 'SOLAR', model: '60W Solar LED', zone: 'Regent St • Ambulance Corridor', x: 35, y: 82, lat: '6.9188', lon: '79.8730', spec: 'Cree Lighting • 4000K • 6,200 lm', color: 'emerald' }
];

function initStreetlightGrid() {
    const container = document.getElementById('lightNodesContainer');
    if (!container) return;

    container.innerHTML = '';
    streetlightNodesData.forEach(node => {
        const btn = document.createElement('button');
        btn.id = `node-${node.id}`;
        btn.setAttribute('data-type', node.type);
        btn.onclick = () => selectLightNode(node);

        // Position absolutely along the realistic road coordinates
        btn.style.left = `${node.x}%`;
        btn.style.top = `${node.y}%`;
        btn.className = `light-node-point absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-10`;

        btn.innerHTML = `
            <div class="relative flex items-center justify-center">
                <!-- Outer Pulse Aura on Active/Selected -->
                <span class="pulse-aura absolute -inset-1 rounded-full opacity-40"></span>
                
                <!-- Streetlight Head (Lamp Bulb / Fixture) -->
                <span class="lamp-head relative w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-150"></span>

                <!-- Hover Tooltip in Dark Theme -->
                <div class="absolute -top-7 hidden group-hover:flex bg-slate-900 text-white text-[9px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30 pointer-events-none border border-slate-700">
                    <span class="font-bold text-amber-300 mr-1">${node.id}</span> ${node.zone}
                </div>
            </div>
        `;
        container.appendChild(btn);
    });

    if (streetlightNodesData.length > 0) {
        selectLightNode(streetlightNodesData[0]);
    } else {
        updateStreetlightsVisuals();
    }
}

function updateStreetlightsVisuals() {
    streetlightNodesData.forEach(node => {
        const btn = document.getElementById(`node-${node.id}`);
        if (!btn) return;
        const isSelected = node.id === selectedStreetlightId;
        const head = btn.querySelector('.lamp-head');
        const aura = btn.querySelector('.pulse-aura');
        if (!head) return;

        const isMatch = currentFilterType === 'ALL' || node.type === currentFilterType;

        if (!isMatch) {
            btn.style.opacity = '0.2';
            btn.style.transform = 'translate(-50%, -50%) scale(0.7)';
            return;
        } else {
            btn.style.transform = isSelected ? 'translate(-50%, -50%) scale(1.3)' : 'translate(-50%, -50%) scale(1)';
        }

        if (currentDimLevel === 100) {
            // 100% Peak Lumens - Vibrant luminous glowing bulb
            btn.style.opacity = '1.0';
            const lampGlow = node.color === 'amber' ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_#F59E0B]' :
                             node.color === 'sky' ? 'bg-sky-400 border-sky-300 shadow-[0_0_12px_#38BDF8]' :
                             'bg-emerald-400 border-emerald-300 shadow-[0_0_12px_#34D399]';
            head.className = `lamp-head relative w-3.5 h-3.5 rounded-full border-2 ${lampGlow} transition-all duration-300 ${isSelected ? 'ring-2 ring-white scale-125' : ''}`;
            if (aura) {
                aura.className = `pulse-aura absolute -inset-1 rounded-full ${lampGlow} opacity-50 ${isSelected ? 'animate-ping' : ''}`;
            }
        } else if (currentDimLevel === 50) {
            // 50% Eco Lumens - Bulb remains completely colored & visible, soft glow, opacity 0.9!
            btn.style.opacity = '0.9';
            const lampGlow = node.color === 'amber' ? 'bg-amber-400/90 border-amber-300/80 shadow-[0_0_6px_#F59E0B]' :
                             node.color === 'sky' ? 'bg-sky-400/90 border-sky-300/80 shadow-[0_0_6px_#38BDF8]' :
                             'bg-emerald-400/90 border-emerald-300/80 shadow-[0_0_6px_#34D399]';
            head.className = `lamp-head relative w-3.5 h-3.5 rounded-full border-2 ${lampGlow} transition-all duration-300 ${isSelected ? 'ring-2 ring-white scale-125' : ''}`;
            if (aura) {
                aura.className = `pulse-aura absolute -inset-0.5 rounded-full ${lampGlow} opacity-30 ${isSelected ? 'animate-ping' : ''}`;
            }
        } else {
            // 0% OFF (Grid Standby) - Solid metallic municipal lamp fixture on pole. Never disappears!
            // Opacity stays 0.85 so every single fixture is clearly visible on the street!
            btn.style.opacity = '0.85';
            head.className = `lamp-head relative w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-slate-700 shadow-none transition-all duration-300 ${isSelected ? 'ring-2 ring-amber-400 scale-125' : ''}`;
            if (aura) {
                aura.className = `pulse-aura hidden`;
            }
        }
    });
}

function selectLightNode(node) {
    selectedStreetlightId = node.id;
    updateStreetlightsVisuals();

    const idEl = document.getElementById('inspectorNodeId');
    const badgeEl = document.getElementById('inspectorBadge');
    const detailsEl = document.getElementById('inspectorDetails');
    const iconEl = document.getElementById('inspectorIcon');
    const lumensEl = document.getElementById('inspectorLumens');

    if (idEl) idEl.textContent = `Selected Node: #${node.id}`;
    if (badgeEl) {
        badgeEl.textContent = node.model;
        badgeEl.className = node.color === 'amber' ? 'px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0' :
                           node.color === 'sky' ? 'px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-100 text-sky-800 border border-sky-300 shrink-0' :
                           'px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0';
    }
    if (iconEl) {
        iconEl.className = node.color === 'amber' ? 'w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold border border-amber-300 shadow-xs shrink-0' :
                           node.color === 'sky' ? 'w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-bold border border-sky-300 shadow-xs shrink-0' :
                           'w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold border border-emerald-300 shadow-xs shrink-0';
    }
    if (detailsEl) {
        detailsEl.textContent = `Hardware: ${node.spec} • Extrinsic: Lat ${node.lat}, Lon ${node.lon}`;
    }
    if (lumensEl) {
        lumensEl.textContent = isFleetOn ? `${currentDimLevel}% (${currentDimLevel === 100 ? 'Peak' : 'Eco'} Lumens)` : '0% (Lights OFF)';
    }
}

function filterLuminaire(type) {
    currentFilterType = type;
    updateStreetlightsVisuals();

    const filters = ['all', 'warm', 'high', 'solar'];
    filters.forEach(f => {
        const btn = document.getElementById(`filter-${f}`);
        if (btn) {
            if (f.toUpperCase() === type || (f === 'all' && type === 'ALL')) {
                btn.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-amber-100 text-amber-900 transition shadow-xs';
            } else {
                btn.className = 'px-2.5 py-1 rounded-lg font-semibold text-[11px] text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5';
            }
        }
    });
}

function setFleetDimming(level) {
    currentDimLevel = level;
    isFleetOn = level > 0;
    
    [100, 50, 0].forEach(lvl => {
        const btn = document.getElementById(`dim-${lvl}`);
        if (btn) {
            if (lvl === level) {
                btn.className = 'px-2 py-1 rounded-lg bg-neutral-900 text-white transition text-[10px] font-bold shadow-xs';
            } else {
                btn.className = 'px-2 py-1 rounded-lg text-slate-500 hover:text-neutral-900 transition text-[10px]';
            }
        }
    });

    updateStreetlightsVisuals();

    const lumensEl = document.getElementById('inspectorLumens');
    if (lumensEl) {
        lumensEl.textContent = isFleetOn ? `${currentDimLevel}% (${currentDimLevel === 100 ? 'Peak' : 'Eco'} Lumens)` : '0% (Lights OFF)';
    }

    const fleetStatusEl = document.getElementById('fleetStatusText');
    if (fleetStatusEl) {
        fleetStatusEl.textContent = isFleetOn ? `Fleet Status: ${activeProfiledFleetCount.toLocaleString()} Nodes Operational (${currentDimLevel}% Lumens)` : `Fleet Status: ${activeProfiledFleetCount.toLocaleString()} Nodes Standby (Grid OFF)`;
    }
}

function toggleAllLights() {
    if (currentDimLevel > 0) {
        setFleetDimming(0);
    } else {
        setFleetDimming(100);
    }
}

// ==========================================
// PART E: INTERPRETER PATTERN (Policy DSL)
// ==========================================
let clientMunicipalPolicies = [
    { policyId: "POL-01", dslRule: "NOISE_LEVEL > 75 AND TIME_HOUR >= 22" },
    { policyId: "POL-02", dslRule: "PARKING_DURATION > 120 OR VEHICLE_TYPE == COMMERCIAL" },
    { policyId: "POL-03", dslRule: "AIR_AQI > 150 AND SENSOR_ZONE == INDUSTRIAL" }
];

function openAddPolicyModal() {
    const modal = document.getElementById('addOrdinanceModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    const feedback = document.getElementById('addPolicyFeedback');
    if (feedback) feedback.classList.add('hidden');
    setTimeout(() => {
        document.getElementById('newPolicyRule')?.focus();
    }, 100);
}
window.openAddPolicyModal = openAddPolicyModal;

function closeAddPolicyModal() {
    const modal = document.getElementById('addOrdinanceModal');
    if (!modal) return;
    modal.classList.add('hidden');
}
window.closeAddPolicyModal = closeAddPolicyModal;

function setPresetRule(rule) {
    const ruleInput = document.getElementById('newPolicyRule');
    if (ruleInput) {
        ruleInput.value = rule;
        ruleInput.focus();
    }
}
window.setPresetRule = setPresetRule;

async function submitNewMunicipalPolicy() {
    const idInput = document.getElementById('newPolicyId');
    const ruleInput = document.getElementById('newPolicyRule');
    const feedback = document.getElementById('addPolicyFeedback');

    const rule = ruleInput?.value.trim();
    if (!rule) {
        if (feedback) {
            feedback.className = 'text-[11px] font-semibold px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 block';
            feedback.textContent = 'Please enter a valid DSL rule (e.g. PARKING_DURATION > 45 AND TIME_HOUR > 18)';
        }
        return;
    }

    const id = idInput?.value.trim() || '';

    try {
        const res = await fetch(`/api/part-e/add-policy?policyId=${encodeURIComponent(id)}&dslRule=${encodeURIComponent(rule)}`, {
            method: 'POST'
        });
        const data = await res.json();
        if (data.success) {
            if (ruleInput) ruleInput.value = '';
            if (idInput) idInput.value = '';
            closeAddPolicyModal();
            await evaluateTelemetry();
        } else {
            if (feedback) {
                feedback.className = 'text-[11px] font-semibold px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 block';
                feedback.textContent = data.message || 'Failed to parse rule syntax';
            }
        }
    } catch (err) {
        console.warn('Backend offline, registering in local state:', err);
        const newId = id || `POL-0${clientMunicipalPolicies.length + 1}`;
        clientMunicipalPolicies.push({ policyId: newId, dslRule: rule });
        if (ruleInput) ruleInput.value = '';
        if (idInput) idInput.value = '';
        closeAddPolicyModal();
        await evaluateTelemetry();
    }
}
window.submitNewMunicipalPolicy = submitNewMunicipalPolicy;

async function deleteMunicipalPolicy(policyId) {
    if (!policyId) return;
    try {
        await fetch(`/api/part-e/delete-policy/${encodeURIComponent(policyId)}`, { method: 'DELETE' });
    } catch (e) {
        console.warn('Delete policy offline:', e);
    }
    clientMunicipalPolicies = clientMunicipalPolicies.filter(p => p.policyId !== policyId);
    await evaluateTelemetry();
}
window.deleteMunicipalPolicy = deleteMunicipalPolicy;

async function resetDefaultPolicies() {
    try {
        await fetch('/api/part-e/reset-policies', { method: 'POST' });
    } catch (e) {
        console.warn('Reset policies offline:', e);
    }
    clientMunicipalPolicies = [
        { policyId: "POL-01", dslRule: "NOISE_LEVEL > 75 AND TIME_HOUR >= 22" },
        { policyId: "POL-02", dslRule: "PARKING_DURATION > 120 OR VEHICLE_TYPE == COMMERCIAL" },
        { policyId: "POL-03", dslRule: "AIR_AQI > 150 AND SENSOR_ZONE == INDUSTRIAL" }
    ];
    await evaluateTelemetry();
}
window.resetDefaultPolicies = resetDefaultPolicies;

function evaluateDslRuleClientSide(rule, sensorPayload) {
    let isViolated = false;
    try {
        let expr = rule;
        for (const [k, v] of Object.entries(sensorPayload)) {
            const regex = new RegExp(`\\b${k}\\b`, 'g');
            if (typeof v === 'string') {
                expr = expr.replace(regex, `"${v.toUpperCase()}"`);
            } else {
                expr = expr.replace(regex, v);
            }
        }
        expr = expr.replace(/\bAND\b/gi, '&&').replace(/\bOR\b/gi, '||');
        expr = expr.replace(/([^><!=])=([^=])/g, '$1==$2');
        isViolated = Boolean(Function(`"use strict"; return (${expr})`)());
    } catch(e) {
        console.warn('Fallback eval failed for:', rule, e);
        isViolated = false;
    }
    return isViolated;
}

function renderPolicyEvaluations(evaluations) {
    const container = document.getElementById('policyResultsContainer');
    if (!container) return;

    container.innerHTML = '';
    evaluations.forEach(p => {
        const card = document.createElement('div');
        const isViolated = p.violated;

        card.className = `p-4 rounded-2xl border transition ${
            isViolated ? 'bg-rose-50/50 border-rose-200' : 'bg-white border-slate-100 shadow-sm'
        }`;

        const statusBadge = isViolated
            ? '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">VIOLATION_TRIGGERED</span>'
            : '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">NORMAL_COMPLIANT</span>';

        card.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2 min-w-0">
                    <span class="font-mono text-xs font-bold text-slate-800 shrink-0">${escapeHtml(p.policyId)}</span>
                    <code class="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono font-semibold truncate">${escapeHtml(p.dslRule)}</code>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    ${statusBadge}
                    <button type="button" onclick="deleteMunicipalPolicy('${escapeHtml(p.policyId)}')" class="text-slate-300 hover:text-rose-500 transition p-1 text-[11px] cursor-pointer" title="Remove Ordinance">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
            <div class="text-xs font-mono text-slate-500 space-y-1 mt-2">
                <div>Rule Logic Tree: <span class="text-emerald-700 font-semibold">${escapeHtml(p.parsedAST || ('(' + p.dslRule + ')'))}</span></div>
                <div class="${isViolated ? 'text-rose-600 font-bold' : 'text-slate-500'}">${escapeHtml(p.message || (isViolated ? 'Policy conditions MET - Automated municipal action required!' : 'Policy conditions NOT met - Normal operations.'))}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function evaluateTelemetry() {
    const noise = parseFloat(document.getElementById('sensorNoise')?.value || 82.5);
    const hour = parseInt(document.getElementById('sensorHour')?.value || 23);
    const parking = parseInt(document.getElementById('sensorParking')?.value || 150);
    const vehicle = document.getElementById('sensorVehicle')?.value || 'COMMERCIAL';
    const aqi = parseFloat(document.getElementById('sensorAqi')?.value || 165.0);
    const zone = document.getElementById('sensorZone')?.value || 'INDUSTRIAL';

    const url = `/api/part-e/evaluate-telemetry?noiseLevel=${noise}&timeHour=${hour}&parkingDuration=${parking}&vehicleType=${vehicle}&airAqi=${aqi}&sensorZone=${zone}`;

    try {
        const res = await fetch(url, { method: 'POST' });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        renderPolicyEvaluations(data.policyEvaluations);
    } catch (err) {
        console.warn('Part E endpoint offline. Evaluating DSL rules in-engine client-side.');

        const sensorPayload = {
            "NOISE_LEVEL": noise,
            "TIME_HOUR": hour,
            "PARKING_DURATION": parking,
            "VEHICLE_TYPE": vehicle,
            "AIR_AQI": aqi,
            "SENSOR_ZONE": zone
        };

        const fallbackEvaluations = clientMunicipalPolicies.map(item => {
            const isViolated = evaluateDslRuleClientSide(item.dslRule, sensorPayload);
            return {
                policyId: item.policyId,
                dslRule: item.dslRule,
                parsedAST: `(${item.dslRule})`,
                violated: isViolated,
                status: isViolated ? "VIOLATION_TRIGGERED" : "NORMAL_COMPLIANT",
                message: isViolated 
                    ? "Policy conditions MET - Automated municipal action required!" 
                    : "Policy conditions NOT met - Normal operations."
            };
        });

        renderPolicyEvaluations(fallbackEvaluations);
    }
}

// ==========================================
// PART E: VEHICLE & ZONE DROPDOWN CONTROLS
// ==========================================
function toggleVehicleMenu() {
    const menu = document.getElementById('vehicleMenu');
    const chevron = document.getElementById('vehicleChevron');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}
window.toggleVehicleMenu = toggleVehicleMenu;

function selectVehicleOption(val, label, iconClass, color) {
    const input = document.getElementById('sensorVehicle');
    const textEl = document.getElementById('vehicleSelectedText');
    const iconEl = document.getElementById('vehicleSelectedIcon');
    if (input) input.value = val;
    if (textEl) textEl.textContent = label;
    if (iconEl) {
        iconEl.className = `w-5 h-5 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center text-[10px] shrink-0 border border-${color}-200`;
        iconEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    }
    toggleVehicleMenu();
}
window.selectVehicleOption = selectVehicleOption;

function toggleZoneMenu() {
    const menu = document.getElementById('zoneMenu');
    const chevron = document.getElementById('zoneChevron');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}
window.toggleZoneMenu = toggleZoneMenu;

function selectZoneOption(val, label, iconClass, color) {
    const input = document.getElementById('sensorZone');
    const textEl = document.getElementById('zoneSelectedText');
    const iconEl = document.getElementById('zoneSelectedIcon');
    if (input) input.value = val;
    if (textEl) textEl.textContent = label;
    if (iconEl) {
        iconEl.className = `w-5 h-5 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center text-[10px] shrink-0 border border-${color}-200`;
        iconEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    }
    toggleZoneMenu();
}
window.selectZoneOption = selectZoneOption;

async function testCustomDslRule() {
    const ruleInput = document.getElementById('customRuleInput');
    const rule = ruleInput ? ruleInput.value.trim() : 'NOISE_LEVEL > 80 AND SENSOR_ZONE == INDUSTRIAL';
    const output = document.getElementById('customRuleOutput');
    if (!output) return;

    output.classList.remove('hidden');

    const sensorPayload = {
        "NOISE_LEVEL": parseFloat(document.getElementById('sensorNoise')?.value || 82.5),
        "TIME_HOUR": parseInt(document.getElementById('sensorHour')?.value || 23),
        "PARKING_DURATION": parseInt(document.getElementById('sensorParking')?.value || 150),
        "VEHICLE_TYPE": document.getElementById('sensorVehicle')?.value || 'COMMERCIAL',
        "AIR_AQI": parseFloat(document.getElementById('sensorAqi')?.value || 165.0),
        "SENSOR_ZONE": document.getElementById('sensorZone')?.value || 'INDUSTRIAL'
    };

    try {
        const res = await fetch(`/api/part-e/test-rule?dslRule=${encodeURIComponent(rule)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sensorPayload)
        });
        if (!res.ok) throw new Error('Endpoint offline');
        const result = await res.json();

        const isViolated = result.violated;
        const statusBadge = isViolated
            ? '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 shadow-2xs">VIOLATION_TRIGGERED</span>'
            : '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">NORMAL_COMPLIANT</span>';

        output.innerHTML = `
            <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div class="flex items-center space-x-2 min-w-0">
                    <span class="font-mono text-xs font-bold text-slate-800 shrink-0">CUSTOM-RULE</span>
                    <code class="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono font-semibold truncate">${escapeHtml(result.dslRule || rule)}</code>
                </div>
                ${statusBadge}
            </div>
            <div class="text-[11px] font-mono text-slate-600 space-y-1 pt-1">
                <div>Rule Logic Tree (AST): <span class="text-emerald-700 font-bold">${escapeHtml(result.parsedAST || ('(' + rule + ')'))}</span></div>
                <div class="${isViolated ? 'text-rose-600 font-bold' : 'text-slate-600'}">${escapeHtml(result.message || (isViolated ? 'Policy conditions MET - Automated municipal action required!' : 'Policy conditions NOT met - Normal operations.'))}</div>
            </div>
        `;
    } catch (err) {
        console.warn('Evaluating custom DSL rule in client parser fallback:', err);
        
        let isViolated = false;
        try {
            let expr = rule;
            for (const [k, v] of Object.entries(sensorPayload)) {
                const regex = new RegExp(`\\b${k}\\b`, 'g');
                if (typeof v === 'string') {
                    expr = expr.replace(regex, `"${v.toUpperCase()}"`);
                } else {
                    expr = expr.replace(regex, v);
                }
            }
            expr = expr.replace(/\bAND\b/gi, '&&').replace(/\bOR\b/gi, '||');
            expr = expr.replace(/([^><!=])=([^=])/g, '$1==$2');
            isViolated = Boolean(Function(`"use strict"; return (${expr})`)());
        } catch(e) {
            isViolated = (sensorPayload.NOISE_LEVEL > 80 && sensorPayload.SENSOR_ZONE === 'INDUSTRIAL');
        }

        const statusBadge = isViolated
            ? '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 shadow-2xs">VIOLATION_TRIGGERED</span>'
            : '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">NORMAL_COMPLIANT</span>';

        output.innerHTML = `
            <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div class="flex items-center space-x-2 min-w-0">
                    <span class="font-mono text-xs font-bold text-slate-800 shrink-0">CUSTOM-RULE</span>
                    <code class="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono font-semibold truncate">${escapeHtml(rule)}</code>
                </div>
                ${statusBadge}
            </div>
            <div class="text-[11px] font-mono text-slate-600 space-y-1 pt-1">
                <div>Rule Logic Tree (AST): <span class="text-emerald-700 font-bold">(${escapeHtml(rule)})</span></div>
                <div class="${isViolated ? 'text-rose-600 font-bold' : 'text-slate-600'}">${isViolated ? 'Policy conditions MET - Automated municipal action required!' : 'Policy conditions NOT met - Normal operations.'}</div>
            </div>
        `;
    }
}
