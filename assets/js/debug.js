/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   !!!! QUESTO CODICE È STATO GENERATO DA AI !!!! 
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

document.getElementById("saveLocalStorage").addEventListener("click", saveLocalStorage);
document.getElementById("loadLocalStorage").addEventListener("click", loadLocalStorage);

// -- Salvare il localstorage
function saveLocalStorage () {
    // Crea un oggetto per contenere i dati di localStorage
    const localStorageData = {};
    
    // Itera su tutte le chiavi di localStorage e aggiungile all'oggetto
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData[key] = value;
    }
    
    // Converti l'oggetto in una stringa JSON
    const jsonData = JSON.stringify(localStorageData, null, 2);
    
    // Crea un blob con i dati JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Crea un link per il download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorageData.json'; // Nome del file di download
    document.body.appendChild(a);
    a.click(); // Simula un click per avviare il download
    document.body.removeChild(a); // Rimuove il link dal DOM
    URL.revokeObjectURL(url); // Libera la memoria
}

// -- Caricare in localstorage
function loadLocalStorage () {
    // Funzione per caricare i dati da un file JSON
    function loadLocalStorageFromFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const jsonData = event.target.result;
            const localStorageData = JSON.parse(jsonData);
            
            // Itera sull'oggetto e ripristina i dati in localStorage
            for (const key in localStorageData) {
                if (localStorageData.hasOwnProperty(key)) {
                    localStorage.setItem(key, localStorageData[key]);
                }
            }
            
            console.log('Dati di localStorage ripristinati con successo!');
        };
        
        reader.readAsText(file);
    }
    
    // Crea un input per caricare il file JSON
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            loadLocalStorageFromFile(file);
        }
    };
    
    // Aggiungi l'input al DOM e simula un clic per aprire il selettore di file
    document.body.appendChild(input);
    input.click();
}