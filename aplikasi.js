const KEY = 'data_mahasiswa';

function ambilData() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function simpanSemua(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tambahBarisTabel(idx, mhs) {
  const tbody = document.getElementById('tbodyMahasiswa');
  const empty = document.getElementById('emptyRow');
  if (empty) empty.remove();

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="py-2 align-top">${idx}</td>
    <td class="py-2 align-top">${escapeHtml(mhs.nama)}</td>
    <td class="py-2 align-top">
      <div class="text-xs" style="color:#64748b">NIM: ${escapeHtml(mhs.nim)}</div>
      <div class="text-xs" style="color:#64748b">Semester: ${escapeHtml(mhs.semester)}</div>
      <div class="text-xs" style="color:#64748b">Prodi: ${escapeHtml(mhs.prodi)}</div>
      <div class="text-xs" style="color:#64748b">Email: ${escapeHtml(mhs.email)}</div>
    </td>`;
  tbody.appendChild(tr);
}

function updateJumlah(n) {
  const el = document.getElementById('jumlah');
  if (el) el.textContent = n;
}

function resetFormUI() {
  const form = document.getElementById('formMahasiswa');
  if (form) form.reset();
}

function renderAwal() {
  const data = ambilData();
  updateJumlah(data.length);
  data.forEach((m, i) => tambahBarisTabel(i + 1, m));
}

document.addEventListener('DOMContentLoaded', () => {
  renderAwal();

  const form = document.getElementById('formMahasiswa');
  const resetBtn = document.getElementById('resetBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const mhs = {
        nama: form.nama.value.trim(),
        nim: form.nim.value.trim(),
        semester: form.semester.value.trim(),
        prodi: form.prodi.value.trim(),
        email: form.email.value.trim()
      };

      if (!mhs.nama) {
        alert('Nama wajib diisi');
        return;
      }
      if (!/^\d+$/.test(mhs.nim)) {
        alert('NIM harus berupa angka');
        return;
      }
      if (mhs.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mhs.email)) {
        alert('Format email salah');
        return;
      }

      console.log('Mengirim data mahasiswa:', mhs);

      const arr = ambilData();
      arr.push(mhs);
      simpanSemua(arr);

      tambahBarisTabel(arr.length, mhs);
      updateJumlah(arr.length);
      resetFormUI();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetFormUI();
    });
  }
});