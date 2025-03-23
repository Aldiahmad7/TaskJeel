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
        
        const tugasSection = document.querySelector('.tasks-section');
        tugasSection.style.backgroundColor = 'rgba(108, 92, 231, 0.05)';
        setTimeout(() => {
            tugasSection.style.backgroundColor = '';
        }, 300);
    });
    
    function renderTugas() {
        daftarTugas.innerHTML = '';
        
        if (daftarTugasArray.length === 0) {
            const elemenKosong = document.createElement('div');
            elemenKosong.className = 'no-tasks';
            elemenKosong.textContent = 'Tidak ada tugas';
            daftarTugas.appendChild(elemenKosong);
            return;
        }
        
        daftarTugasArray.forEach(tugas => {
            const kartuTugas = document.importNode(templateTugas.content, true).querySelector('.task-card');
            
            kartuTugas.querySelector('.nama-tugas').textContent = tugas.tugas;
            kartuTugas.querySelector('.deskripsi-tugas').textContent = tugas.deskripsi || 'Tidak ada deskripsi';
            
            const tanggalDeadline = new Date(tugas.deadline);
            const opsiFormat = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const tanggalFormatted = tanggalDeadline.toLocaleDateString('id-ID', opsiFormat);
            kartuTugas.querySelector('.deadline-date').textContent = tanggalFormatted;
            
            kartuTugas.dataset.tugasId = tugas.id;
            
            daftarTugas.appendChild(kartuTugas);
        });
        
        tambahEventTombol();
    }
    
    function tambahEventTombol() {
        document.querySelectorAll('.btn-hapus').forEach(tombol => {
            tombol.addEventListener('click', function() {
                const kartuTugas = this.closest('.task-card');
                const tugasId = parseInt(kartuTugas.dataset.tugasId);
                
                kartuTugas.style.opacity = '0';
                kartuTugas.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    daftarTugasArray = daftarTugasArray.filter(tugas => tugas.id !== tugasId);
                    
                    simpanKeStorage();
                    
                    renderTugas();
                }, 300);
            });
        });
    }
    
    function simpanKeStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarTugasArray));
    }
});