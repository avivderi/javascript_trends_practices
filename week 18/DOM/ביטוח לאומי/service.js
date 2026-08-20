let reports = [];

try {
    const res = localStorage.getItem('reports');
    reports = res ? JSON.parse(res) : [];
} catch (error) {
    console.error("שגיאה בטעינת נתונים מ-localStorage:", error);
}

function saveReports() {
    localStorage.setItem("reports", JSON.stringify(reports));
}

function resetReports() {
    localStorage.removeItem("reports");
    reports = [];
    loadReports();
}

const addRowToTable = (cls, content, row) => {
    const td = document.createElement('td');
    
    if (cls === 'priority' || cls === 'status') {
        const span = document.createElement('span');
        span.classList.add(cls);
        span.textContent = content;
        td.appendChild(span);
    } else {
        td.classList.add(cls);
        td.textContent = content;
    }
    
    row.append(td);
};

const loadReports = () => {
    const tbody = document.querySelector('#table-body');
    const totalReports = document.querySelector('#total-reports');
    const totalReporters = document.querySelector('#total-reporters');

    if (!tbody) return;

    tbody.innerHTML = '';
    
    if (reports && reports.length > 0) {
        reports.forEach(report => {
            const row = document.createElement("tr");
            
            addRowToTable('id-num', report['id-num'], row);
            addRowToTable('name', report.name, row);
            addRowToTable('title', report.title, row);
            addRowToTable('priority', report.priority, row);
            addRowToTable('details', report.details, row);
            addRowToTable('date', report.date, row);
            addRowToTable('status', report.status, row);

            tbody.append(row);
        });
    }

    const uniqueNamesCount = new Set(reports.map(report => report.name.trim()).filter(Boolean)).size;
    
    if (totalReports) totalReports.textContent = reports.length;
    if (totalReporters) totalReporters.textContent = uniqueNamesCount;
};

document.addEventListener('DOMContentLoaded', () => {
    loadReports();

    const sendButton = document.querySelector('#send-report');
    const form = document.querySelector('form');

    if (sendButton) {
        sendButton.addEventListener("click", (e) => {
            e.preventDefault();

            const reportName = document.querySelector('#report-name');
            const reportTitle = document.querySelector('#report-title');
            const reportPriority = document.querySelector('#report-priority');
            const reportDetails = document.querySelector('#report-details');

            if (!reportName.value.trim() || !reportDetails.value.trim()) {
                // alert('אנא מלא את כל שדות החובה המסומנים בכוכבית (*)');
                return;
            }

            const priorityTexts = {
                'regular': 'רגילה',
                'urgent': 'דחוף',
                'critical': 'דחוף מאוד'
            };

            const titleTexts = {
                'call': 'זמן המתנה בטלפון',
                'app': 'אתר / אפליקציה',
                'branch': 'שירות בסניף',
                'other': 'אחר'
            };

            const newReport = {
                "id-num": `#${String(reports.length + 1).padStart(3, '0')}`,
                name: reportName.value.trim(),
                title: titleTexts[reportTitle.value] || 'כללי',
                priority: priorityTexts[reportPriority.value] || 'רגילה',
                details: reportDetails.value.trim(),
                date: new Date().toLocaleDateString('he-IL'),
                status: "לא טופל"
            };

            reports.push(newReport);
            saveReports();

            window.location.href = './Complaints_Log.html';
        });
    }

    const resetBtn = document.querySelector('.table-header .btn-secondary');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
                resetReports();
        });
    }
});