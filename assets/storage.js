const CACHE_KEY = "calculation_history"; //akses dan simpan data pada localStorage
 
function checkForStorage() {
   return typeof(Storage) !== "undefined";
}
 
function putHistory(data) {
   if (checkForStorage()) {
       let historyData = null;
       if (localStorage.getItem(CACHE_KEY) === null) {
           historyData = [];
       } else {
           historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
           //JSON.parse() yang mana digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript.
        }
 
       historyData.unshift(data);
       //unshift(), fungsi ini digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index.
 
       if (historyData.length > 5) {
           historyData.pop();
           //pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5.
       }
 
       localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
       //JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String.
    }
}

//mengembalikan nilai array dari localStorage
function showHistory() {
   if (checkForStorage) {
       return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
   } else {
       return [];
   }
}
 
function renderHistory() {
   const historyData = showHistory();
   let historyList = document.querySelector("#historyList");

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
   historyList.innerHTML = "";
 
   for (let history of historyData) {
       let row = document.createElement('tr');
       row.innerHTML = "<td>" + history.firstNumber + "</td>";
       row.innerHTML += "<td>" + history.operator + "</td>";
       row.innerHTML += "<td>" + history.secondNumber + "</td>";
       row.innerHTML += "<td>" + history.result + "</td>";
 
       historyList.appendChild(row);
   }
}
 
renderHistory();