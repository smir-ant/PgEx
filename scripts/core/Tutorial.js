export class Tutorial {
    constructor(i18n) {
        this.i18n = i18n;
        this.currentStep = 0;
        this.isActive = false;
        this.steps = [
            {
                target: '#sect_theory',
                textKey: 'tutorial.step1'
            },
            {
                target: '#sect_practice', // Highlight both schema and practice
                additionalTargets: ['#schema'],
                textKey: 'tutorial.step2'
            },
            {
                target: '#schema',
                textKey: 'tutorial.step3'
            },
            {
                target: '#schema figcaption .mono', // All table names
                textKey: 'tutorial.step4'
            },
            {
                target: '.code-editor', // Highlight the code editor container
                textKey: 'tutorial.step5'
            },
            {
                target: '#containerTable',
                textKey: 'tutorial.step6'
            },
            {
                target: '#status',
                textKey: 'tutorial.step7'
            },
            {
                target: '#group_task',
                textKey: 'tutorial.step8'
            }
        ];

        this.overlay = null;
        this.tooltip = null;

        // Bind methods
        this.next = this.next.bind(this);
        this.stop = this.stop.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        document.body.classList.add('tutorial-active');
        this.currentStep = 0;
        this.createOverlay();
        this.renderStep();
        window.addEventListener('resize', this.handleResize);
    }

    stop() {
        this.isActive = false;
        document.body.classList.remove('tutorial-active');
        this.removeOverlay();
        window.removeEventListener('resize', this.handleResize);
    }

    next() {
        this.currentStep++;
        if (this.currentStep >= this.steps.length) {
            this.stop();
        } else {
            this.renderStep();
        }
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'tutorial-overlay';
        document.body.appendChild(this.overlay);

        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tutorial-tooltip';
        document.body.appendChild(this.tooltip);
    }

    removeOverlay() {
        if (this.overlay) this.overlay.remove();
        if (this.tooltip) this.tooltip.remove();

        // Remove highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
            el.style.position = '';
            el.style.zIndex = '';
            el.style.backgroundColor = '';
            el.style.boxShadow = '';
        });
    }

    renderStep() {
        // Clear previous highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
            el.style.position = '';
            el.style.zIndex = '';
            el.style.backgroundColor = '';
            el.style.boxShadow = '';
        });

        const step = this.steps[this.currentStep];
        const target = document.querySelector(step.target);

        if (!target) {
            console.warn(`Tutorial target not found: ${step.target}`);
            this.next(); // Skip if target missing
            return;
        }

        // Scroll to target
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight target(s)
        const targets = [target];
        if (step.additionalTargets) {
            step.additionalTargets.forEach(sel => {
                const el = document.querySelector(sel);
                if (el) targets.push(el);
            });
        }

        // Special handling for multiple elements (step 4)
        if (step.target.includes('figcaption')) {
            document.querySelectorAll(step.target).forEach(el => targets.push(el));
        }

        targets.forEach(el => {
            el.classList.add('tutorial-highlight');
            // Ensure element is visible above overlay
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.position === 'static') {
                el.style.position = 'relative';
            }
            el.style.zIndex = '10001';
            // Use box-shadow for border to avoid layout shifts
            // Background is handled by CSS or kept transparent if needed
        });

        // Position tooltip
        this.updateTooltip(target, step.textKey);
    }

    updateTooltip(target, textKey) {
        const rect = target.getBoundingClientRect();
        const text = this.i18n.t(textKey);
        const isLast = this.currentStep === this.steps.length - 1;
        const nextText = isLast ? this.i18n.t('tutorial.finish') : this.i18n.t('tutorial.next');

        this.tooltip.innerHTML = `
            <div class="tutorial-content">
                <p>${text}</p>
                <div class="tutorial-actions">
                    <button class="btn-text tutorial-skip">${this.i18n.t('tutorial.skip')}</button>
                    <button class="btn tutorial-next">${nextText}</button>
                </div>
            </div>
        `;

        // Position logic - Center of screen for simplicity and visibility
        // as requested by user ("center of screen for simplicity for now")
        this.tooltip.style.top = '50%';
        this.tooltip.style.left = '50%';
        this.tooltip.style.transform = 'translate(-50%, -50%)';
        this.tooltip.style.position = 'fixed';

        // Bind events
        this.tooltip.querySelector('.tutorial-next').onclick = this.next;
        this.tooltip.querySelector('.tutorial-skip').onclick = this.stop;
    }

    handleResize() {
        if (this.isActive) {
            this.renderStep();
        }
    }
}
