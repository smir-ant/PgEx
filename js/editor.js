import { highlightSQL } from './highlight.js';

export function createEditor(container, onChange) {
	container.innerHTML = `
		<div class="code-editor">
			<pre class="layer mirror"></pre>
			<textarea class="layer" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"></textarea>
		</div>`;

	const textarea = container.querySelector('textarea');
	const mirror = container.querySelector('.mirror');

	function sync() {
		let text = textarea.value;
		if (text.endsWith('\n')) text += ' ';
		mirror.innerHTML = highlightSQL(text);
		mirror.scrollTop = textarea.scrollTop;
		mirror.scrollLeft = textarea.scrollLeft;
	}

	textarea.addEventListener('input', () => {
		sync();
		onChange?.(textarea.value);
	});

	textarea.addEventListener('scroll', () => {
		mirror.scrollTop = textarea.scrollTop;
		mirror.scrollLeft = textarea.scrollLeft;
	});

	textarea.addEventListener('keydown', (e) => {
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			document.execCommand('insertText', false, '    ');
		}

		if ((e.ctrlKey || e.metaKey) && e.key === '/') {
			e.preventDefault();
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const val = textarea.value;
			const lineStart = val.lastIndexOf('\n', start - 1) + 1;
			const lineEnd = val.indexOf('\n', end) !== -1 ? end + val.substring(end).indexOf('\n') : val.length;
			const lines = val.substring(lineStart, lineEnd).split('\n');
			const allCommented = lines.every(l => l.trim().startsWith('--'));

			let newText, offset;
			if (allCommented) {
				newText = lines.map(l => l.replace(/^--\s?/, '')).join('\n');
				offset = -3;
			} else {
				newText = lines.map(l => `-- ${l}`).join('\n');
				offset = 3;
			}
			textarea.setSelectionRange(lineStart, lineEnd);
			document.execCommand('insertText', false, newText);
			textarea.setSelectionRange(start + offset, end + offset * lines.length);
			sync();
		}
	});

	return {
		get value() { return textarea.value; },
		set value(v) { textarea.value = v; sync(); }
	};
}
