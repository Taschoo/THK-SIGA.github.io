// Canvas

let diagramLabels = [];
let defaultData = [];
for (let i = 0; i <= parseInt(slider.max); i++) {
    diagramLabels.push(i);
    defaultData.push(0);
}

const ctxBar = document.getElementById('myBarChart').getContext('2d');
const myBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(112, 0, 0, 0.1)',
                'rgba(112, 0, 0, 0.25)',
                'rgba(112, 0, 0, 0.4)',
                'rgba(112, 0, 0, 0.55)',
                'rgba(112, 0, 0, 0.7)',
                'rgba(112, 0, 0, 0.85)'
            ],
            borderColor: [
                'rgb(112, 0, 0)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 1
            }
        },
        hover: {
            mode: null // Deaktiviert das Hover-Verhalten
        },
        events: []
    }
});

const ctxPie = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(112, 0, 0, 0.1)',
                'rgba(112, 0, 0, 0.25)',
                'rgba(112, 0, 0, 0.4)',
                'rgba(112, 0, 0, 0.55)',
                'rgba(112, 0, 0, 0.7)',
                'rgba(112, 0, 0, 0.85)'
            ],
            borderColor: [
                'rgba(112, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        scales: {
            x: {
                display: false // X-Achse ausblenden
            },
            y: {
                display: false
            }
        },
        hover: {
            mode: null // Deaktiviert das Hover-Verhalten
        },
        events: []
    }
});

const ctxMittelwert = document.getElementById('mittelwertChart').getContext('2d');
const mittelwertChart = new Chart(ctxMittelwert, {
    type: 'line',
    data: {
        labels: diagramLabels,
        datasets: [{
            data: defaultData,
            backgroundColor: 'rgba(112, 0, 0, 0.5)',
            borderColor: 'rgb(112, 0, 0)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        mode: 'vertical',
                        xMin: slider.value,   // set initial value
                        xMax: slider.value,   // set initial value
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        label: {
                            enabled: false
                        }
                    }
                ]
            }
        },
        responsive: true,
        animation: {
            duration: 0, // Setze die allgemeine Animation-Dauer auf 0, um sie zu deaktivieren
        },
        elements: {
            line: {
                tension: 0.4,
                animation: false, // Deaktiviere die Animation für die Linie
            },
            point: {
                radius: 0, // Setze den Punkt-Radius auf 0, um die Punkte zu deaktivieren
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: function() {
                        return '';  // Gibt immer einen leeren String zurück, so dass kein Label angezeigt wird
                    },
                    color: 'rgba(0, 0, 0, 0)',  // macht den Text unsichtbar
                    font: {
                        size: 1
                    }
                }
            },
            y: {
                min:0,
                max:6,
                ticks: {
                    stepsize: 1
                }
            }
        },
        hover: {
            mode: null // Deaktiviert das Hover-Verhalten
        },
        events: []
    }
});

const ctxVarianz = document.getElementById('varianzChart').getContext('2d');
const varianzChart = new Chart(ctxVarianz, {
    type: 'line',
    data: {
        labels: diagramLabels,
        datasets: [{
            data: defaultData,
            backgroundColor: 'rgba(112, 0, 0, 0.5)',
            borderColor: 'rgb(112, 0, 0)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        mode: 'vertical',
                        xMin: slider.value,   // set initial value
                        xMax: slider.value,   // set initial value
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        label: {
                            enabled: false
                        }
                    }
                ]
            }
        },
        responsive: true,
        animation: {
            duration: 0, // Setze die allgemeine Animation-Dauer auf 0, um sie zu deaktivieren
        },
        elements: {
            line: {
                tension: 0.4,
                animation: false, // Deaktiviere die Animation für die Linie
            },
            point: {
                radius: 0, // Setze den Punkt-Radius auf 0, um die Punkte zu deaktivieren
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: function() {
                        return '';  // Gibt immer einen leeren String zurück, so dass kein Label angezeigt wird
                    },
                    color: 'rgba(0, 0, 0, 0)',  // macht den Text unsichtbar
                    font: {
                        size: 1
                    }
                }
            },
            y: {
                min: 0,
                max: 6,
                ticks: {
                    stepSize: 0.5
                }
            }
        },
        hover: {
            mode: null // Deaktiviert das Hover-Verhalten
        },
        events: []
    }
});