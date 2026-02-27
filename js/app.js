import { createApp, reactive } from 'petite-vue';
import { init, query, checkAnswer } from './db.js';
import { createEditor } from './editor.js';
import lesson01 from '../lessons/01/practice.js';
import lesson02 from '../lessons/02/practice.js';
import lesson03 from '../lessons/03/practice.js';

const lessons = { lesson01, lesson02, lesson03 };
let editor = null;

// `text` → <code>text</code>
function md(str) {
	return str.replace(/`([^`]+)`/g, '<code>$1</code>');
}

const store = reactive({
	page: 'home',
	allLessons: Object.values(lessons),
	lesson: null,
	theory: '',
	taskIndex: 0,
	fields: [],
	rows: [],
	status: '',

	taskDesc(i) {
		return md(store.lesson.tasks[i].desc);
	},

	showSolution(i) {
		if (!confirm('Показать решение?\n\nНажимая ОК, вы подтверждаете что попытались решить задание самостоятельно.')) return;
		const sol = store.lesson.tasks[i].solution;
		if (editor) editor.value = sol;
		execQuery(sol);
	}
});

async function execQuery(sql) {
	if (!sql.trim()) return;
	try {
		const result = await query(sql.trim());
		store.fields = result.fields;
		store.rows = result.rows;
		store.status = `Возвращено строк: ${result.rows.length}`;

		if (store.lesson && store.taskIndex < store.lesson.tasks.length) {
			const correct = await checkAnswer(result, store.lesson.tasks[store.taskIndex].solution);
			if (correct) {
				store.taskIndex++;
				if (store.taskIndex >= store.lesson.tasks.length) {
					store.status = 'Все задания выполнены!';
				} else {
					store.status = 'Верно!';
				}
			}
		}
	} catch (e) {
		store.status = `Ошибка: ${e.message}`;
	}
}

async function openLesson(lesson) {
	store.lesson = lesson;
	store.theory = '';
	store.taskIndex = 0;
	store.fields = [];
	store.rows = [];
	store.status = 'Инициализация базы данных...';
	store.page = 'lesson';

	// Load theory HTML from separate file
	fetch(`lessons/${lesson.slug.replace('lesson', '')}/theory.html`)
		.then(r => r.text())
		.then(html => { store.theory = html; });

	// DOM updates after microtask — wait one frame to mount editor
	requestAnimationFrame(async () => {
		const mount = document.getElementById('editorMount');
		if (mount) {
			mount.innerHTML = '';
			editor = createEditor(mount, sql => execQuery(sql));
		}

		await init(lesson.schema);
		const initialSql = `SELECT * FROM ${lesson.schema[0].name};`;
		if (editor) editor.value = initialSql;
		await execQuery(initialSql);
		if (!store.status.startsWith('Ошибка')) {
			store.status = 'Готово. Введите запрос.';
		}
	});
}

function navigate() {
	const hash = location.hash.slice(1) || '/';
	if (hash.startsWith('/lesson/')) {
		const slug = hash.slice(8);
		const lesson = lessons[slug];
		if (!lesson) { store.page = 'notfound'; return; }
		openLesson(lesson);
	} else {
		store.page = 'home';
		store.lesson = null;
		editor = null;
	}
}

createApp(store).mount('main');
window.addEventListener('hashchange', navigate);
navigate();
