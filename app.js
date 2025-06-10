document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const prioritySelect = document.getElementById('priority-select');
  const memoInput = document.getElementById('memo-input');
  const fileInput = document.getElementById('file-input');
  const calendarView = document.getElementById('calendar-view');
  const timelineView = document.getElementById('timeline-view');
  const listViewBtn = document.getElementById('list-view-btn');
  const calendarViewBtn = document.getElementById('calendar-view-btn');
  const timelineViewBtn = document.getElementById('timeline-view-btn');
  const themeToggle = document.getElementById('theme-toggle');

  let todos = [];

  function createTodoItem(todo) {
    const li = document.createElement('li');
    li.classList.add(`priority-${todo.priority}`);

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.done) span.classList.add('line-through');

    // 우선순위/긴급도 표시
    const priorityBadge = document.createElement('span');
    priorityBadge.className = 'priority-badge';
    priorityBadge.textContent = todo.priority;
    li.appendChild(priorityBadge);

    // 메모 표시
    if (todo.memo) {
      const memoDiv = document.createElement('div');
      memoDiv.className = 'todo-memo';
      memoDiv.textContent = `메모: ${todo.memo}`;
      li.appendChild(memoDiv);
    }

    // 첨부파일 표시
    if (todo.file) {
      const fileDiv = document.createElement('div');
      fileDiv.className = 'todo-file';
      const fileLink = document.createElement('a');
      fileLink.href = todo.file;
      fileLink.target = '_blank';
      fileLink.textContent = '첨부파일';
      fileDiv.appendChild(fileLink);
      li.appendChild(fileDiv);
    }

    const btns = document.createElement('div');
    btns.className = 'todo-btns';

    const doneBtn = document.createElement('button');
    doneBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
    doneBtn.className = 'todo-btn done';
    doneBtn.title = '완료';
    doneBtn.onclick = () => {
      span.classList.toggle('line-through');
      todo.done = !todo.done;
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
    deleteBtn.className = 'todo-btn delete';
    deleteBtn.title = '삭제';
    deleteBtn.onclick = () => {
      todos = todos.filter(t => t !== todo);
      renderTodos();
    };

    btns.appendChild(doneBtn);
    btns.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(btns);
    return li;
  }

  function renderTodos() {
    list.innerHTML = '';
    todos.forEach(todo => {
      list.appendChild(createTodoItem(todo));
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const value = input.value.trim();
    const priority = prioritySelect.value;
    const memo = memoInput.value.trim();
    let fileUrl = '';
    if (fileInput.files[0]) {
      fileUrl = URL.createObjectURL(fileInput.files[0]);
    }
    if (value) {
      todos.push({ text: value, priority, memo, file: fileUrl, done: false });
      renderTodos();
      input.value = '';
      memoInput.value = '';
      fileInput.value = '';
      input.focus();
    }
  };

  // 뷰 전환
  listViewBtn.onclick = () => {
    list.style.display = '';
    calendarView.style.display = 'none';
    timelineView.style.display = 'none';
  };
  calendarViewBtn.onclick = () => {
    list.style.display = 'none';
    calendarView.style.display = '';
    timelineView.style.display = 'none';
    renderCalendarView();
  };
  timelineViewBtn.onclick = () => {
    list.style.display = 'none';
    calendarView.style.display = 'none';
    timelineView.style.display = '';
    renderTimelineView();
  };

  // 달력/타임라인 뷰(간단 예시)
  function renderCalendarView() {
    calendarView.innerHTML = '<div style="text-align:center;">달력 뷰 (예시)</div>';
    // 실제 구현 시 날짜별로 할 일 표시
  }
  function renderTimelineView() {
    timelineView.innerHTML = '<div style="text-align:center;">타임라인 뷰 (예시)</div>';
    // 실제 구현 시 시간순 정렬 등 표시
  }

  // 다크모드/테마
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  themeToggle.onclick = () => {
    const current = document.body.getAttribute('data-theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  };
  // 초기 테마 적용
  setTheme(localStorage.getItem('theme') || 'light');

  renderTodos();
});