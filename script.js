// Common medicines database with categories
const medicines = {
    "Antibiotics": [
        "Amoxicillin 500mg",
        "Azithromycin 250mg",
        "Cefixime 200mg",
        "Doxycycline 100mg",
        "Ciprofloxacin 500mg"
    ],
    "Pain Relief": [
        "Paracetamol 500mg",
        "Ibuprofen 400mg",
        "Diclofenac 50mg",
        "Tramadol 50mg",
        "Aceclofenac 100mg"
    ],
    "Antacids": [
        "Pantoprazole 40mg",
        "Omeprazole 20mg",
        "Ranitidine 150mg",
        "Famotidine 20mg"
    ],
    "Antiallergics": [
        "Cetirizine 10mg",
        "Levocetirizine 5mg",
        "Fexofenadine 120mg",
        "Montelukast 10mg"
    ],
    "Vitamins": [
        "Vitamin B-Complex",
        "Vitamin C 500mg",
        "Vitamin D3 60000IU",
        "Calcium + Vitamin D3",
        "Multivitamin"
    ],
    "Antidiabetics": [
        "Metformin 500mg",
        "Glimepiride 1mg",
        "Vildagliptin 50mg",
        "Teneligliptin 20mg"
    ],
    "Antihypertensives": [
        "Amlodipine 5mg",
        "Telmisartan 40mg",
        "Losartan 50mg",
        "Enalapril 5mg"
    ]
};

// DOM Elements
const medicineDropdown = document.getElementById('medicineDropdown');
const addButton = document.getElementById('addMedicine');
const selectedMedicinesList = document.getElementById('selectedMedicines');
const printButton = document.getElementById('printButton');
const patientNameInput = document.getElementById('patientName');
const patientAgeInput = document.getElementById('patientAge');
const dateInput = document.getElementById('date');

// Initialize date input with the current date
dateInput.valueAsDate = new Date();

// Populate the dropdown with medicine categories and options
function populateDropdown() {
    medicineDropdown.innerHTML = '<option value="">Select Medicine</option>';
    for (let category in medicines) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        medicines[category].forEach(medicine => {
            const option = document.createElement('option');
            option.value = medicine;
            option.textContent = medicine;
            optgroup.appendChild(option);
        });
        medicineDropdown.appendChild(optgroup);
    }
}

// Add medicine to the prescription list
function addMedicine() {
    const selectedMedicine = medicineDropdown.value;
    if (!selectedMedicine) {
        alert('Please select a medicine before adding!');
        return;
    }

    const medicineDiv = document.createElement('div');
    medicineDiv.className = 'medicine-item';
    medicineDiv.innerHTML = `
        <div class="medicine-details">
            <span class="medicine-name">${selectedMedicine}</span>
            <input type="text" class="dosage-input" placeholder="Dosage instructions">
        </div>
        <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

    selectedMedicinesList.appendChild(medicineDiv);
    // Clear the dropdown selection after adding
    medicineDropdown.value = '';
    // Add a small animation for the new medicine
    medicineDiv.style.animation = 'fadeIn 0.5s ease';
}

// Print the prescription
function printPrescription() {
    const patientName = patientNameInput.value.trim();
    const patientAge = patientAgeInput.value.trim();
    
    if (!patientName || !patientAge) {
        alert('Please fill in the patient\'s name and age before printing!');
        return;
    }

    if (selectedMedicinesList.children.length === 0) {
        alert('Please add at least one medicine to the prescription!');
        return;
    }

    // Print functionality
    window.print();
}

// Event Listeners
addButton.addEventListener('click', addMedicine);
printButton.addEventListener('click', printPrescription);

// Allow Enter key to add medicine
medicineDropdown.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addMedicine();
});

// Initialize the dropdown
populateDropdown();
