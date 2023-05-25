let form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);

  let query = {};
  for (const [key, value] of data) {
    if (value === "") {
      alert("All fields are required");
      return;
    }

    query[key] = value;
  }
  addData(query);
});

// "http://localhost:3001/formdata"
let addData = async (data) => {
  let url = "https://upset-robe-colt.cyclic.app/formdata";
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...data }),
    });

    if (res.status === 200) {
      alert("Card created");
    } else {
      throw new Error("Failed to create card");
    }
  } catch (err) {
    alert(err);
  }
};
