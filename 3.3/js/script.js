const STORAGE_KEY = "products_demo_ok";
let products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const tbody = document.getElementById("productBody");
const total = document.getElementById("total");
const search = document.getElementById("search");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function render(filter = "") {
  tbody.innerHTML = "";
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach((p, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.price.toLocaleString("vi-VN")}</td>
      <td>${p.qty}</td>
      <td>${p.desc || ""}</td>
      <td class="actions">
        <button class="primary" onclick="editProduct('${p.id}')">Sửa</button>
        <button class="danger" onclick="deleteProduct('${p.id}')">Xoá</button>
      </td>`;
    tbody.appendChild(tr);
  });
  total.textContent = products.length;
  if (filtered.length === 0)
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align:center">Không có sản phẩm</td></tr>';
}

function deleteProduct(id) {
  if (!confirm("Bạn có chắc muốn xoá sản phẩm này không?")) return;
  products = products.filter((p) => p.id !== id);
  save();
  render(search.value);
}

function editProduct(id) {
  const p = products.find((p) => p.id === id);
  if (!p) return;
  document.getElementById("modalTitle").textContent = "Sửa sản phẩm";
  document.getElementById("editingId").value = p.id;
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("qty").value = p.qty;
  document.getElementById("desc").value = p.desc;
  openModal();
}

document.getElementById("btnAdd").onclick = () => {
  document.getElementById("modalTitle").textContent = "Thêm sản phẩm";
  document.getElementById("editingId").value = "";
  document.getElementById("formProduct").reset();
  openModal();
};
document.getElementById("btnCancel").onclick = closeModal;

function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("formProduct").onsubmit = (e) => {
  e.preventDefault();
  const id = document.getElementById("editingId").value;
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const qty = Number(document.getElementById("qty").value);
  const desc = document.getElementById("desc").value.trim();
  if (!name) {
    alert("Vui lòng nhập tên sản phẩm");
    return;
  }
  if (id) {
    const idx = products.findIndex((p) => p.id === id);
    if (idx > -1) products[idx] = { ...products[idx], name, price, qty, desc };
  } else {
    products.push({ id: genId(), name, price, qty, desc });
  }
  save();
  render(search.value);
  closeModal();
};

search.oninput = () => render(search.value);
if (products.length === 0) {
  products = [
    {
      id: genId(),
      name: "Điện thoại A1",
      price: 3500000,
      qty: 10,
      desc: "Mẫu thử",
    },
    {
      id: genId(),
      name: "Tai nghe B2",
      price: 250000,
      qty: 30,
      desc: "Không dây",
    },
    {
      id: genId(),
      name: "Sạc nhanh 20W",
      price: 150000,
      qty: 50,
      desc: "USB-C",
    },
  ];
  save();
}
render();
