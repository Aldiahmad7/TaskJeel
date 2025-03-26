document.addEventListener('DOMContentLoaded', function() {
    const formTugas = document.getElementById('form-tugas');
    const daftarTugas = document.getElementById('daftar-tugas');
    const inputTugas = document.getElementById('tugas');
    const inputDeadline = document.getElementById('deadline');
    const inputDeskripsi = document.getElementById('deskripsi');
    const templateTugas = document.getElementById('tugas-template');
    const formSection = document.getElementById('form-section');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    let daftarTugasArray = [];
    
    renderTugas();
    
    hamburgerBtn.addEventListener('click', function() {
        formSection.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });
    
    formTugas.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tugasBaru = {
            id: Date.now(), 
            tugas: inputTugas.value,
            deadline: inputDeadline.value,
            deskripsi: inputDeskripsi.value
        };
        
        daftarTugasArray.push(tugasBaru);
        
        renderTugas();
        
        formTugas.reset();
        
        if (window.innerWidth <= 768) {
            formSection.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
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
            kartuTugas.querySelector('.deskripsi-tugas').textContent = tugas.deskripsi;
            
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
                
                renderTugas();
            });
            
            daftarTugas.appendChild(kartuTugas);
        });
    }
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !formSection.contains(e.target) && 
            !hamburgerBtn.contains(e.target) && 
            formSection.classList.contains('active')) {
            formSection.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
});