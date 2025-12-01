// Simple syntax highlighting sync
const sqlInput = document.getElementById('sqlInput');
const colored = document.getElementById('colored');

function syncHighlight() {
    if (!sqlInput || !colored) return;

    let text = sqlInput.value;

    // Ensure final newline is handled for scrolling
    if (text[text.length - 1] === "\n") {
        text += " ";
    }

    // Escape HTML to prevent XSS and rendering issues
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Use Prism if available, otherwise just text
    if (window.Prism) {
        colored.innerHTML = Prism.highlight(text, Prism.languages.sql, 'sql');
    } else {
        colored.innerHTML = text;
    }

    // Sync scroll
    colored.scrollTop = sqlInput.scrollTop;
    colored.scrollLeft = sqlInput.scrollLeft;
}

if (sqlInput) {
    sqlInput.addEventListener('input', syncHighlight);
    sqlInput.addEventListener('scroll', () => {
        if (colored) {
            colored.scrollTop = sqlInput.scrollTop;
            colored.scrollLeft = sqlInput.scrollLeft;
        }
    });
    // Initial sync
    syncHighlight();
}

// Export for external use if needed
window.syncHighlight = syncHighlight;
