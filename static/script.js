const resultDiv = document.querySelector("#result");
const dataLink = document.querySelector("#getlink");
const sendForm = document.querySelector("#sendform");
const updateForm = document.querySelector("#updateForm");

document.querySelector("#deletelink").addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await api.delete("/data");
    resultDiv.innerHTML = res.message;
});

dataLink.addEventListener("click", dataLoder);

async function dataLoder(event) {
    event.preventDefault();

    const result = await api.get("/data");
    insertResult(result);

    // try {
    //     const request = await fetch("/data");
    //     const result = await request.json();

    //     insertResult(result);
    // } catch (error) {
    //     console.error(error);
    // }
}

sendForm.addEventListener("submit", posting);

async function posting(event) {
    event.preventDefault();

    const result = await api.post(event.target.action, {
        user: event.target.user.value,
        message: event.target.message.value,
    });
    insertResult(result);

    event.target.reset();

    // try {
    //     const user = event.target.user.value;
    //     const message = event.target.message.value;

    //     const request = await fetch(event.target.action, {
    //         method: "POST", //  GET, PUT, DELETE
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             user: user,
    //             message: message,
    //         }),
    //     });
    //     const response = await request.json();

    //     insertResult(response);
    // } catch (error) {
    //     console.error(error);
    // }
}

updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const result = await api.put("/data", {
        user: e.target.user.value,
        message: e.target.message.value,
    });
    insertResult(result);
    e.target.reset();
});

function insertResult(obj) {
    resultDiv.innerHTML = `<strong>${obj.user}</strong> says: "${obj.message}"`;
}

const api = {
    get: async function (url) {
        try {
            const req = await fetch(url);
            return await req.json();
        } catch (e) {
            console.error("GET error: " + e);
        }
    },
    post: async function (url, data) {
        try {
            const req = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return await req.json();
        } catch (e) {
            console.error("POST error: " + e);
        }
    },
    put: async function (url, data) {
        try {
            const req = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return await req.json();
        } catch (e) {
            console.error("PUT error: " + e);
        }
    },
    delete: async function (url) {
        try {
            const req = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            return await req.json();
        } catch (e) {
            console.error("DELETE error: " + e);
        }
    },
};
