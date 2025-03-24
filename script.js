document.addEventListener('DOMContentLoaded', function() {
    const formTugas = document.getElementById('form-tugas');
    const daftarTugas = document.getElementById('daftar-tugas');
    const inputTugas = document.getElementById('tugas');
    const inputDeadline = document.getElementById('deadline');
    const inputDeskripsi = document.getElementById('deskripsi');
    const templateTugas = document.getElementById('tugas-template');
    
    const STORAGE_KEY = 'daftar-tugas';
    let daftarTugasArray = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    renderTugas();
    
    formTugas.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tugasBaru = {
            id: Date.now(),
            tugas: inputTugas.value,
            deadline: inputDeadline.value,
            deskripsi: inputDeskripsi.value
        };
        
        daftarTugasArray.push(tugasBaru);
        simpanKeStorage();
        renderTugas();
        formTugas.reset();
    });
    
    function renderTugas() {
        daftarTugas.innerHTML = '';
        
        if (daftarTugasArray.length === 0) {
            daftarTugas.innerHTML = '<div class="no-tasks">Tidak ada tugas</div>';
            return;
        }
        
        daftarTugasArray.forEach(tugas => {
            const kartuTugas = document.importNode(templateTugas.content, true).querySelector('.task-card');
            
            kartuTugas.querySelector('.nama-tugas').textContent = tugas.tugas;
            kartuTugas.querySelector('.deskripsi-tugas').textContent = tugas.deskripsi || 'Tidak ada deskripsi';
            
            const tanggalDeadline = new Date(tugas.deadline);
            const tanggalFormatted = tanggalDeadline.toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            kartuTugas.querySelector('.deadline-date').textContent = tanggalFormatted;
            
            kartuTugas.dataset.tugasId = tugas.id;
            
            kartuTugas.querySelector('.btn-hapus').addEventListener('click', function() {
                daftarTugasArray = daftarTugasArray.filter(item => item.id !== tugas.id);
                simpanKeStorage();
                renderTugas();
            });
            
            daftarTugas.appendChild(kartuTugas);
        });
    }
    
    function simpanKeStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarTugasArray));
    }
});