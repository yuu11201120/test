/* ============================================
   ShiftSync - Shift Management App
   ============================================ */

// --- Data Store ---
const Store = {
  _data: {
    members: [
      { id: 1, name: '田中 太郎', role: 'リーダー', color: '#6366f1' },
      { id: 2, name: '佐藤 花子', role: 'スタッフ', color: '#ec4899' },
      { id: 3, name: '鈴木 一郎', role: 'スタッフ', color: '#10b981' },
      { id: 4, name: '高橋 美咲', role: 'スタッフ', color: '#f59e0b' },
    ],
    shiftTypes: [
      { id: 1, name: '早番', startTime: '06:00', endTime: '14:00', color: '#3b82f6' },
      { id: 2, name: '遅番', startTime: '14:00', endTime: '22:00', color: '#8b5cf6' },
      { id: 3, name: '夜勤', startTime: '22:00', endTime: '06:00', color: '#1e293b' },
      { id: 4, name: '日勤', startTime: '09:00', endTime: '18:00', color: '#10b981' },
    ],
    shifts: [],
    nextMemberId: 5,
    nextShiftTypeId: 5,
    nextShiftId: 1,
  },

  init() {
    const saved = localStorage.getItem('shiftSync');
    if (saved) {
      try {
        this._data = JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to load saved data');
      }
    } else {
      this._generateSampleShifts();
    }
  },

  save() {
    localStorage.setItem('shiftSync', JSON.stringify(this._data));
  },

  get members() { return this._data.members; },
  get shiftTypes() { return this._data.shiftTypes; },
  get shifts() { return this._data.shifts; },

  addMember(member) {
    member.id = this._data.nextMemberId++;
    this._data.members.push(member);
    this.save();
    return member;
  },

  removeMember(id) {
    this._data.members = this._data.members.filter(m => m.id !== id);
    this._data.shifts = this._data.shifts.filter(s => s.memberId !== id);
    this.save();
  },

  addShiftType(type) {
    type.id = this._data.nextShiftTypeId++;
    this._data.shiftTypes.push(type);
    this.save();
    return type;
  },

  removeShiftType(id) {
    this._data.shiftTypes = this._data.shiftTypes.filter(t => t.id !== id);
    this._data.shifts = this._data.shifts.filter(s => s.shiftTypeId !== id);
    this.save();
  },

  addShift(shift) {
    shift.id = this._data.nextShiftId++;
    this._data.shifts.push(shift);
    this.save();
    return shift;
  },

  removeShift(id) {
    this._data.shifts = this._data.shifts.filter(s => s.id !== id);
    this.save();
  },

  getShiftsForDate(dateStr) {
    return this._data.shifts.filter(s => s.date === dateStr);
  },

  getShiftsForMember(memberId) {
    return this._data.shifts.filter(s => s.memberId === memberId);
  },

  getMember(id) {
    return this._data.members.find(m => m.id === id);
  },

  getShiftType(id) {
    return this._data.shiftTypes.find(t => t.id === id);
  },

  _generateSampleShifts() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const members = this._data.members;
    const types = this._data.shiftTypes;

    for (let d = 1; d <= daysInMonth; d++) {
      const numShifts = 2 + Math.floor(Math.random() * 2);
      const usedMembers = new Set();

      for (let i = 0; i < numShifts; i++) {
        let member;
        do {
          member = members[Math.floor(Math.random() * members.length)];
        } while (usedMembers.has(member.id) && usedMembers.size < members.length);
        usedMembers.add(member.id);

        const type = types[Math.floor(Math.random() * types.length)];
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        this._data.shifts.push({
          id: this._data.nextShiftId++,
          date: dateStr,
          memberId: member.id,
          shiftTypeId: type.id,
        });
      }
    }
    this.save();
  },
};

// --- UI Helpers ---
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function showToast(message, type = 'success') {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// --- Modal ---
const Modal = {
  open(title, bodyHtml, footerHtml) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = bodyHtml;
    $('#modalFooter').innerHTML = footerHtml;
    $('#modalOverlay').classList.add('active');
  },
  close() {
    $('#modalOverlay').classList.remove('active');
  },
};

// --- Calendar ---
const Calendar = {
  currentDate: new Date(),

  init() {
    this.render();
    this.updateMonthDisplay();

    $('#prevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
      this.updateMonthDisplay();
    });

    $('#nextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
      this.updateMonthDisplay();
    });

    $('#todayBtn').addEventListener('click', () => {
      this.currentDate = new Date();
      this.render();
      this.updateMonthDisplay();
    });
  },

  updateMonthDisplay() {
    const y = this.currentDate.getFullYear();
    const m = this.currentDate.getMonth() + 1;
    $('#calendarMonth').textContent = `${y}年 ${m}月`;
  },

  render() {
    const grid = $('#calendarGrid');
    grid.innerHTML = '';

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayOfWeek = new Date(prevYear, prevMonth, day).getDay();
      grid.appendChild(this.createDayCell(day, dateStr, true, false, dayOfWeek));
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
      const dayOfWeek = new Date(year, month, d).getDay();
      grid.appendChild(this.createDayCell(d, dateStr, false, isToday, dayOfWeek));
    }

    // Next month days
    const totalCells = grid.children.length;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayOfWeek = new Date(nextYear, nextMonth, i).getDay();
      grid.appendChild(this.createDayCell(i, dateStr, true, false, dayOfWeek));
    }
  },

  createDayCell(day, dateStr, isOtherMonth, isToday, dayOfWeek) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    if (isOtherMonth) cell.classList.add('other-month');
    if (isToday) cell.classList.add('today');
    if (dayOfWeek === 0) cell.classList.add('sun');
    if (dayOfWeek === 6) cell.classList.add('sat');

    const number = document.createElement('div');
    number.className = 'cal-day-number';
    number.textContent = day;
    cell.appendChild(number);

    const shifts = Store.getShiftsForDate(dateStr);
    const maxShow = 3;

    shifts.slice(0, maxShow).forEach(shift => {
      const member = Store.getMember(shift.memberId);
      const type = Store.getShiftType(shift.shiftTypeId);
      if (!member || !type) return;

      const tag = document.createElement('div');
      tag.className = 'cal-shift-tag';
      tag.style.background = type.color + '20';
      tag.style.color = type.color;
      tag.textContent = `${member.name.split(' ')[0]} ${type.name}`;
      cell.appendChild(tag);
    });

    if (shifts.length > maxShow) {
      const more = document.createElement('div');
      more.className = 'cal-shift-more';
      more.textContent = `+${shifts.length - maxShow} 件`;
      cell.appendChild(more);
    }

    cell.addEventListener('click', () => this.showDayDetail(dateStr));
    return cell;
  },

  showDayDetail(dateStr) {
    const [y, m, d] = dateStr.split('-');
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const title = `${parseInt(m)}月${parseInt(d)}日（${dayNames[date.getDay()]}）`;

    const shifts = Store.getShiftsForDate(dateStr);

    let bodyHtml = '';
    if (shifts.length === 0) {
      bodyHtml = `
        <div class="empty-state">
          <div class="empty-state-icon">📅</div>
          <p>この日のシフトはありません</p>
        </div>
      `;
    } else {
      bodyHtml = shifts.map(shift => {
        const member = Store.getMember(shift.memberId);
        const type = Store.getShiftType(shift.shiftTypeId);
        if (!member || !type) return '';
        return `
          <div class="day-shift-item">
            <div class="day-shift-dot" style="background: ${type.color}"></div>
            <div class="day-shift-info">
              <strong>${member.name}</strong>
              <span>${type.name}（${type.startTime} - ${type.endTime}）</span>
            </div>
            <button class="day-shift-remove" data-id="${shift.id}">&times;</button>
          </div>
        `;
      }).join('');
    }

    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">閉じる</button>
      <button class="btn btn-primary" onclick="ShiftForm.openForDate('${dateStr}')">シフト追加</button>
    `;

    Modal.open(title, bodyHtml, footerHtml);

    // Delete shift buttons
    $$('.day-shift-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        Store.removeShift(id);
        showToast('シフトを削除しました');
        Calendar.render();
        this.showDayDetail(dateStr);
        Stats.render();
      });
    });
  },
};

// --- Shift Form ---
const ShiftForm = {
  openForDate(dateStr) {
    const members = Store.members;
    const types = Store.shiftTypes;

    if (members.length === 0 || types.length === 0) {
      showToast('メンバーとシフト枠を先に登録してください', 'error');
      return;
    }

    const memberOptions = members.map(m =>
      `<option value="${m.id}">${m.name}</option>`
    ).join('');

    const typeOptions = types.map(t =>
      `<option value="${t.id}">${t.name}（${t.startTime} - ${t.endTime}）</option>`
    ).join('');

    const bodyHtml = `
      <div class="form-group">
        <label class="form-label">日付</label>
        <input type="date" class="form-input" id="shiftDate" value="${dateStr || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">メンバー</label>
        <select class="form-input form-select" id="shiftMember">${memberOptions}</select>
      </div>
      <div class="form-group">
        <label class="form-label">シフト枠</label>
        <select class="form-input form-select" id="shiftType">${typeOptions}</select>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-primary" id="saveShiftBtn">保存</button>
    `;

    Modal.open('シフト追加', bodyHtml, footerHtml);

    $('#saveShiftBtn').addEventListener('click', () => {
      const date = $('#shiftDate').value;
      const memberId = parseInt($('#shiftMember').value);
      const shiftTypeId = parseInt($('#shiftType').value);

      if (!date) {
        showToast('日付を選択してください', 'error');
        return;
      }

      // Check for duplicate
      const existing = Store.shifts.find(s =>
        s.date === date && s.memberId === memberId && s.shiftTypeId === shiftTypeId
      );
      if (existing) {
        showToast('同じシフトが既に登録されています', 'error');
        return;
      }

      Store.addShift({ date, memberId, shiftTypeId });
      showToast('シフトを追加しました');
      Modal.close();
      Calendar.render();
      Stats.render();
    });
  },

  open() {
    this.openForDate(formatDate(new Date()));
  },
};

// --- Members View ---
const Members = {
  render() {
    const grid = $('#membersGrid');
    const members = Store.members;

    if (members.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">👥</div>
          <p>メンバーが登録されていません</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = members.map(member => {
      const shifts = Store.getShiftsForMember(member.id);
      const initial = member.name.charAt(0);

      return `
        <div class="member-card">
          <div class="member-card-header">
            <div class="member-avatar" style="background: ${member.color}">${initial}</div>
            <div class="member-info">
              <h4>${member.name}</h4>
              <p>${member.role}</p>
            </div>
          </div>
          <div class="member-stats">
            <div class="member-stat">
              <div class="member-stat-value">${shifts.length}</div>
              <div class="member-stat-label">シフト回数</div>
            </div>
            <div class="member-stat">
              <div class="member-stat-value">${this.calcHours(shifts)}</div>
              <div class="member-stat-label">合計時間</div>
            </div>
          </div>
          <div class="member-card-actions">
            <button class="btn btn-outline btn-sm" onclick="Members.edit(${member.id})">編集</button>
            <button class="btn btn-sm" style="color: var(--danger)" onclick="Members.remove(${member.id})">削除</button>
          </div>
        </div>
      `;
    }).join('');
  },

  calcHours(shifts) {
    let total = 0;
    shifts.forEach(s => {
      const type = Store.getShiftType(s.shiftTypeId);
      if (!type) return;
      const [sh, sm] = type.startTime.split(':').map(Number);
      const [eh, em] = type.endTime.split(':').map(Number);
      let hours = eh - sh + (em - sm) / 60;
      if (hours < 0) hours += 24;
      total += hours;
    });
    return Math.round(total);
  },

  openAddForm() {
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];

    const bodyHtml = `
      <div class="form-group">
        <label class="form-label">名前</label>
        <input type="text" class="form-input" id="memberName" placeholder="田中 太郎">
      </div>
      <div class="form-group">
        <label class="form-label">役職</label>
        <input type="text" class="form-input" id="memberRole" placeholder="スタッフ" value="スタッフ">
      </div>
      <div class="form-group">
        <label class="form-label">カラー</label>
        <div class="color-options" id="colorOptions">
          ${colors.map((c, i) =>
            `<div class="color-option ${i === 0 ? 'selected' : ''}" data-color="${c}" style="background: ${c}"></div>`
          ).join('')}
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-primary" id="saveMemberBtn">追加</button>
    `;

    Modal.open('メンバー追加', bodyHtml, footerHtml);
    this._setupColorPicker();

    $('#saveMemberBtn').addEventListener('click', () => {
      const name = $('#memberName').value.trim();
      const role = $('#memberRole').value.trim();
      const color = $('.color-option.selected')?.dataset.color || '#6366f1';

      if (!name) {
        showToast('名前を入力してください', 'error');
        return;
      }

      Store.addMember({ name, role, color });
      showToast(`${name} を追加しました`);
      Modal.close();
      this.render();
      Stats.render();
    });
  },

  edit(id) {
    const member = Store.getMember(id);
    if (!member) return;

    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];

    const bodyHtml = `
      <div class="form-group">
        <label class="form-label">名前</label>
        <input type="text" class="form-input" id="memberName" value="${member.name}">
      </div>
      <div class="form-group">
        <label class="form-label">役職</label>
        <input type="text" class="form-input" id="memberRole" value="${member.role}">
      </div>
      <div class="form-group">
        <label class="form-label">カラー</label>
        <div class="color-options" id="colorOptions">
          ${colors.map(c =>
            `<div class="color-option ${c === member.color ? 'selected' : ''}" data-color="${c}" style="background: ${c}"></div>`
          ).join('')}
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-primary" id="saveMemberBtn">保存</button>
    `;

    Modal.open('メンバー編集', bodyHtml, footerHtml);
    this._setupColorPicker();

    $('#saveMemberBtn').addEventListener('click', () => {
      const name = $('#memberName').value.trim();
      const role = $('#memberRole').value.trim();
      const color = $('.color-option.selected')?.dataset.color || member.color;

      if (!name) {
        showToast('名前を入力してください', 'error');
        return;
      }

      member.name = name;
      member.role = role;
      member.color = color;
      Store.save();

      showToast('メンバー情報を更新しました');
      Modal.close();
      this.render();
      Calendar.render();
      Stats.render();
    });
  },

  remove(id) {
    const member = Store.getMember(id);
    if (!member) return;

    const bodyHtml = `<p><strong>${member.name}</strong> を削除しますか？<br>この操作は元に戻せません。関連するシフトも全て削除されます。</p>`;
    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-danger" id="confirmDeleteBtn">削除</button>
    `;

    Modal.open('メンバー削除', bodyHtml, footerHtml);

    $('#confirmDeleteBtn').addEventListener('click', () => {
      Store.removeMember(id);
      showToast(`${member.name} を削除しました`);
      Modal.close();
      this.render();
      Calendar.render();
      Stats.render();
    });
  },

  _setupColorPicker() {
    $$('.color-option').forEach(opt => {
      opt.addEventListener('click', () => {
        $$('.color-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
  },
};

// --- Shift Types View ---
const ShiftTypes = {
  render() {
    const list = $('#shiftTypesList');
    const types = Store.shiftTypes;

    if (types.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⏰</div>
          <p>シフト枠が登録されていません</p>
        </div>
      `;
      return;
    }

    list.innerHTML = types.map(type => `
      <div class="shift-type-card">
        <div class="shift-type-color" style="background: ${type.color}"></div>
        <div class="shift-type-info">
          <h4>${type.name}</h4>
          <p>${type.startTime} 〜 ${type.endTime}</p>
        </div>
        <div class="shift-type-actions">
          <button class="btn btn-outline btn-sm" onclick="ShiftTypes.edit(${type.id})">編集</button>
          <button class="btn btn-sm" style="color: var(--danger)" onclick="ShiftTypes.remove(${type.id})">削除</button>
        </div>
      </div>
    `).join('');
  },

  openAddForm() {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#1e293b', '#ec4899', '#14b8a6'];

    const bodyHtml = `
      <div class="form-group">
        <label class="form-label">シフト名</label>
        <input type="text" class="form-input" id="typeName" placeholder="早番">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">開始時間</label>
          <input type="time" class="form-input" id="typeStart" value="09:00">
        </div>
        <div class="form-group">
          <label class="form-label">終了時間</label>
          <input type="time" class="form-input" id="typeEnd" value="18:00">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">カラー</label>
        <div class="color-options" id="colorOptions">
          ${colors.map((c, i) =>
            `<div class="color-option ${i === 0 ? 'selected' : ''}" data-color="${c}" style="background: ${c}"></div>`
          ).join('')}
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-primary" id="saveTypeBtn">追加</button>
    `;

    Modal.open('シフト枠追加', bodyHtml, footerHtml);
    Members._setupColorPicker();

    $('#saveTypeBtn').addEventListener('click', () => {
      const name = $('#typeName').value.trim();
      const startTime = $('#typeStart').value;
      const endTime = $('#typeEnd').value;
      const color = $('.color-option.selected')?.dataset.color || '#3b82f6';

      if (!name) {
        showToast('シフト名を入力してください', 'error');
        return;
      }

      Store.addShiftType({ name, startTime, endTime, color });
      showToast(`${name} を追加しました`);
      Modal.close();
      this.render();
    });
  },

  edit(id) {
    const type = Store.getShiftType(id);
    if (!type) return;

    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#1e293b', '#ec4899', '#14b8a6'];

    const bodyHtml = `
      <div class="form-group">
        <label class="form-label">シフト名</label>
        <input type="text" class="form-input" id="typeName" value="${type.name}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">開始時間</label>
          <input type="time" class="form-input" id="typeStart" value="${type.startTime}">
        </div>
        <div class="form-group">
          <label class="form-label">終了時間</label>
          <input type="time" class="form-input" id="typeEnd" value="${type.endTime}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">カラー</label>
        <div class="color-options" id="colorOptions">
          ${colors.map(c =>
            `<div class="color-option ${c === type.color ? 'selected' : ''}" data-color="${c}" style="background: ${c}"></div>`
          ).join('')}
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-primary" id="saveTypeBtn">保存</button>
    `;

    Modal.open('シフト枠編集', bodyHtml, footerHtml);
    Members._setupColorPicker();

    $('#saveTypeBtn').addEventListener('click', () => {
      const name = $('#typeName').value.trim();
      const startTime = $('#typeStart').value;
      const endTime = $('#typeEnd').value;
      const color = $('.color-option.selected')?.dataset.color || type.color;

      if (!name) {
        showToast('シフト名を入力してください', 'error');
        return;
      }

      type.name = name;
      type.startTime = startTime;
      type.endTime = endTime;
      type.color = color;
      Store.save();

      showToast('シフト枠を更新しました');
      Modal.close();
      this.render();
      Calendar.render();
    });
  },

  remove(id) {
    const type = Store.getShiftType(id);
    if (!type) return;

    const bodyHtml = `<p><strong>${type.name}</strong> を削除しますか？<br>関連するシフトも全て削除されます。</p>`;
    const footerHtml = `
      <button class="btn btn-outline" onclick="Modal.close()">キャンセル</button>
      <button class="btn btn-danger" id="confirmDeleteBtn">削除</button>
    `;

    Modal.open('シフト枠削除', bodyHtml, footerHtml);

    $('#confirmDeleteBtn').addEventListener('click', () => {
      Store.removeShiftType(id);
      showToast(`${type.name} を削除しました`);
      Modal.close();
      this.render();
      Calendar.render();
      Stats.render();
    });
  },
};

// --- Stats View ---
const Stats = {
  render() {
    this.renderCards();
    this.renderChart();
  },

  renderCards() {
    const container = $('#statsCards');
    const totalShifts = Store.shifts.length;
    const totalMembers = Store.members.length;
    const totalTypes = Store.shiftTypes.length;

    // Unique days with shifts
    const uniqueDays = new Set(Store.shifts.map(s => s.date)).size;

    container.innerHTML = `
      <div class="stat-card">
        <div class="stat-card-icon" style="background: var(--primary-bg); color: var(--primary);">📋</div>
        <div class="stat-card-value">${totalShifts}</div>
        <div class="stat-card-label">総シフト数</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon" style="background: var(--success-bg); color: var(--success);">👥</div>
        <div class="stat-card-value">${totalMembers}</div>
        <div class="stat-card-label">メンバー数</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon" style="background: var(--warning-bg); color: var(--warning);">⏰</div>
        <div class="stat-card-value">${totalTypes}</div>
        <div class="stat-card-label">シフト枠数</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon" style="background: var(--danger-bg); color: var(--danger);">📅</div>
        <div class="stat-card-value">${uniqueDays}</div>
        <div class="stat-card-label">稼働日数</div>
      </div>
    `;
  },

  renderChart() {
    const container = $('#statsChart');
    const members = Store.members;

    if (members.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>メンバーが登録されていません</p></div>';
      return;
    }

    const data = members.map(m => ({
      name: m.name,
      color: m.color,
      count: Store.getShiftsForMember(m.id).length,
    }));

    const maxCount = Math.max(...data.map(d => d.count), 1);

    container.innerHTML = data.map(d => `
      <div class="stats-bar-row">
        <div class="stats-bar-label">${d.name.split(' ')[0]}</div>
        <div class="stats-bar-track">
          <div class="stats-bar-fill" style="width: ${(d.count / maxCount) * 100}%; background: ${d.color};">
            ${d.count > 0 ? d.count + '回' : ''}
          </div>
        </div>
        <div class="stats-bar-count">${d.count}</div>
      </div>
    `).join('');
  },
};

// --- Navigation ---
const Nav = {
  init() {
    const navItems = $$('.nav-item');
    const views = $$('.view');
    const titles = {
      calendar: 'カレンダー',
      members: 'メンバー',
      shifts: 'シフト枠',
      stats: '統計',
    };

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const viewName = item.dataset.view;

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        views.forEach(v => v.classList.remove('active'));
        $(`#${viewName}View`).classList.add('active');

        $('#pageTitle').textContent = titles[viewName] || '';

        // Re-render the target view
        if (viewName === 'members') Members.render();
        if (viewName === 'shifts') ShiftTypes.render();
        if (viewName === 'stats') Stats.render();

        // Close mobile sidebar
        $('#sidebar').classList.remove('open');
      });
    });
  },
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  Store.init();

  // Navigation
  Nav.init();

  // Calendar
  Calendar.init();

  // Date display
  const now = new Date();
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  $('#currentDate').textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日（${days[now.getDay()]}）`;

  // Header add shift button
  $('#addShiftBtn').addEventListener('click', () => ShiftForm.open());

  // Member add button
  $('#addMemberBtn').addEventListener('click', () => Members.openAddForm());

  // Shift type add button
  $('#addShiftTypeBtn').addEventListener('click', () => ShiftTypes.openAddForm());

  // Modal close
  $('#modalClose').addEventListener('click', () => Modal.close());
  $('#modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) Modal.close();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Modal.close();
  });

  // Mobile menu toggle
  $('#menuToggle').addEventListener('click', () => {
    $('#sidebar').classList.toggle('open');
  });

  // Initial renders
  Members.render();
  ShiftTypes.render();
  Stats.render();
});
